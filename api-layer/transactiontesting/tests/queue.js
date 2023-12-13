const fetch = require('node-fetch');

const apiUrl = 'http://localhost:5000/transactions/withdraw';
const concurrentRequests = 2; // Adjust this based on your requirement

const requestBody = {
  amount: '0.5',
  id: '6579f6aeff5e6c1f33f76b09',
};

const requests = Array.from({ length: concurrentRequests }, async () => {
  try {
    const startTime = new Date().getTime();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTVhMWNkNmMwYjQxMjQyZDA2MmRmY2UiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMjQ5MjEzMywiZXhwIjoxNzAyNDk1NzMzfQ._XdJE7ONlvOq3hkGG1kiXT_UKDEm2w6ugFia16Zdr6o'
      },
      body: JSON.stringify(requestBody),
    });
    const endTime = new Date().getTime();

    if (response.ok) {
      const responseData = await response.json();
      console.log(`Request completed in ${endTime - startTime} ms, started at, ${startTime}`);
    } else {
      console.error(`Error during request: ${JSON.stringify(response)}`);
    }
  } catch (error) {
    console.error('Error during request:', error);
  }
});

Promise.all(requests)
  .then(() => {
    console.log('All requests completed successfully');
  })
  .catch(error => {
    console.error('Error during requests:', error);
  });
