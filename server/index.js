import mongoose from "mongoose";
import app from "./api/app.js";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined");
}

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);

    cached.promise = mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");

  return cached.conn;
}

export default async function handler(req, res) {
  try {
    await connectDB();

    return new Promise((resolve, reject) => {
      app(req, res);
      res.on("finish", resolve);
      res.on("error", reject);
    });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
}