"use strict";

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 5000;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "globetrotter_test"
    : process.env.DATABASE_URL || "globetrotter";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
