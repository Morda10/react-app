const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      console.log("logged");
      return res.status(200).json("logged in");
    }
    return res.status(400).json({ errors: [{ msg: "Wrong credencials" }] });
  } catch (error) {
    console.log("Server error");
  }
});

module.exports = router;
