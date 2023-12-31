
const { Transaction, BankAccount } = require('../../../models');

const deposit = async (req, res) => {
  try {
    const { id, amount } = req.body;

    const bankAccount = await BankAccount.findById( id );

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    bankAccount.balance += amount;

    const depositTransaction = new Transaction({
      amount,
      type: 'deposit',
      user: bankAccount.user,
      bankAccount: bankAccount._id,
    });

    await bankAccount.save();
    await depositTransaction.save();

    res.status(200).json({ message: 'Deposit successful', newBalance: bankAccount.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  deposit,
};
