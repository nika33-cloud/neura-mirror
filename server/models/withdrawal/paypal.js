import mongoose from "mongoose";


const paypalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  paypal: { type: String, }, 
});

const paypalModel = mongoose.model("paypal", paypalSchema);

export default paypalModel;