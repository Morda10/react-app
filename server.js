const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const middleware = require("./middleware/auth");
const app = express();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExractJwt = passportJWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new JwtStrategy(opts, (payload, next) => {
  const user = null;
  next(null, user);
});
passport.use(strategy);
app.use(passport.initialize());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/workouts", require("./routes/api/workouts"));
//app.use('/api/user', middleware, require('./routes/api/user'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
