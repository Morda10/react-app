const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//get all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await User.find({ rank: 0 }).select("_id name");
    if (trainers.length !== 0) {
      return res.status(200).json(trainers);
    }
    return res.status(200).json([]);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
