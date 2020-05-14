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

// UserSchema.pre("save", function(next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   bcrypt.genSalt(10, (e, salt) => {
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

module.exports = mongoose.model("workouts", WorkoutSchema);
