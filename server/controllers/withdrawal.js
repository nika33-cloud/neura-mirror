import userModel from "../models/User.js";
import bankModel from "../models/withdrawal/bank.js";
import cashappModel from "../models/withdrawal/cashapp.js";
import cryptoModel from "../models/withdrawal/crypto.js";
import paypalModel from "../models/withdrawal/paypal.js";
import transactionModel from "../models/Transact.js";
import mongoose from "mongoose";
import withdrawModel from "../models/Withdraw.js";

const withdrawalModels = {
    bank: bankModel,
    paypal: paypalModel,
    crypto: cryptoModel,
    cashapp: cashappModel,
};

const withdrawal = async (req, res, method) => {
    const { username } = req.params; 
    const { acctname, acctnum, amount, bank, cashtag, crypto, paypal, wallet } = req.body;

    // Validate input
    if ( !amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "All fields are required.",
        });
    }

    try {
        // Find user
        const user = await userModel.findOne({ username }).exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with username ${username} not found.`,
            });
        }
        
        
        // Check if user has sufficient balance
        if (user.balance < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance.",
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

            // Determine withdrawal model based on method
            const WithdrawalModel = withdrawalModels[method];
            if (!WithdrawalModel) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid withdrawal method: ${method}.`,
                });
            }

            // Save withdrawal data
            // const withdrawalData = { username, acctname, acctnum, amount, bank, cashtag, crypto, paypal, wallet, ...req.body };
            // const newWithdrawal = new WithdrawalModel(withdrawalData);
            // await newWithdrawal.save({ session });

            // const userUpdate = await userModel.findOneAndUpdate(
            //     { username },
            //     { $inc: { balance: -amount } },
            //     { new: true, session }
            //   );

            //   if (!userUpdate) {
            //     throw new Error("Failed to update user balance.");
            // }

              const newWithdrawal = new WithdrawalModel({
                username,
                acctname,
                acctnum,
                amount,
                bank,
                cashtag,
                crypto,
                paypal,
                wallet,
            });
            
            await newWithdrawal.save({ session });
           

            // Create transaction entry
            const newTransaction = new transactionModel({
                username: username,
                amount: amount,
                type: "Withdrawal",
                status: "Pending",
                date: new Date(),
            });
            await newTransaction.save({ session });

            // Commit transaction
            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({
                success: true,
                message: `Withdrawal request for ${amount} submitted successfully.`,
                // data: userUpdate,
            });
    } catch (error) {
            console.error("Error processing withdrawal:", error);
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
                success: false,
                message: "Internal Server Error: Unable to process the withdrawal.",
                error: error.message,
            });
        }
};

// Export the specific withdrawal methods
export const withdrawBank = (req, res) => withdrawal(req, res, "bank");
export const withdrawPaypal = (req, res) => withdrawal(req, res, "paypal");
export const withdrawCrypto = (req, res) => withdrawal(req, res, "crypto");
export const withdrawCashapp = (req, res) => withdrawal(req, res, "cashapp");



