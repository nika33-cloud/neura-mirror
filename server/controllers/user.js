import bcrypt from "bcryptjs";
import userModel from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET_ACCESS;
const REFRESH_SECRET = process.env.JWT_SECRET_REFRESH;
const ACCESS_TIME = process.env.ACCESS_TIME;
const REFRESH_TIME = process.env.REFRESH_TIME;

const isProd = process.env.NODE_ENV === "production";

export const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).exec();
    if (!users) {
      return res.status(404).json({ success: false, message: "No User Found" });
    }
    res
      .status(200)
      .json({ success: false, message: "All users fetched", users });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Error fetching users: " + error.message,
      });
  }
};

/* REGISTER */
export const registerUser = async (req, res) => {
  const {
    username,
    fname,
    lname,
    date,
    address,
    country,
    phone,
    email,
    password,
  } = req.body;

  if (
    !username ||
    !fname ||
    !lname ||
    !date ||
    !address ||
    !country ||
    !phone ||
    !email ||
    !password
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const Email = email.toLowerCase();

  try {
    if (!validator.isEmail(Email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const emailExists = await userModel.findOne({ email: Email });
    const usernameExists = await userModel.findOne({ username });

    if (emailExists)
      return res.status(409).json({ success: false, message: "Email in use" });

    if (usernameExists)
      return res
        .status(409)
        .json({ success: false, message: "Username taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      fname,
      lname,
      date,
      address,
      country,
      phone,
      email: Email,
      password: hashedPassword,
    });

    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* LOGIN */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });

  try {
    const user = await userModel.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, {
      expiresIn: ACCESS_TIME,
    });

    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
      expiresIn: REFRESH_TIME,
    });

    res.cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* VALIDATE */
export const validate = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User valid",
    user: req.user,
  });
};

/* LOGOUT */
export const logout = (req, res) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");

  res.status(200).json({ success: true, message: "Logged out" });
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
    });
  }
};


/* UPDATE EMAIL */
export const updateEmail = async (req, res) => {
  const { email } = req.body;
  const Email = email?.toLowerCase();

  if (!Email)
    return res.status(400).json({ success: false, message: "Email required" });

  try {
    if (!validator.isEmail(Email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    const exists = await userModel.findOne({ email: Email });
    if (exists && exists._id.toString() !== req.user._id.toString()) {
      return res.status(409).json({ success: false, message: "Email in use" });
    }

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { email: Email },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Email updated",
      email: user.email,
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ success: false, message: "Email required" });

  const Email = email.toLowerCase();

  try {
    const user = await userModel.findOne({ email: Email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 20 * 60 * 1000;
    await user.save();

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: Email,
      subject: "Reset Password OTP",
      html: `
        <p>Hello ${user.username},</p>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This code expires in 20 minutes.</p>
        <p>If you didn’t request this, ignore this email.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* VERIFY RESET OTP */
export const verifyResetCode = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });

  try {
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user || !user.resetOtp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.resetOtp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.resetOtpExpiry < Date.now()) {
      user.resetOtp = null;
      user.resetOtpExpiry = null;
      await user.save();
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password)
    return res.status(400).json({
      success: false,
      message: "Email, OTP and password required",
    });

  if (password.length < 8)
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });

  try {
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.resetOtpExpiry < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    user.password = await bcrypt.hash(password, 10);
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Password Changed Successfully",
      text: `Hello ${user.username}, your password was changed successfully.`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



