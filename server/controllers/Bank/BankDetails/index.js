const express = require('express');
const router = express.Router();
const { User, BankAccount, Bank } = require('../../../models');

// Endpoint to get a list of bank accounts and unique users for a specific bank
const getbankdetails = async (req, res) => {
    const { bankId } = req.params;

    try {
      const bank = await Bank.findById(bankId);
      const bankAccounts = await BankAccount.find({ bank: bankId }).populate('user', 'fullName email'); // Adjust the population fields based on your User model
      const uniqueUsers = await User.find({ _id: { $in: bankAccounts.map(account => account.user) } });
        
      res.json({ bank, bankAccounts, uniqueUsers });
    } catch (error) {
      console.error('Error fetching bank details, accounts, and users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {getbankdetails};
