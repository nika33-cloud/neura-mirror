import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import authRoutes from "./routes/user.routes.js"
import fundRoutes from "./routes/fund.routes.js"
import transactRoutes from "./routes/transaction.routes.js"
import withdrawRoutes from "./routes/withdraw.routes.js"

dotenv.config()


//Middleware
export const app = express();
const port = process.env.PORT || 2006;
const dataBase = process.env.MONGODB_URL
const client = process.env.CLIENT_URL
const admin = process.env.ADMIN_URL
const corsconfig = {
  origin: [admin, client],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json({limit:'12mb'}));
app.use(cors(corsconfig));
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




app.get('/',(req, res) => {
  res.send('API Working')
});


