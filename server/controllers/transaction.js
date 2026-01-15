import mongoose from "mongoose";
import transactionModel from "../models/Transact.js";
import userModel from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

  
const transact = async (req, res) => {
  const { plan, type, amount, image } = req.body;
  const status = "Pending";
  const validUser = req.user;

  if (!plan || !amount || !image || !type) {
    return res.status(400).json({
      success: false,
      message: "Plan, type, amount, and image are required",
    });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "payments/proofs",
    });

    const user = await userModel.findById(validUser._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newTransaction = new transactionModel({
      username: user.username,
      type,
      plan,
      amount,
      image: result.secure_url,
      status,
    });

    await newTransaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      data: newTransaction,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


  const updateTransactionStatus = async (req, res) => {
    const { tid } = req.params; // Expecting 'id' in params now
    const { status } = req.body;
  
    // Validate required fields
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
  
    const validStatuses = ["Pending", "Success", "Failed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Allowed values: ${validStatuses.join(", ")}` });
    }
  
    try {
      // Find transaction by the custom `id` field
      const updatedTransaction = await transactionModel.findOneAndUpdate(
        { tid }, 
        { status },
        { new: true } // Return the updated transaction
      );

      if (!updatedTransaction) {
        return res.status(404).json({ success: false, message: "Transaction not found" });
      }

      const user = await userModel.findOne({ username: updatedTransaction.username }).exec()

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if(updatedTransaction.type === 'Deposit' && updatedTransaction.status === 'Success') {
        const amount = parseFloat(updatedTransaction.amount);
        if (isNaN(amount)) {
          return res.status(400).json({ success: false, message: "Invalid transaction amount" });
        }
        user.balance = parseFloat(user.balance) + amount;
        await user.save(); 
      }

      if (updatedTransaction.type === 'Withdrawal' && updatedTransaction.status === 'Success') {
        const amount = parseFloat(updatedTransaction.amount);
        if (isNaN(amount)) {
          return res.status(400).json({ success: false, message: "Invalid transaction amount" });
        }
        user.balance = parseFloat(user.balance) - amount;
        await user.save();
      }

  
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
        data: updatedTransaction
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error: " + error.message
      });
    }
  };
  

const getTransaction = async (req, res) => {
    const { username } = req.params;


    try {
        const transactions = await transactionModel.find({ username }).exec()
            

        if (transactions.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No transactions found for the provided username"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions: " + error.message
        });
    }
};

const getTransactDetails = async (req, res) => {
  try {
    const { tid } = req.params;

    const transaction = await transactionModel.findOne({ tid })

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export { transact, getTransaction, getTransactDetails, updateTransactionStatus };
