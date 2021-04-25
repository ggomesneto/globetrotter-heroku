"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const Trip = require("./trips.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  userId,
  tripId,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("get all trips", function () {
  test("works", async function () {
    let trips = await Trip.all();
    expect(trips).toEqual([
      {
        coord_destination: 123,
        coord_leaving: 123,
        creator: "u1@email.com",
        days: null,
        destination: "las vegas",
        duration: "5",
        id: tripId[0],
        leaving: "austin",
        startdate: "04-01",
        stopdate: "05-01",
        transportation: "car",
      },
    ]);
  });
});

describe("get trips using email", function () {
  test("works", async function () {
    let trips = await Trip.getTrips("u1@email.com");
    expect(trips).toEqual([
      {
        coord_destination: 123,
        coord_leaving: 123,
        creator: "u1@email.com",
        days: null,
        destination: "las vegas",
        duration: "5",
        id: tripId[0],
        leaving: "austin",
        startdate: "04-01",
        stopdate: "05-01",
        transportation: "car",
      },
    ]);
  });
  test("no trip", async function () {
    let trips = await Trip.getTrips("none");
    expect(trips).toEqual([]);
  });
});

describe("get trip by id", function () {
  test("works", async function () {
    let trip = await Trip.getTripsByID(tripId[0]);
    expect(trip).toEqual({
      coord_destination: 123,
      coord_leaving: 123,
      creator: "u1@email.com",
      days: null,
      destination: "las vegas",
      duration: "5",
      id: tripId[0],
      leaving: "austin",
      startdate: "04-01",
      stopdate: "05-01",
      transportation: "car",
    });
  });
  test("no id", async function () {
    let trip = await Trip.getTripsByID(0);
    expect(trip).toEqual(undefined);
  });
});

describe("add trip", function () {
  test("works", async function () {
    let coord_destination = 123;
    let coord_leaving = 123;
    let creator = "u1@email.com";
    let destination = "houston";
    let duration = "5";
    let leaving = "new york";
    let startdate = "03-01";
    let stopdate = "04-01";
    let transportation = "airplane";

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
    let newId = trip.id;
    expect(trip).toEqual({
      coord_destination: 123,
      coord_leaving: 123,
      creator: "u1@email.com",
      days: undefined,
      destination: "houston",
      duration: "5",
      id: newId,
      leaving: "new york",
      startdate: "03-01",
      stopdate: "04-01",
      transportation: "airplane",
    });
  });
});

describe("edit trip", function () {
  test("works", async function () {
    let coord_destination = 123;
    let coord_leaving = 123;
    let creator = "u1@email.com";
    let destination = "UPDATE";
    let duration = "5";
    let leaving = "UPDATE";
    let startdate = "03-01";
    let stopdate = "04-01";
    let transportation = "airplane";
    let days = [];
    let id = tripId[0];

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
    expect(trip).toEqual({
      coord_destination: 123,
      coord_leaving: 123,
      creator: "u1@email.com",
      days: [],
      destination: "UPDATE",
      duration: "5",
      id: tripId[0],
      leaving: "UPDATE",
      startdate: "03-01",
      stopdate: "04-01",
      transportation: "airplane",
    });
  });
});

describe("delete trip", function () {
  test("works", async function () {
    let trip = await Trip.deleteTrip(tripId[0]);
    expect(trip).toEqual({ msg: "Trip Deleted" });
  });
});
