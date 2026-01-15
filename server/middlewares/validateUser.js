import jwt from "jsonwebtoken"
import userModel from "../models/User.js";

import dotenv from "dotenv";

dotenv.config();

const chaos = process.env.JWT_SECRET_ACCESS;
const evil  = process.env.JWT_SECRET_REFRESH;
const go  = process.env.ACCESS_TIME;

export const validateUser = async (req, res, next) => {
    const accessToken = req.cookies.accesstoken;
    const refreshToken = req.cookies.refreshtoken;
  
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ success: false });
    }
  
    // Try access token
    if (accessToken) {
      jwt.verify(accessToken, chaos, async (err, decoded) => {
        if (err) return res.status(403).json({ success: false });
  
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) return res.status(403).json({ success: false });
  
        req.user = user;
        next();
      });
      return;
    }
  
    // Fallback to refresh token
    jwt.verify(refreshToken, evil, async (err, decoded) => {
      if (err) return res.status(403).json({ success: false });
  
      const user = await userModel.findById(decoded.id).select("-password");
      if (!user) return res.status(403).json({ success: false });
  
      const newAccessToken = jwt.sign({ id: user._id }, chaos, {
        expiresIn: go,
      });
  
      res.cookie("accesstoken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 60 * 1000,
      });
  
      req.user = user;
      next();
    });
  };
  

