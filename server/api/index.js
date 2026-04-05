import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();

const dataBase = process.env.MONGODB_URL;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(dataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("MongoDB connected");
}

export default async function handler(req, res) {
  await connectDB();

  return new Promise((resolve) => {
    app(req, res);
    resolve();
  });
}