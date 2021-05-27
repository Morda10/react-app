const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// const middleware = require("./middleware/auth");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/workouts", require("./routes/api/workouts"));
app.use("/api/trainers", require("./routes/api/trainers"));
app.use("/api/trainees", require("./routes/api/trainees"));
app.use("/api/measurements", require("./routes/api/measurements"));
//app.use('/api/user', middleware, require('./routes/api/user'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
