import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log("smtp error",error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  

export default transporter;