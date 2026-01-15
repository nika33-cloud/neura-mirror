import express from "express";
import { validateUser } from "../middlewares/validateUser.js";
import { withdrawBank, withdrawCashapp, withdrawCrypto, withdrawPaypal } from "../controllers/withdrawal.js";


const router = express.Router();

router.post("/user/bank", validateUser, withdrawBank)
router.post("/user/paypal", validateUser, withdrawPaypal)
router.post("/user/cashapp", validateUser, withdrawCashapp);
router.post("/user/crypto", validateUser, withdrawCrypto)


export default router