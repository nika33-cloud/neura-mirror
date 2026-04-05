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
const PORT = process.env.PORT;
const dataBase = process.env.MONGODB_URL;
const client = process.env.CLIENT_URL;
const admin = process.env.ADMIN_URL;



const corsconfig = {
  origin: [admin, client],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsconfig));
app.use(express.json({ limit: "12mb" }));
app.use(cookieParser());


app.use("/auth", authRoutes);
app.use("/user", fundRoutes);
app.use("/transaction", transactRoutes);
app.use("/withdraw", withdrawRoutes);

mongoose
  .connect(dataBase)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("API Working");
});

export default app;
