    const { LoanApplication, Transaction, Loan, BankAccount } = require('../../../models');

const MAX_TRANSACTION_RATIO = 0.36; // Maximum allowed withdraw-to-deposit ratio

const applyForLoan = async (req, res) => {
  try {
    const { amount, loanType, term, accountId } = req.body;
    // const ObjectId = require('mongoose').Types.ObjectId;
    var interestRate = loanType === 'education' ? 2 : 6.4;

    // Get userId using account from accountId
    const bankAccount = await BankAccount.findById(accountId);
    const userId = bankAccount.user;

    // Use aggregation to calculate total withdrawal and deposit amounts
    const transactions = await Transaction.find({ user: userId });

    // const result = await Transaction.aggregate([
    //   {
    //     $match: { user: userId }
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalWithdrawal: { $sum: { $cond: [{ $eq: ["$type", "withdrawal"] }, "$amount", 0] } },
    //       totalDeposit: { $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] } }
    //     }
    //   }
    // ]);
        // const { totalWithdrawal, totalDeposit } = result[0] || { totalWithdrawal: 0, totalDeposit: 0 };

    const totalWithdrawal = transactions.reduce((total, transaction) => {
        if (transaction.type === 'withdrawal') {
          return total + transaction.amount;
        }
        return total;
      }, 0);
  
      const totalDeposit = transactions.reduce((total, transaction) => {
        if (transaction.type === 'deposit') {
          return total + transaction.amount;
        }
        return total;
      }, 0);

    // Extract the calculated totals from the aggregation result

    // Calculate withdraw-to-deposit ratio
    const withdrawToDepositRatio = totalWithdrawal / totalDeposit;
    console.log(withdrawToDepositRatio)
    // Check if the user is eligible for a loan
    if (withdrawToDepositRatio < MAX_TRANSACTION_RATIO) {
      // User is eligible, create a loan application
      const newLoanApplication = new LoanApplication({
        amount,
        user: userId,
        status: 'approved', // Automatically approve the loan if the user is eligible
        loanType,
        term,
        account: accountId,
        interestRate: interestRate
      });

      await newLoanApplication.save();

      // Generate a new loan
      const calculateEMI = (amount, interestRate, term) => {
        const monthlyInterestRate = interestRate / 12 / 100;
        const numberOfPayments = term;
        
        // Formula to calculate EMI
        const emi = (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      
        return emi;
      };
      const newLoan = new Loan({
        amount: newLoanApplication.amount,
        interestRate, // Assuming you have interestRate in req.body
        term: newLoanApplication.term,
        user: userId,
        account: newLoanApplication.account,
        loanType: newLoanApplication.loanType,
        interestRate: interestRate,
        emi: calculateEMI(newLoanApplication.amount, interestRate, newLoanApplication.term), // Calculate EMI based on interest, amount, and term
        paid_times: 0, // Default value

      });

      await newLoan.save();

      res.status(201).json({ message: 'Loan application submitted and approved. Loan generated successfully', loan: newLoan });
    } else {
      // User is not eligible
      const newLoanApplication = new LoanApplication({
        amount,
        user: userId,
        status: 'rejected',
        loanType,
        term,
        account: accountId,
        interestRate: interestRate
      });

      await newLoanApplication.save();

      res.status(403).json({ message: 'Loan application submitted but rejected. User is not eligible.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  applyForLoan,
};
