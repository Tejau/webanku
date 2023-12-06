const amqp = require('amqplib');

const connectionUrl = 'amqp://localhost';

async function sendTransaction(transactionData) {
  const connection = await amqp.connect(connectionUrl);
  const channel = await connection.createChannel();
  const queueName = 'bank_transaction_queue';

  // Ensure the queue exists
  await channel.assertQueue(queueName, { durable: true });

  // Send a transaction message to the queue
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(transactionData)), { persistent: true });

  console.log(`Sent transaction: ${JSON.stringify(transactionData)}`);

  // Close the connection
  setTimeout(() => {
    connection.close();
  }, 500);
}

async function processTransactions() {
  const connection = await amqp.connect(connectionUrl);
  const channel = await connection.createChannel();
  const queueName = 'bank_transaction_queue';

  // Ensure the queue exists
  await channel.assertQueue(queueName, { durable: true });

  // Set up multiple channels for concurrent processing
  const numChannels = 3; // You can adjust the number of channels based on your requirements
  for (let i = 0; i < numChannels; i++) {
    const processingChannel = await connection.createChannel();
    processingChannel.assertQueue(queueName, { durable: true });

    // Receive and process transaction messages from the queue
    processingChannel.consume(queueName, (msg) => {
      if (msg.content) {
        const transactionData = JSON.parse(msg.content.toString());
        console.log(`Processing transaction: ${JSON.stringify(transactionData)}`);
        // Add your logic to process the transaction here

        // For example, you can update account balances, log transactions, etc.

        // Acknowledge the message to remove it from the queue
        processingChannel.ack(msg);
      }
    });
  }
}

// Example usage:
const transaction1 = { from: 'account1', to: 'account2', amount: 100 };
const transaction2 = { from: 'account2', to: 'account3', amount: 50 };

sendTransaction(transaction1);
sendTransaction(transaction2);

// Start processing transactions concurrently
processTransactions();
