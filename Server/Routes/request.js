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

router.get('/getrequest', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    const allrequ = await Request.find({ userId: userId }).sort({ createdAt: -1 })
      .then((allrequ) => {
        res.json(allrequ);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
})
router.delete('/deleterequest', async (req, res) => {
  try {
    // const user = req.user;
    const requestid = req.query.requestid;
    await Request.findByIdAndDelete(requestid).then((requ) => {
      res.json({ message: "req deleted", requ })
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;