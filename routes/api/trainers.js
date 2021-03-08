const express = require("express");
const router = express.Router();
const User = require("../../models/Trainer");

//get all trainers YESH KVAR
// router.get("/", async (req, res) => {
//   try {
//     const trainers = await User.find().select("_id name");
//     if (trainers.length !== 0) {
//       return res.status(200).json(trainers);
//     }
//     return res.status(200).json([]);
//   } catch (e) {
//     console.log(e);
//   }
// });



module.exports = router;
