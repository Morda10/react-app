const express = require("express");
const router = express.Router();
const Yup = require("yup");
const auth = require("../../middleware/auth");
const Workouts = require("../../models/Workouts");
const moment = require("moment");

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  type: Yup.number()
    .min(1, "type must be 1 or more")
    .max(4, "type must be 1 or less"),
});

//get workouts by date
router.get("/:date", async (req, res) => {
  try {
    const date1 = moment(req.params.date, "DD-MM-YYYY").format();
    const date2 = moment(date1).add(1, "days").format();
    const workouts = await Workouts.find({
      date: { $gte: date1, $lt: date2 },
    });
    return res.status(200).json(workouts);
  } catch (e) {
    console.log(e);
  }
});

//remember to add auth
//add workouts by date and hour
router.post("/", async (req, res) => {
  // console.log("object");
  // console.log(req.body.date);
  const date = new Date(req.body.date);
  const type = req.body.type ? req.body.type : 1;
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    let workouts = await Workouts.find({ date });
    // console.log(workouts);
    if (workouts.length !== 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This hour on this day already taken" }] });
    }

    const workout = new Workouts({
      date,
      type,
    });

    await workout.save();

    return res.status(200).json("Workout saved successfully");
  } catch (error) {
    console.log(error);
  }
});

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await User.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(400).json("error");
//     }
//     return res.status(200).json("ss");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
