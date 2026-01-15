import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv"

dotenv.config()

const dataBase = process.env.MONGODB_URL

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(dataBase);
  isConnected = true;
}

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}


