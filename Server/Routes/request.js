const express = require('express')
const Request = require('../Models/request');
const { authenticateToken } = require('../utilites');
const router = express.Router();
router.post('/postrequest', authenticateToken, (req, res) => {
  try {
    const user = req.user;
    const { pickuplocation } = req.body;
    const userId = user.id;
    console.log(userId);

    const requ = new Request({ pickuplocation, userId })
    requ.save()
      .then((requ) => {
        res.json(requ);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
})
module.exports = router;