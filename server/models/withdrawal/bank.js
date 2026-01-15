import mongoose from "mongoose";


const bankSchema = new mongoose.Schema({
  username: { type: String, required: true },
  acctname: { type: String, },
  acctnum: { type: Number,  },  
  amount: { type: Number, required: true },
  bank: { type: String,  },
});

const bankModel = mongoose.model("bank", bankSchema);

export default bankModel;