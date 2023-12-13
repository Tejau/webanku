const axios = require('axios'); // Assuming you use axios for HTTP requests

async function withdraw(req, res) {
  try {
    const { amount, id } = req.body;
    // Send a request to the withdrawal service
    const withdrawalRequest = {
      amount,
      id
    };

    const withdrawalServiceUrl = 'http://localhost:8000/withdraw'; // Replace with the actual URL

    const withdrawalResponse = await axios.post(withdrawalServiceUrl, withdrawalRequest);

    console.log(withdrawalResponse.data)
    res.status(200).json({ message: withdrawalResponse.data.message, newbalance: withdrawalResponse?.data?.newbalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  withdraw,
};
