const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const { authenticateToken } = require('../utilites')
router.post('/register', (req, res) => {
  const { name, email, password, address } = req.body;
  const user = new User({ name, email, password, address });
  user.save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.json({ message: "not Found" });
  }
  if (email == user.email && password == user.password) {
    const payload = {
      id: user._id,
      email: user.email,
      address: user.address,
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "36000m",
    });

    return res.json({ message: "login success", user, accessToken })
  }
  res.json({ message: "Invalid email or password" });
});


router.get('/profile', authenticateToken, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({ msg: "Error loading the details" })
  }
  const userdata = await User.find({ _id: user.id });
  console.log(userdata);
  if (userdata) {
    return res.status(200).json(userdata);
  }

})
module.exports = router;



