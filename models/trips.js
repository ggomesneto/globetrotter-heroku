const db = require("../db");
const { BadRequestError, NotFoundError } = require("../ExpressError");

class Trip {
  constructor({
    coord_destination,
    coord_leaving,
    destination,
    leaving,
    startdate,
    stopdate,
    transportation,
    creator,
    id,
    days,
    duration,
  }) {
    this.coord_destination = coord_destination;
    this.coord_leaving = coord_leaving;
    this.destination = destination;
    this.leaving = leaving;
    this.startdate = startdate;
    this.stopdate = stopdate;
    this.transportation = transportation;
    this.creator = creator;
    this.id = id;
    this.days = days;
    this.duration = duration;
  }

  static async all() {
    const result = await db.query(`
        SELECT * FROM trips
        `);
    return result.rows;
  }

  static async getTrips(email) {
    const result = await db.query(
      `
        SELECT * FROM trips WHERE creator=$1
        `,
      [email]
    );
    return result.rows;
  }

  static async getTripsByID(id) {
    const result = await db.query(
      `
        SELECT * FROM trips WHERE id=$1
        `,
      [id]
    );

    return result.rows[0];
  }

  static async addTrip(
    coord_destination,
    coord_leaving,
    destination,
    leaving,
    startdate,
    stopdate,
    transportation,
    creator,
    duration
  ) {
    let add = await db.query(
      `INSERT INTO trips (coord_destination, coord_leaving, destination, leaving, startdate, stopdate, transportation, creator, duration) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING  id, coord_destination, coord_leaving, destination, leaving, startdate, stopdate, transportation, creator, duration`,
      [
        coord_destination,
        coord_leaving,
        destination,
        leaving,
        startdate,
        stopdate,
        transportation,
        creator,
        duration,
      ]
    );

    let trip = new Trip(add.rows[0]);
    return trip;
  }

  static async editTrip(
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
  ) {
    try {
      const res = await db.query(
        `
        UPDATE trips SET coord_destination=$1, coord_leaving=$2, destination=$3, leaving=$4, startdate=$5, stopdate=$6, transportation=$7, days=$8, duration=$9 WHERE id =$10 RETURNING coord_destination, coord_leaving, destination, leaving, startdate, stopdate, transportation, id, days, creator, duration
        `,
        [
          coord_destination,
          coord_leaving,
          destination,
          leaving,
          startdate,
          stopdate,
          transportation,
          days,
          duration,
          id,
        ]
      );

      let trip = res.rows[0];

      return trip;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteTrip(id) {
    await db.query(` DELETE FROM trips WHERE id=$1`, [id]);
    return { msg: "Trip Deleted" };
  }
}

module.exports = Trip;
