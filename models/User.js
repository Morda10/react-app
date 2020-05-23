const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    ref: "users",
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
  trainees: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
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
        ref: "users",
      },
      hour: { type: String, require: true },
      type: {
        type: Number,
        default: 1,
      },
    },
  ],
  measurement: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      trainer: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      measures: {
        waist: {
          type: String,
        },
        thighes: {
          type: String,
        },
        pelvis: {
          type: String,
        },
        arms: {
          type: String,
        },
      },
    },
  ],
  //   active: {
  //     type: Boolean,
  //     default: false
  //   },
  //   activateToken: {
  //     type: String
  //   },
  //   resetPasswordToken: {
  //     type: String
  //   },
  //   resetPasswordExpires: {
  //     type: Date
  //   }
  // },
  // { timestamps: true }
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

module.exports = mongoose.model("users", UserSchema);
