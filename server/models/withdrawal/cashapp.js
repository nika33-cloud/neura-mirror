import mongoose from "mongoose";


const cashappSchema = new mongoose.Schema({
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  cashtag: { type: String, }  
});

const cashappModel = mongoose.model("cashapp", cashappSchema);

export default cashappModel;