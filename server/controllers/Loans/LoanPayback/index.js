// routes/loanEmi.js
const express = require('express');
const router = express.Router();
const { Loan, Transaction, BankAccount } = require('../../../models');
const loanpayback= async (req, res) => {
  try {
    const { loanId, emiAmount } = req.body;

    // Fetch loan details
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Calculate the monthly interest rate (simple interest)
    const monthlyInterestRate = loan.interestRate / 12 / 100;

    // Calculate the remaining balance
    const remainingBalance = loan.amount - (emiAmount * loan.paid_times);

    // Calculate the EMI for the remaining balance
    const emi = (remainingBalance * monthlyInterestRate) + (remainingBalance / loan.term);

    // Deduct the calculated EMI from the user's account balance
    const updatedBalance = loan.account.balance - emi;
    // loan.account.balance = updatedBalance;

    // Increment the paid_times field
    loan.paid_times += 1;

    await loan.save();

    // Assuming loan.account is an instance of BankAccount, save it
   
    // Fetch the corresponding BankAccount instance
    let accId = loan.account.toString()
    const bankAccount = await BankAccount.findById(accId);
    
    // Check if the BankAccount instance exists
    if (!bankAccount) {
      return res.status(404).json({ message: 'BankAccount not found' });
    }
    
    // Update the balance on the BankAccount instance
    bankAccount.balance = bankAccount?.balance - emi;
    
    // Save the changes to the BankAccount
    await bankAccount.save();

    // Create a withdraw transaction for the EMI payment
    const newTransaction = new Transaction({
      type: 'withdrawal',
      amount: emi,
      user: loan.user,
      account: loan.account._id,
      description: 'Loan EMI payment',
    });

    await newTransaction.save();

    res.status(200).json({ message: 'Loan EMI payment successful', newBalance: updatedBalance });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {loanpayback};
