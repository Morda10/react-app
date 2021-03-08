const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeasurementSchema = new Schema({
  
    user: {
      type: Schema.Types.ObjectId,
      ref: "trainees",
    },
    measurements: 
    [ { date: {
        type: Date,
        default: Date.now,
        required: true
      },
      weight: {
        type: Number,
        default: 0,
      },
      waist: {
        type: Number,
         default: 0,
      },
      arms: {
        type: Number,
         default: 0,
      },
      thighes: {
        type: Number,
         default: 0,
      },
      pelvis: {
        type: Number,
        default: 0,
      },}
    ]
  },
);


module.exports = mongoose.model("measurements", MeasurementSchema);
