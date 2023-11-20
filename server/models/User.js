const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  age:{ type: Number, required: true },
  City: {type: String, required: true },
  State: {type: String, required: true},
  gender: {type: String, enum:['male', 'female', 'prefer not say'], required: true},
  phoneNumber: {type: String, required: true, unique: true},
  salted_password: {type: String, required: false},
  salary: {type: Number, default:0}
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;
