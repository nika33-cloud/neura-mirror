import express from "express";
import { allUsers, forgotPassword, getUserDetails, loginUser, logout, registerUser, resetPassword, updateEmail, validate, verifyResetCode } from "../controllers/user.js";
import { validateUser } from "../middlewares/validateUser.js";
import { adminCheck } from "../middlewares/user.status.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/allUsers", validateUser, adminCheck, allUsers)
router.get("/allUsersDetails/:id", validateUser, adminCheck, getUserDetails)
router.get("/validate", validateUser, validate)
router.post("/logout", validateUser, logout)
router.patch ("/updateEmail", validateUser, updateEmail)
router.post("/forgotPassword", forgotPassword)
router.post("/resetCode", verifyResetCode)
router.post("/resetPassword", resetPassword)
export default router;