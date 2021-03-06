const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/Trainees");
const Trainer = require("../../models/Trainers");

router.get("/getsByID", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//login Trainee
router.post("/loginTrainee", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        rank: user.rank,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        // console.log({token})
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    console.log(err);
    res.status(500).send("Server error");
  }
});


//login Trainer
router.post("/loginTrainer", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Trainer.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        rank: user.rank,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
