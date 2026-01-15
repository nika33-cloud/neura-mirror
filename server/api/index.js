import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "../routes/user.routes.js"
import fundRoutes from "../routes/fund.routes.js"
import transactRoutes from "../routes/transaction.routes.js"
import withdrawRoutes from "../routes/withdraw.routes.js"
import cors from "cors";
import { app } from "../index.js";

dotenv.config()


//Middleware
const app = express();
const port = process.env.PORT || 2006;
const dataBase = process.env.MONGODB_URL
app.use(express.json({limit:'12mb'}));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://neura-mirror.vercel.app'],
  credentials: true,
}));
app.use(cookieParser());


app.use("/auth", authRoutes);
app.use("/user", fundRoutes);
app.use("/transaction", transactRoutes)
app.use("/withdraw", withdrawRoutes);


// db connect
mongoose.connect(dataBase).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }); 
})

/*app.post("/user/withdraw/cashapp-withdrawal", (req, res) => {
  console.log("CashApp withdrawal route hit!");
  console.log("Extracted username from params:", req.params.username);
  res.json({ success: true, message: "Debugging log check" });
}); */


app.get('/',(req, res) => {
  res.send('API Working')
});


