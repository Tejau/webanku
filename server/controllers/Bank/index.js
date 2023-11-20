// controllers/bankController.js
const bcrypt = require('bcrypt');
const { Bank } = require('../../models');

// Generate a random constant salt (you should generate and securely store this)
const constantSalt = bcrypt.genSaltSync(10);

const createBank = async (req, res) => {
  try {
    const { name, location, contact, is_actively_giving_loans, password } = req.body;

    // Hash and salt the password using the random constant salt
    const hashedPassword = await bcrypt.hash(password, constantSalt);

    // Create a new bank with the hashed and salted password
    const newBank = new Bank({
      name,
      location,
      contact,
      is_actively_giving_loans:true,
      salted_password: hashedPassword,
    });

    // Save the new bank to the database
    await newBank.save();

    res.status(201).json({ message: 'Bank created successfully', bank: newBank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginBank = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the bank by name
    const bank = await Bank.findOne({ name });
    console.log(bank)
    if (!bank) {
      // Bank not found
      return res.status(400).json({ message: 'Bank not found' });
    }

    // Verify the password using the stored salted password
    try{
      const isPasswordValid = await bcrypt.compare(password, bank.salted_password);
      if (!isPasswordValid) {
        // Incorrect password
        return res.status(401).json({ message: 'Incorrect password' });
      }
    }
    catch(e){
      console.log(e)
    }

    

    // Password is valid, you can proceed with authentication logic

    res.status(200).json({ message: 'Login successful', bank: bank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}
const getAllBanks = async (req, res) => {
  try {
    // Retrieve all banks from the database
    const banks = await Bank.find();

    res.status(200).json({ banks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBank,
  loginBank,
  getAllBanks
};
