const {BankAccount, Transaction} = require('../../../models');

const withdraw = async (req, res) => {
  try {
    const { id,amount } = req.body;

    const bankAccount = await BankAccount.findById(id);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    if (bankAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    bankAccount.balance -= amount;
    const withdrawTransaction = new Transaction({
        amount,
        type: 'withdrawal',
        user: bankAccount.user,
        bankAccount: bankAccount._id,
      });
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
