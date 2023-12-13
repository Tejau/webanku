const {BankAccount, Transaction} = require('../models');


async function processWithdrawalTransaction(msg) {
    const transactionData = JSON.parse(msg.content.toString());
    console.log(`Processing transaction from queue: ${JSON.stringify(transactionData)}`);
    
    // Process withdrawal transaction  console.log(`Processing transaction from queue: ${JSON.stringify(transactionData)}`);
  
    if (transactionData.type === 'withdrawal') {
      const { amount, user, bankAccount } = transactionData;
      try {
        const bankAccountDoc = await BankAccount.findById(bankAccount);
  
        if (!bankAccountDoc) {
          console.error('Bank account not found');
        } else if (bankAccountDoc.balance < amount) {
          console.error('Insufficient balance');
        } else {
          // Update balance and save withdrawal transaction
          bankAccountDoc.balance -= amount;
          const withdrawTransaction = new Transaction({
            amount,
            type: 'withdrawal',
            user,
            bankAccount,
          });
          await withdrawTransaction.save();
          await bankAccountDoc.save();
          console.log('Withdrawal processed successfully');

          return bankAccountDoc.balance
        }
      } catch (error) {
        console.error(" error in data");
      }
    }
  }

module.exports = processWithdrawalTransaction  