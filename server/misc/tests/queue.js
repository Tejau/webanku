const fetch = require('node-fetch');

const apiUrl = 'http://localhost:5000/transactions/withdraw';
const concurrentRequests = 40; // Adjust this based on your requirement

const requestBody = {
  amount: '10',
  id: '656f545351cbf8d522224e06',
};

// Create an array of promises for concurrent requests
const requests = Array.from({ length: concurrentRequests }, async () => {
  try {
    const startTime = new Date().getTime();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const endTime = new Date().getTime();

    if (response.ok) {
      const responseData = await response.json();
      console.log(`Request completed in ${endTime - startTime} ms, started at, ${startTime}, newBalance: ${responseData.newBalance}`);
    } else {
      console.error(`Error during request: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error during request:', error);
  }
});

// Execute concurrent requests using Promise.all
Promise.all(requests)
  .then(() => {
    console.log('All requests completed successfully');
  })
  .catch(error => {
    console.error('Error during requests:', error);
  });
  // myuser
  // mypassword123456
