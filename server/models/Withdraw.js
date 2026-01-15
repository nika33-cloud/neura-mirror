import mongoose from "mongoose";


const withdrawalSchema = new mongoose.Schema({
  username: { type: String, required: true },
  acctname: { type: String, },
  acctnum: { type: Number,  },  
  amount: { type: Number, required: true },
  bank: { type: String,  },
  paypal: { type: String, },
  wallet: { type: String,  },
  crypto: { type: String},
  cashtag: { type: String, }  
});

const withdrawModel = mongoose.model("withdraw", withdrawalSchema);

export default withdrawModel;