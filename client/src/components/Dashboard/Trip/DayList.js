import React, { useEffect, useState } from "react";

import Day from "./Day";

import "./css/DayList.css";

const { v4: uuidv4 } = require("uuid");

const DayList = ({ show, locations, handleDelete }) => {
  const [places, setPlaces] = useState(locations);

  locations = locations.sort(function (a, b) {
    return new Date(a.startdate) - new Date(b.startdate);
  });

  useEffect(() => {
    setPlaces(locations);
  }, [locations]);

  return (
    <div style={!show ? { display: "none" } : null} className="day-list">
      {places.map((l) => (
        <Day key={uuidv4()} data={l} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default DayList;
