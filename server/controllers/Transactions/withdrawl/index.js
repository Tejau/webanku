// controllers/withdrawController.js
const {BankAccount, Transaction} = require('../../../models');

const withdraw = async (req, res) => {
  try {
    // const accountId = req.params.accountId;
    const { id,amount } = req.body;

    // Fetch the bank account
    const bankAccount = await BankAccount.findById(id);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    // Check if the account has sufficient balance
    if (bankAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update the balance after withdrawal
    bankAccount.balance -= amount;
    const withdrawTransaction = new Transaction({
        amount,
        type: 'withdrawal',
        user: bankAccount.user,
        bankAccount: bankAccount._id,
      });
    // Save the updated bank account
    await withdrawTransaction.save();
    await bankAccount.save();

    res.status(200).json({ message: 'Withdrawal successful', newBalance: bankAccount.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  withdraw,
};
