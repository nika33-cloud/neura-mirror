import mongoose from "mongoose";


const cryptoSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  amount: { type: Number, required: true },
  crypto: { type: String},
  wallet: { type: String, }  
});

const cryptoModel = mongoose.model("crypto", cryptoSchema);

export default cryptoModel;