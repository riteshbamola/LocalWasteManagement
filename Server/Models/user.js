const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // PhoneNumber: {
  //   type: Number,
  //   required: true,
  // }
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }

}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);