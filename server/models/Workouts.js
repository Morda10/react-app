const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
    unique: true,
  },
  hours: {
    type: [String],
  },
  type: {
    type: Number,
    default: 1,
  },
});


module.exports = mongoose.model("workouts", WorkoutSchema);
