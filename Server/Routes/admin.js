const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Rider = require('../Models/rider')
const Request = require('../Models/request')
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../utilites');
router.post('/register', (req, res) => {
  const { name, email, PhoneNumber, password } = req.body;
  const rider = new Rider({ name, email, PhoneNumber, password });
  rider.save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
})
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const rider = await Rider.findOne({ email: email });
    if (!rider) {
      res.status(400).json({ msg: "Rider donot exist" });
    }
    if (email == rider.email && password == rider.password) {
      const payload = {
        id: rider._id,
        email: rider.email,
        PhoneNumber: rider.PhoneNumber,
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "36000m",
      });

      return res.json({ message: "login success", rider, accessToken })
    }
  }
  catch (error) {
    res.status(400).json({ msg: error.message })
  }

})
router.post('/acceptrequest', authenticateToken, async (req, res) => {
  const { id } = req.query;
  const rider = req.user;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid ID format' });
  }
  const request = await Request.findById(id);
  if (!request) {
    return res.status(404).json({ msg: "Request not found" });
  }
  if (request.status === "accepted") {
    return res.status(400).json({ msg: "Request already accepted" });
  }
  request.riderId = rider.id;
  request.status = "accepted"
  await request.save();
  res.json({ message: "Request updated successfully", request: request });

})
router.post('/pickuprequest', async (req, res) => {
  try {

    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
    console.log(id);
    const { pickup, } = req.body;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }
    if (request.status === "in_progress") {
      return res.status(400).json({ msg: "Request already in progress" });
    }
    request.pickupDate = pickup;
    request.status = "in_progress" // Update the field
    await request.save();
    res.json({ message: "Request updated successfully" });


  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
});
router.post('/completed', async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }
    if (request.status === "completed") {
      return res.status(400).json({ msg: "Request already completed" });
    }
    request.status = "completed"
    await request.save();
    res.json({ message: "Request updated successfully", request: request });

  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})

module.exports = router;