const express = require('express')
const router = express.Router();
const Rider = require('../Models/rider')

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
module.exports = router;