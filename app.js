const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const { ExpressError } = require("./ExpressError");
const tripRoutes = require("./routes/trip_routes");
const userRoutes = require("./routes/user_routes");
const { authenticateJWT } = require("./middleware/auth");

app.use(cors());

//allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//get auth token for all routes
app.use(authenticateJWT);

// routes

app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

// 404 handler

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// General error handler

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;
