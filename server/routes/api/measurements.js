const express = require("express");
const router = express.Router();
const moment = require("moment");
const Trainee = require("../../models/Trainees");
const Trainer = require("../../models/Trainers");
const Measurements = require("../../models/Measurement");
const {isDateInArr} = require("../../functions")



// get all measurements of a trainee
router.get("/getAllMeasurementsByID/:id", async (req, res) => {
  const userID = req.params.id;
  
  try {
    const measurements = await Measurements.findOne({user: userID});
    console.log(measurements)
    if (measurements) {
      return res.status(200).json(measurements);
    }
    return res.status(200).json("No measurements found");
  } catch (e) {
    console.log(e);
  }
});

// create measurement
router.post("/createMeasurement", async (req, res) => {
  const {user, measurement} = req.body;
  console.log(req.body);
  try {
    let userMeasurements = await Measurements.findOne({ user: user });
    // console.log(userMeasurements)
    if(!userMeasurements) {
      // create new
      const newRecord = new Measurements({
        user: user,
        measurements: [measurement]
      });  
      console.log(newRecord)  
      await newRecord.save();
      return res.status(200).json(newRecord);
    }
    else{
      // this date already exist
      if(isDateInArr(measurement.date,  userMeasurements.measurements))  {
         return res.status(200).json({err : "There is a record for this date!"});
        }
      // add to existed record
      userMeasurements.measurements.push(measurement)
      await userMeasurements.save();
    }
   
    return res.status(200).json(userMeasurements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});


// delete measurement by date
router.post("/deleteMeasurementByDateAndUser", async (req, res) => {
  const { date, userID} = req.body;
  console.log(req.body);
  try {
    let userMeasurements = await Measurements.findOne({ user: userID });
    if(!userMeasurements)  return res.status(200).json("This measurement doesn't exist");
    // find correct measurement by date in the measurements arr and remove it from arr and save 

    // await userMeasurements.save();
    return res.status(200).json("Measurement deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

// update measurement by date
// router.put("/updateMeasurementByDateAndUser", async (req, res) => {
//   const { date, userID} = req.body;
//   try {
//     let user = await User.findByIdAndUpdate(userID);
//     let workout = await Workouts.findOne({ date });
//     console.log(req.body);
  
//     await trainer.save();
//     return res.status(200).json("workout deleted");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ errors: [{ msg: "Server error" }] });
//   }
// });

module.exports = router;

