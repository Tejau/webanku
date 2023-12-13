const {BankAccount, Transaction} = require('../models');
const amqp = require('amqplib');

const connectionUrl = 'amqp://myuser:mypassword@localhost';

const queueName = 'bank_transaction_queue';

const processWithdrawalTransaction = require('../helpers/processTransaction');



async function startConsumer() {
    try {
        const connection = await amqp.connect(connectionUrl);
        
        // Handle the case where the connection couldn't be established
        if (!connection) {
        throw new Error('Unable to establish a connection to RabbitMQ');
        }

        const channel = await connection.createChannel();

        // Ensure the queue exists
        await channel.assertQueue(queueName, { durable: true });

        // Set the prefetch value to 1 to ensure that the server only sends one message at a time
        channel.prefetch(1);

        // Consume messages from the queue
        channel.consume(queueName, async (msg) => {
        try {
            if (msg.content) {
             await processWithdrawalTransaction(msg);
                
            // Acknowledge the message to remove it from the queue
            channel.ack(msg);
            }
        } catch (error) {
            console.error('Error processing withdrawal transaction:', error.message);
            // Handle the error appropriately (e.g., log, send to monitoring system, etc.)
        }
        });
    } catch (error) {
        console.error('Error connecting to RabbitMQ or creating channel:', error.message);
        // Handle the error appropriately (e.g., log, send to monitoring system, etc.)
    }
}

module.exports = startConsumer
