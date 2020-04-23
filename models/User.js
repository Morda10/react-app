const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//import bcrypt from "bcryptjs";

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
    default: 1,
  },
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
