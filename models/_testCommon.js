const bcryptjs = require("bcryptjs");

const db = require("../db.js");

const { BCRYPT_WORK_FACTOR } = require("../config");

let userId = [];
let tripId = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM trips");

  await db.query("DELETE FROM users");

  const user = await db.query(
    `   INSERT INTO users (name, password, email, bio, living, img)
        VALUES ('u1', $1, 'u1@email.com', 'U1L', 'U1L','U1L')
        RETURNING id, name, email, bio, living, img, password`,
    [await bcryptjs.hash("password1", BCRYPT_WORK_FACTOR)]
  );

  userId.push(user.rows[0].id);
  userId.push(user.rows[0].password);

  const trip = await db.query(
    `INSERT INTO trips (coord_destination, coord_leaving, destination, leaving, startdate, stopdate, transportation, creator, duration) VALUES ('123','123','las vegas','austin','04-01','05-01','car','u1@email.com', '5') RETURNING  id, coord_destination, coord_leaving, destination, leaving, startdate, stopdate, transportation, creator, duration`
  );

  tripId.push(trip.rows[0].id);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  userId,
  tripId,
};
