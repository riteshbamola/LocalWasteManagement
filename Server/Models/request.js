const mongoose = require('mongoose')
const User = require('./user');

const requestSchema = new mongoose.Schema({
  pickuplocation: {
    type: String,
    required: true

  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  riderId: {
    type: String,
    default: null,
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  pickupDate: {
    type: Date,
    default: null,
  }



}, { timestamps: true })
module.exports = mongoose.model("Request", requestSchema);