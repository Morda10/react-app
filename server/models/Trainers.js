const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrainerSchema = new Schema({
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
    default: 1,
  },
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: "trainees",
    },
  ],
  workSchedule: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      trainee: {
        type: Schema.Types.ObjectId,
        ref: "trainees",
      },
      hour: { type: String, require: true },
      type: {
        type: Number,
        default: 1,
      },
    },
  ],
  
});



module.exports = mongoose.model("trainers", TrainerSchema);
