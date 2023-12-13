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

module.exports = sendTransactionToQueue