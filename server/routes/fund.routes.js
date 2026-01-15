import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { addProfitAdmin, fundData, fundDataAdmin } from '../controllers/fund.js';
import { adminCheck } from '../middlewares/user.status.js';

const router = express.Router();

router.post("/fund", validateUser, fundData)
router.post("/fundAdmin/user", validateUser, adminCheck, fundDataAdmin)
router.post("/Profits/user", validateUser, adminCheck, addProfitAdmin)

export default router;