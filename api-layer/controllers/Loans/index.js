// routes/loans.js
const express = require('express');
const { LoanApplication, Transaction, Loan, BankAccount } = require('../../models');

const getLoansList = async (req, res) => {
  try {
    // console.log(req)
    const accountId = req.params.id;
    console.log(accountId, "id i")
    const loans = await Loan.find({ account: accountId });

    res.json({ loans });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {getLoansList};
