// controllers/bankAccountController.js

const { BankAccount, User , Bank} = require('../../../models');

const createBankAccount = async (req, res) => {
  try {
    function generateAccountNumber() {
      const prefix = '20244';
      const remainingDigits = generateRandomDigits(6);
    
      return `${prefix}${remainingDigits}`;
    }
    
    function generateRandomDigits(length) {
      let result = '';
    
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
      }
    
      return result;
    }
    
    // Example usage:
    const accountNumber = generateAccountNumber();
    console.log(accountNumber);
    
    const { userId, bankId, initialBalance, accountType } = req.body;

    // Check if the user and bank exist
    const user = await User.findById(userId);
    const bank = await Bank.findById(bankId);

    if (!user || !bank) {
      return res.status(400).json({ message: 'User or bank not found' });
    }

    // Create a new bank account
    const newBankAccount = new BankAccount({
      accountNumber,
      accountType,
      user: user._id,
      bank: bank._id,
      balance: initialBalance
    });

    await newBankAccount.save();

    res.status(201).json({ message: 'Bank account created successfully', bankAccount: newBankAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAccountDetails = async (req, res) => {
  const { accountId } = req.params;
  console.log(accountId)
  try {
    const bankAccount = await BankAccount.findById(accountId);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    res.status(200).json({ message: 'Bank account details', data: bankAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch bank accounts by user ID
    const bankAccounts = await BankAccount.find({ user: userId }).populate('bank');

    res.status(200).json({ bankAccounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  createBankAccount, 
  getAccountDetails,
  getByUser
};
