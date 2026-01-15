import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  tid:  { 
    type: String, 
    unique: true, 
    default: function () { return this._id.toString(); } // Copy _id to tid
  },
  username: { type: String, required: true },
  plan: { type: String},
  type: { type: String, required: true, enum: ["Deposit", "Profit", "Withdrawal"]  },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ["Pending", "Success", "Failed"],
  default: "Pending" },
  image: { type: String, default: "Image"},
},{ timestamps: true });

const transactionModel = mongoose.model("transaction", transactionSchema);

// Use ES6 export
export default transactionModel;
