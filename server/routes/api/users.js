const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Yup = require("yup");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const auth = require("../../middleware/auth");
const Trainee = require("../../models/Trainees");
const Trainer = require("../../models/Trainers");
env.config();

const validationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
  trainer: Yup.string().required("Must have someone to train you"),
});

const validationSchema2 = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Email not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("password is required"),
  repass: Yup.string()
    .min(5, "Password must be 5 characters or longer")
    .required("Enter password again")
    .oneOf([Yup.ref("password"), null], "Password doesnt match"),
});

//get all trainees
router.get("/getAllTrainees", async (req, res) => {
  try {
    const trainees = await Trainee.find();
    return res.status(200).json(trainees);
  } catch (error) {
    console.log("error");
  }
});

//get all trainers
router.get("/getAllTrainers", async (req, res) => {
  try {
    const trainers = await Trainer.find();

    return res.status(200).json(trainers);
  } catch (e) {
    console.log(e);
  }
});

//register new trainee
router.post("/registerNewTrainee", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const trainerID = req.body.trainer;
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    console.log(req.body);
    let user = await Trainee.findOne({ email });
    let trainer = await Trainer.findById(trainerID);
    if (!trainer) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Trainer doesnt exists" }] });
    }
    if (user) {
      return res.status(400).json({ errors: [{ msg: "Trainee already exists" }] });
    }

    const newUser = new Trainee({
      name: req.body.name,
      email,
      password,
      trainer: trainerID,
    });

    trainer.trainees.push(newUser._id);

    const salt = await bcrypt.genSalt(10);

    console.log(newUser);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    await trainer.save();
    return res.status(200).json("Trainee added successfully");
  } catch (error) {
    console.log(error);
  }
});

//register new trainer
router.post("/registerNewTrainer", async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  // const rank = 1;

  try {
    // await validationSchema2.validate(req.body, { abortEarly: false });
    let trainer = await Trainer.findOne({ email });
    if (trainer) {
      return res.status(400).json({ errors: [{ msg: "Trainer already exists" }] });
    }

    const newUser = new Trainer({
      name: req.body.name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    console.log(newUser);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    return res.status(200).json("Trainer added successfully");
  } catch (error) {
    console.log(error);
  }
});

//delete trainer by id
router.delete("/deleteTrainerByID/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Trainer.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json("error");
    }
    return res.status(200).json("Trainer deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

//delete trainee by id
router.delete("/deleteTraineeByID/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Trainee.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json("error");
    }
    return res.status(200).json("Trainee deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
