const db = require("../db");
const Trip = require("./trips");
const bcryptjs = require("bcryptjs");
const { ExpressError, NotFoundError } = require("../ExpressError");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  constructor({ name, email, bio, living, img, password }) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.living = living;
    this.img = img;
    this.password = password;
  }

  static async all() {
    const results = await db.query(`
        SELECT username, email FROM users
        `);
    return results.rows.map((u) => new User(u));
  }

  static async get(email) {
    const results = await db.query(
      `
        SELECT * FROM users WHERE email=$1
        `,
      [email]
    );
    const user = results.rows[0];

    if (user === undefined) {
      const err = new NotFoundError(`No such user: ${email}`);
      err.status = 404;
      throw err;
    }

    return new User(user);
  }

  static async add(name, password, email, bio, living, img) {
    const checkDb = await db.query(
      `
        SELECT email FROM users WHERE email=$1
        `,
      [email]
    );

    const checkUsername = checkDb.rows[0] ? false : true;

    if (checkUsername) {
      const hashedPassword = await bcryptjs.hash(password, BCRYPT_WORK_FACTOR);

      const result = await db.query(
        `
          INSERT INTO users (name, password, email, bio, living, img) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, name, email, bio, living, img, password
          `,
        [name, hashedPassword, email, bio, living, img]
      );

      const user = new User(result.rows[0]);

      return { isRegistered: true, ...user };
    } else {
      return { isRegistered: false };
    }
  }

  static async authenticate(email, password) {
    const result = await db.query(
      `
        SELECT  id, email, password, living, bio, img, name FROM users WHERE email=$1
        `,
      [email]
    );
    const user = result.rows[0];

    // const getFav = await db.query(
    //   `
    // SELECT tripId FROM favorited WHERE username=$1
    // `,
    //   [username]
    // );

    // const favorited = getFav.rows;

    // user.favorited = favorited;

    if (user) {
      if ((await bcryptjs.compare(password, user.password)) === true) {
        return { isUser: true, ...user };
      } else {
        return { isUser: false };
      }
    } else {
      return { isUser: false };
    }
  }

  static async save(name, bio, living, img, id) {
    console.log(name, bio, living, img, id);
    const res = await db.query(
      `
        UPDATE users SET name=$1, bio=$2, living=$3, img=$4 WHERE id=$5 RETURNING id, name, bio, living, email, password, img ;
        `,
      [name, bio, living, img, id]
    );

    console.log(res.rows[0]);

    if (!res.rows) {
      throw new ExpressError("Cannot update user", 400);
    } else {
      let user = res.rows[0];
      return user;
    }
  }

  async trips() {
    const results = await Trip.getTrips(this.username);
    return results;
  }
}

module.exports = User;
