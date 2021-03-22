const e = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.headers.token;

    const payload = jwt.verify(tokenFromBody, SECRET_KEY);

    req.user = payload;
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    console.log("nao passou");
    return next({ status: 401, message: "Unauthorized" });
  }
  console.log("passou");
  return next();
}

function ensureCorrectUser(req, res, next) {
  try {
    if (req.user.username === req.params.username) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

async function asyncCheck(req, res, next) {
  try {
    let checkUser = await Trip.getTripByID(req.params.id);

    if (checkUser.username === req.user.username) {
      return next();
    }
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

module.exports = {
  authenticateJWT,
  ensureCorrectUser,
  asyncCheck,
  ensureLoggedIn,
};
