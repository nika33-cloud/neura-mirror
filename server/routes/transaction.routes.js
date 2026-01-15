import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { getTransaction, getTransactDetails, transact, updateTransactionStatus } from "../controllers/transaction.js";
import { adminCheck } from "../middlewares/user.status.js";

const router = express.Router();

router.post("/userTransact", validateUser, transact)
router.get("/getTransact/:username", validateUser, getTransaction)
router.get("/transaction/:tid", validateUser, getTransactDetails)
router.patch("/updateTransact/:tid", validateUser, adminCheck, updateTransactionStatus)

export default router;