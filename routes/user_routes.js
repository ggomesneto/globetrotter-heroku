const express = require("express");
const User = require("../models/user");
const { ensureLoggedIn } = require("../middleware/auth");
const { ExpressError } = require("../ExpressError");
const db = require("../db");
const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const Trip = require("../models/trips");
const router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const users = await User.all();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ExpressError("Email and Password Required", 400);
    }
    const result = await User.authenticate(email, password);

    if (result.isUser) {
      let token = jwt.sign({ email }, SECRET_KEY);

      return res.json({ ...result, token });
    } else {
      return res.json({ isUser: false });
    }
  } catch (e) {
    return next(e);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const { email, password, name, bio, living, img } = req.body;

    if (!name || !password || !email) {
      throw new ExpressError("Missing Information", 400);
    }

    const result = await User.add(name, password, email, bio, living, img);

    console.log(result);
    if (result.isRegistered) {
      let token = jwt.sign({ email }, SECRET_KEY);

      return res.status(201).json({ ...result, token });
    } else {
      return res.json(result);
    }
  } catch (e) {
    if (e.code === "23505") {
      const err = new ExpressError("User already in use", 404);
      return next(err);
    } else {
      return next(e);
    }
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    const { name, bio, living, img } = req.body;
    const id = parseInt(req.params.id);

    if (!name || !bio || !living || !id) {
      throw new ExpressError("Missing Information", 400);
    }

    const result = await User.save(name, bio, living, img, id);

    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

router.get("/:email", ensureLoggedIn, async function (req, res, next) {
  try {
    let email = req.params.email;

    const user = await User.get(email);

    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
