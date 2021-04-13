const bcryptjs = require("bcryptjs");

const db = require("../db.js");

const { BCRYPT_WORK_FACTOR } = require("../config");

let userId = [];

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
  userId
};
