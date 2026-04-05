import mongoose from "mongoose";
import app from "../../app.js"; // adjust path if needed
import { createServer } from "http";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
  console.log("DB connected");
}

export default async function handler(req, res) {
  await connectDB();

  return new Promise((resolve, reject) => {
    const server = createServer(app);
    server.emit("request", req, res);
    resolve();
  });
}


