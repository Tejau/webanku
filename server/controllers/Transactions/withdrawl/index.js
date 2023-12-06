const {BankAccount, Transaction} = require('../../../models');
const amqp = require('amqplib');

const connectionUrl = 'amqp://myuser:mypassword@localhost';

const queueName = 'bank_transaction_queue';

async function sendTransactionToQueue(transactionData) {
  const connection = await amqp.connect(connectionUrl);
  const channel = await connection.createChannel();

  // Ensure the queue exists
  await channel.assertQueue(queueName, { durable: true });

  // Send a transaction message to the queue
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(transactionData)), { persistent: true });

  console.log(`Sent transaction to queue: ${JSON.stringify(transactionData)}`);

  // Close the connection
  setTimeout(() => {
    connection.close();
  }, 500);
}

async function processWithdrawalTransaction(msg) {
  const transactionData = JSON.parse(msg.content.toString());
  console.log(`Processing transaction from queue: ${JSON.stringify(transactionData)}`);
  
  // Process withdrawal transaction
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
      }
    } catch (error) {
      console.error(" error in data");
    }
  }
}

async function startConsumer() {
  const connection = await amqp.connect(connectionUrl);
  const channel = await connection.createChannel();
  
  // Ensure the queue exists
  await channel.assertQueue(queueName, { durable: true });

  // Set the prefetch value to 1 to ensure that the server only sends one message at a time
  channel.prefetch(1);

  // Consume messages from the queue
  channel.consume(queueName, async (msg) => {
    if (msg.content) {
      await processWithdrawalTransaction(msg);
      
      // Acknowledge the message to remove it from the queue
      channel.ack(msg);
    }
  });
}

async function processWithdrawalTransaction(msg) {
  const transactionData = JSON.parse(msg.content.toString());
  console.log(`Processing transaction from queue: ${JSON.stringify(transactionData)}`);
  
  // Process withdrawal transaction
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
      }
    } catch (error) {
      console.error("error in data 1");
    }
  }
}

async function startConsumer() {
  const connection = await amqp.connect(connectionUrl);
  const channel = await connection.createChannel();
  
  // Ensure the queue exists
  await channel.assertQueue(queueName, { durable: true });

  // Set the prefetch value to 1 to ensure that the server only sends one message at a time
  channel.prefetch(1);

  // Consume messages from the queue
  channel.consume(queueName, async (msg) => {
    if (msg.content) {
      await processWithdrawalTransaction(msg);
      
      // Acknowledge the message to remove it from the queue
      channel.ack(msg);
    }
  });
}

async function withdraw(req, res) {
  try {
    const { amount, id } = req.body; // Assuming amount and id are sent in the request body

    const bankAccount = await BankAccount.findById(id);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    if (bankAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Send withdrawal transaction to the queue
    const withdrawalTransactionData = {
      amount,
      type: 'withdrawal',
      user: bankAccount.user,
      bankAccount: bankAccount._id,
    };

    await sendTransactionToQueue(withdrawalTransactionData);

    // Calculate the new balance after the withdrawal
    const newBalance = bankAccount.balance - amount;

    res.status(200).json({ message: 'Withdrawal request received', newBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Start the consumer to process withdrawal transactions from the queue sequentially
startConsumer();


module.exports = {
  withdraw,
};
