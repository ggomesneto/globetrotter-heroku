const e = require("express");
const express = require("express");
const ExpressError = require("../ExpressError");
const {
  asyncCheck,
  ensureLoggedIn,
  ensureCorrectUser,
} = require("../middleware/auth");
const Trip = require("../models/trips");

const router = new express.Router();

// GET ALL TRIPS - DOESNT NEED TO BE LOGGED IN

router.get("/", async function (req, res, next) {
  try {
    const trips = await Trip.all();
    return res.json({ trips });
  } catch (e) {
    return next(e);
  }
});

// GET USERNAME TRIPS

router.get("/user/:email", async function (req, res, next) {
  try {
    const email = req.params.email;

    const trips = await Trip.getTrips(email);

    return res.json(trips);
  } catch (e) {
    return next(e);
  }
});

//GET SPECIFIC TRIP USING AN ID - DOESNT NEED TO BE LOGGED IN (MAYBE CHANGE IT IN THE FUTURE)

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    const trip = await Trip.getTripsByID(id);

    return res.json({ ...trip });
  } catch (e) {
    return next(e);
  }
});

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const {
      coord_destination,
      coord_leaving,
      destination,
      leaving,
      startdate,
      stopdate,
      transportation,
      creator,
      duration,
    } = req.body;

    let trip = await Trip.addTrip(
      coord_destination,
      coord_leaving,
      destination,
      leaving,
      startdate,
      stopdate,
      transportation,
      creator,
      duration
    );

    return res.json({ ...trip });
  } catch (e) {
    return next(e);
  }
});

//EDIT A TRIP - TRYING TO FIND OUT A WAY TO CHECK USERS HERE - FOR NOW THE CHECK IS BEING MADE ON THE FRONTEND

router.patch("/:id", async function (req, res, next) {
  try {
    const {
      coord_destination,
      coord_leaving,
      destination,
      leaving,
      startdate,
      stopdate,
      transportation,
      days,
      duration,
    } = req.body;

    const id = req.params.id;

    let trip = await Trip.editTrip(
      coord_destination,
      coord_leaving,
      destination,
      leaving,
      startdate,
      stopdate,
      transportation,
      days,
      duration,
      id
    );

    return res.json(trip);
  } catch (e) {
    return next(e);
  }
});

//EDIT A TRIP - TRYING TO FIND OUT A WAY TO CHECK USERS HERE - FOR NOW THE CHECK IS BEING MADE ON THE FRONTEND

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const del = await Trip.deleteTrip(req.params.id);

    return res.json(del);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
