const express = require('express');
const router = express.Router();
const { Loan, Transaction, BankAccount } = require('../../../models');
const loanpayback= async (req, res) => {
  try {
    const { loanId, emiAmount } = req.body;

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    const monthlyInterestRate = loan.interestRate / 12 / 100;

    const remainingBalance = loan.amount - (emiAmount * loan.paid_times);

    const emi = (remainingBalance * monthlyInterestRate) + (remainingBalance / loan.term);

    const updatedBalance = loan.account.balance - emi;

    loan.paid_times += 1;

    await loan.save();


    let accId = loan.account.toString()
    const bankAccount = await BankAccount.findById(accId);
    
    if (!bankAccount) {
      return res.status(404).json({ message: 'BankAccount not found' });
    }
    
    bankAccount.balance = bankAccount?.balance - emi;
    
    await bankAccount.save();

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
