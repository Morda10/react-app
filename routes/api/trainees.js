const express = require("express");
const router = express.Router();
const moment = require("moment");
const User = require("../../models/Trainee");
const Workouts = require("../../models/Workouts");

//get scheduled workouts of a trainee
router.get("/scheduled/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const scheduled = await User.findById(userID).select("workoutsScheduled");
    if (scheduled.length !== 0) {
      //  const filteredList = filterDates(scheduled.workoutsScheduled) filter days out of two weeks range
      return res.status(200).json(scheduled.workoutsScheduled);
    }
    return res.status(200).json([]);
  } catch (e) {
    console.log(e);
  }
});

//need to delete from trainer workSchedule as well
router.put("/deleteWorkout", async (req, res) => {
  const { workoutID, userID, workoutDate, hour } = req.body;
  const date = moment(workoutDate).format();
  try {
    let user = await User.findByIdAndUpdate(userID);
    let workout = await Workouts.findOne({ date });
    console.log(req.body);
    if (!user || !workout)
      return res
        .status(400)
        .json({ errors: [{ msg: "User or workout does not exists" }] });
    let trainer = await User.findById(user.trainer).populate();
    console.log("heree");
    user.workoutsScheduled = user.workoutsScheduled.filter(
      (w) => JSON.stringify(w._id) !== JSON.stringify(workoutID)
    );
    trainer.workSchedule = trainer.workSchedule.filter(
      (w) =>
        (JSON.stringify(w.trainee) === JSON.stringify(userID) &&
          w.hour !== hour) ||
        JSON.stringify(w.trainee) !== JSON.stringify(userID)
    );
    workout.hours = workout.hours.filter((h) => h !== hour);

    await user.save();
    await workout.save();
    await trainer.save();
    return res.status(200).json("workout deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;

