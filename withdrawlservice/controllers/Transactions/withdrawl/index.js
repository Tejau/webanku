const { BankAccount } = require('../../../models');
const sendTransactionToQueue = require('./queue');
const { statusCodes, errorMessages } = require('../../../utils/constants');

async function withdraw(req, res) {
  try {
    const { amount, id } = req.body;

    const bankAccount = await BankAccount.findById(id);

    if (!bankAccount) {
      return res.status(statusCodes.notFound).json({ message: errorMessages.accountNotFound });
    }

    if (bankAccount.balance < amount) {
      return res.status(statusCodes.badRequest).json({ message: errorMessages.insufficientBalance });
    }

    const withdrawalTransactionData = {
      amount,
      type: 'withdrawal',
      user: bankAccount.user,
      bankAccount: bankAccount._id,
    };

    try {
      await sendTransactionToQueue(withdrawalTransactionData);
    } catch (e) {
      console.log(errorMessages.withdrawalProcessingError);
    }

    const newbalance = bankAccount?.balance - amount;

    res.status(statusCodes.success).json({ message: 'Withdrawal request received', newbalance });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.internalServerError).json({ message: errorMessages.internalServerError });
  }
}

module.exports = {
  withdraw,
};
