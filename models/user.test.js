"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const User = require("./user.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  userId,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("u1@email.com", "password1");
    expect(user).toEqual({
      isUser: true,
      id: userId[0],
      bio: "U1L",
      email: "u1@email.com",
      img: "U1L",
      living: "U1L",
      name: "u1",
      password: userId[1],
    });
  });

  test("unauth if no such user", async function () {
    const user = await User.authenticate("nope", "password");

    expect(user).toEqual({
      isUser: false,
    });
  });

  test("unauth if wrong password", async function () {
    const user = await User.authenticate("nope", "password");

    expect(user).toEqual({
      isUser: false,
    });
  });
});

describe("add", function () {
  let email = "new@new.com";
  let name = "newUser";
  let bio = "newBio";
  let living = "newLiving";
  let img = "newImg";
  let password = "password";

  test("works", async function () {
    let user = await User.add(name, password, email, bio, living, img);

    let hashedPass = user.password;
    let userId = user.id;
    expect(user).toEqual({
      email,
      name,
      bio,
      living,
      img,
      password: hashedPass,
      id: userId,
      isRegistered: true,
    });
  });

  test("bad request with dup data", async function () {
    let email = "new@new.com";
    let name = "newUser";
    let bio = "newBio";
    let living = "newLiving";
    let img = "newImg";
    let password = "password";

    await User.add(name, password, email, bio, living, img);
    const user = await User.add(name, password, email, bio, living, img);

    expect(user).toEqual({
      isRegistered: false,
    });
  });
});

describe("get", function () {
  test("works", async function () {
    let user = await User.get("u1@email.com");
    expect(user).toEqual({
      bio: "U1L",
      email: "u1@email.com",
      id: userId[0],
      img: "U1L",
      living: "U1L",
      name: "u1",
      password: userId[1],
    });
  });
  test("not found if no such user", async function () {
    try {
      await User.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update", function () {
  test("works", async function () {
    let name = "newUser";
    let bio = "newBio";
    let living = "newLiving";
    let img = "newImg";
    let id = userId[0];

    const user = await User.save(name, bio, living, img, id);

    expect(user).toEqual({
      name: "newUser",
      bio: "newBio",
      living: "newLiving",
      img: "newImg",
      id: userId[0],
      email: "u1@email.com",
      password: userId[1],
    });
  });
});
