const { Bank,LoanApplication, BankAccount, User } = require('../../../models');
const {calculateDemographics, calculateMedian } = require('../../../helpers/calculators');
// const mongoose = require('mongoose');

const demographics = async (req, res) => {
    try {
        const { bankId } = req.params;
    
        // Find the bank using the provided bankId
        const bank = await Bank.findById(bankId);
        console.log(bank)
        if (!bank) {
          return res.status(404).json({ success: false, message: 'Bank not found' });
        }
    
        // Find approved loan applications linked to the bank
        const approvedLoans = await LoanApplication.find({
          status: 'approved',
        //   'account.bank': bankId,
        }).populate('user').populate('account'); // Assuming you want to populate the 'user' field in LoanApplication
        let bankapprovedloans=approvedLoans.filter((loan)=>(loan?.account?.bank==bankId))
        const userAges = bankapprovedloans.map(loan => loan.user.age);
        const userSalaries = bankapprovedloans.map(loan => loan.user.salary);

        const medianofapproveduserAges = calculateMedian(userAges);
        const medianofapproveduserSalaries = calculateMedian(userSalaries);

        approveddata = {
            average_age: medianofapproveduserAges,
            average_salary :medianofapproveduserSalaries
        }
        res.status(200).json({ success: true, data: approveddata });
      } catch (error) {
        console.error('Error retrieving approved loans:', error.message);
        res.status(500).json({ success: false, message: 'Error retrieving approved loans' });
      }
      
      
  };
  module.exports = {demographics}