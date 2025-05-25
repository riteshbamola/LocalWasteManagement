const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },

  wasteType: {
    type: String,
    enum: ['organic', 'recyclable', 'hazardous', 'electronic'],
    required: true,
  },

  pickupDate: {
    type: String, // You can also use Date if you want full datetime
    required: true,
  },

  pickupTime: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },

  riderId: {
    type: String,
    default: null,
  },

  requestDate: {
    type: Date,
    default: Date.now,
  }

}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);
