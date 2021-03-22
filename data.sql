DROP TABLE IF EXISTS trips;

DROP TABLE IF EXISTS users;

CREATE TABLE users 
(
    id SERIAL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    living TEXT,
    bio TEXT,
    name TEXT NOT NULL,
    img TEXT,
    PRIMARY KEY(id, email, name)
);

CREATE TABLE trips 
(   id SERIAL,
    coord_destination jsonb NOT NULL,
    coord_leaving jsonb NOT NULL,
    destination TEXT NOT NULL,
    leaving TEXT NOT NULL,
    startDate TEXT NOT NULL,
    stopDate TEXT NOT NULL,
    transportation TEXT NOT NULL,
    creator TEXT REFERENCES users(email),
    days jsonb[],
    duration TEXT NOT NULL,
    PRIMARY KEY(id,creator) 
);

