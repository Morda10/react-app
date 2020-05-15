const express = require("express");
const router = express.Router();
const Yup = require("yup");
const auth = require("../../middleware/auth");
const Workouts = require("../../models/Workouts");
const moment = require("moment");
const twoWeeksArrayMaker = require("../../functions");

const validationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  hours: Yup.array(),
  type: Yup.number()
    .min(1, "type must be 1 or more")
    .max(4, "type must be 1 or less"),
});

//get workouts by date
router.get("/:date", async (req, res) => {
  const today = moment.utc(new Date().setHours(3, 0, 0)).format();
  // today.setHours(3, 0, 0);
  // console.log(today);
  const StartWork = 10;
  const LastWorkout = 22;
  const twoWeeksArr = twoWeeksArrayMaker(today, StartWork, LastWorkout);
  // console.log(twoWeeksArr);
  try {
    // console.log(req.params.date);
    const date1 = moment(req.params.date, "DD-MM-YYYY").format();
    const date2 = moment(date1)
      .add(2, "weeks")
      .add(1, "days")
      .format();
    // console.log(date2);
    const workouts = await Workouts.find({
      date: { $gte: date1, $lte: date2 },
    });
    // console.log(workouts);
    if (workouts.length !== 0) {
      workouts.map((o) => {
        twoWeeksArr.forEach((t) => {
          const tdate = moment(t.date).format("DD-MM-YYYY");
          const odate = moment(o.date).format("DD-MM-YYYY");
          if (tdate === odate) {
            // console.log(tdate, odate);
            t.hours = t.hours.filter((h) => !o.hours.includes(h));
          }
        });
        // return true;
      });
    }
    // console.log(twoWeeksArr);
    return res.status(200).json(twoWeeksArr);
  } catch (e) {
    console.log(e);
  }
});

// const today = new Date();
// const twoWeeksArr = twoWeeksArrayMaker(today, StartWork, LastWorkout);
// const formatted = moment(today).format("DD-MM-YYYY");
// async function fetchData() {
//   const res = await axios.get(`/api/workouts/${formatted}`);
//   // console.log(res.data);
//   if (res.data.length !== 0) {
//     const occupiedHours = res.data;

//     occupiedHours.map((o) => {
//       twoWeeksArr.forEach((t) => {
//         if (t.date === o.date) {
//           t.hours = t.hours.filter((h) => !o.hours.includes(h));
//         }
//       });
//       return true;
//     });
//     setDates(twoWeeksArr);
//     console.log(twoWeeksArr);
//     console.log(Dates);
//   }

//remember to add auth
//add workouts by date and hour
router.post("/", async (req, res) => {
  const date = moment
    .utc(req.body.date)
    .add(3, "hours")
    .format();
  const hour = req.body.hours;
  const type = req.body.type ? req.body.type : 1;
  // console.log(date);
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    let workouts = await Workouts.findOne({ date });
    // console.log(workouts);
    if (workouts) {
      if (!workouts.hours.includes(hour[0])) {
        workouts.hours.push(hour[0]);
        await workouts.save();
      } else {
        return res.status(200).json("This hour on this day already taken");
      }
    } else {
      const workout = new Workouts({
        date,
        hours: hour,
        type,
      });
      await workout.save();
    }

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
