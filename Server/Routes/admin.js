const express = require('express')
const router = express.Router();
const Rider = require('../Models/rider')
const jwt = require('jsonwebtoken')
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

module.exports = router;