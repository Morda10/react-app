const express = require("express");
const router = express.Router();
const Workouts = require("../../models/Workouts");
const User = require("../../models/Trainees");
const Trainer = require("../../models/Trainers");
const moment = require("moment");
const {twoWeeksArrayMaker} = require("../../functions");
const auth = require("../../middleware/auth");

//get workouts by date
router.get("/:date", async (req, res) => {
  const today = moment.utc(new Date().setHours(3, 0, 0)).format();
  const StartWork = 10;
  const LastWorkout = 22;
  const twoWeeksArr = twoWeeksArrayMaker(today, StartWork, LastWorkout);
  // console.log(twoWeeksArr)
  try {
    const date1 = moment(req.params.date, "DD-MM-YYYY").format();
    const date2 = moment(date1)
      .add(2, "weeks")
      .add(1, "days")
      .format();

    const workouts = await Workouts.find({
      date: { $gte: date1, $lte: date2 },
    });
    if (workouts.length !== 0) {
      workouts.map((o) => {
        for (let i = 0; i < twoWeeksArr.length; i++) {
          const t = twoWeeksArr[i];
          const tdate = moment(t.date).format("DD-MM-YYYY");
          const odate = moment(o.date).format("DD-MM-YYYY");
          if (tdate === odate) {
            t.hours = t.hours.filter((h) => !o.hours.includes(h));
          }
          
        }
      });
    }
    return res.status(200).json(twoWeeksArr);
  } catch (e) {
    console.log(e);
  }
});

//remember to add auth
//add workouts by date and hour
router.post("/", async (req, res) => {
  const userID = req.body.userID;
  const date = moment
    .utc(req.body.date)
    .add(3, "hours")
    .format();
  const hour = req.body.hours[0];
  const type = req.body.type ? req.body.type : 1;
  // console.log(date);
  try {
    let workouts = await Workouts.findOne({ date });
    let trainee = await User.findById(userID);
    if (!trainee) {
      return res.status(400).json({ errors: [{ msg: "Wrong userID" }] });
    }
    let trainer = await Trainer.findById(trainee.trainer);
    // let trainer = await Trainer.findById(trainee.trainer).populate();
    if (!trainer) {
      return res.status(400).json({ errors: [{ msg: "No trainer assigned" }] });
    }
    if (workouts) {
      console.log(workouts.hours);
      if (!workouts.hours.includes(hour)) {
        workouts.hours.push(hour);
        await workouts.save();
      } else {
        return res.status(200).json("This hour on this day already taken");
      }
    } else {
      const workout = new Workouts({
        date,
        hours: [hour],
        type,
      });
      await workout.save();
    }

    trainee.workoutsScheduled.push({ date, hour, type });
    trainer.workSchedule.push({ date, trainee: trainee._id, hour, type });
    // console.log(trainee, trainer);
    await trainer.save();
    await trainee.save();

    return res.status(200).json("Workout saved successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
