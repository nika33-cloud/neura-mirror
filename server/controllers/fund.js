import fundModel from "../models/Fund.js";
import transactionModel from "../models/Transact.js";
import userModel from "../models/User.js";

const fundData = async (req, res) => {
    const validUser = req.user
    const { amount, plan } = req.body;
  
    try {
      if (!amount || !plan) {
        return res.status(400).json({ error: "Amount and plan are required" });
      }
  
      if (amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      if (isNaN(amount) || amount <= 0) {
        return res.status(401).json({ error: "Invalid amount" });
      }
      
  
      // Use findOneAndUpdate to either update an existing document or create a new one
      const updatedFund = await fundModel.findOneAndUpdate(
        { username: validUser.username },                   
        { amount, plan },               
        { new: true, upsert: true }      
      );



      res.status(201).json({
        success: true,
        message: "Fund updated successfully",
        data: updatedFund
        });
    } catch (error) {
      console.error("Error updating or creating fund:", error);
      res.status(500).json({ error: "Internal Server Error" + error });
    }
  };

  const fundDataAdmin = async (req, res) => {
    const {username} = req.params;
    const { balance } = req.body;

    try {

      if (!balance) {
        return res.status(400).json({ error: "Balance is required" });
      }

      if (balance <= 0) {
        return res.status(400).json({ error: "Invalid balance" });
      }

      const user = await userModel.findOne({username}).exec();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

        user.balance = parseFloat(user.balance) + parseFloat(balance);
        await user.save();

        const transaction = new transactionModel({
          username,
          type: "Deposit",
          amount: balance,
          status: "Pending"
        });

        await transaction.save();

      res.status(200).json({
        success: true,
        message: "Balance updated successfully",
        data: user
      });

    }catch{
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }


  }

  const addProfitAdmin = async (req, res) => {
    const {username} = req.params;
    const { profit } = req.body;

    try {

      if (!profit) {
        return res.status(400).json({ error: "Profit is required" });
      }

      if (profit <= 0) {
        return res.status(400).json({ error: "Invalid Profits" });
      }

      const user = await userModel.findOne({username}).exec();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

        user.profit = parseFloat(user.profit) + parseFloat(profit);
        await user.save();

        const transaction = new transactionModel({
          username,
          type: "Profit",
          amount: profit,
          status: "Success"
        });

        await transaction.save();

      res.status(201).json({
        success: true,
        message: "Profit updated successfully",
        data: user
      });

    }catch{
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }


  }

  export {fundData, fundDataAdmin, addProfitAdmin};