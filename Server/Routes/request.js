const express = require('express')
const Request = require('../Models/request');
const { authenticateToken } = require('../utilites');
const router = express.Router();
router.post('/postrequest', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    console.log(user);
    // Destructure all expected fields from req.body
    const {
      name,
      address,
      location,
      wasteType,
      pickupDate,
      pickupTime,
    } = req.body;

    // Validate required fields manually if you want:
    if (!name || !address || !location || !location.lat || !location.lng || !location.address || !wasteType || !pickupDate || !pickupTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new Request document
    const newRequest = new Request({
      userId,
      name,
      address,
      location,
      wasteType,
      pickupDate,
      pickupTime,
      // status, riderId, requestDate will be defaulted automatically
    });

    const savedRequest = await newRequest.save();
    console.log("saved");
    res.json(savedRequest);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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