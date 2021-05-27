const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TraineeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    default: 2,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "trainers",
  },
  workoutsScheduled: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      hour: { type: String, require: true },
      type: {
        type: Number,
        default: 1,
      },
    },
  ],
 
 
});


module.exports = mongoose.model("trainees", TraineeSchema);
