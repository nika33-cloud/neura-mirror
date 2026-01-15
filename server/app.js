import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/user.routes.js";
import fundRoutes from "./routes/fund.routes.js";
import transactRoutes from "./routes/transaction.routes.js";
import withdrawRoutes from "./routes/withdraw.routes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "12mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://neura-mirror.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/user", fundRoutes);
app.use("/transaction", transactRoutes);
app.use("/withdraw", withdrawRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

export default app;
