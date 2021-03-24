import React, { useState, useEffect } from "react";
import axios from "axios";

import "../Dashboard/css/Resume.css";

const ViewTripResume = ({ user }) => {
  const API_URL = process.env.REACT_APP_API_URL || "/api/trips/user";
  const { living, bio } = user;

  let [trips, setTrips] = useState([]);

  let daysTraveled = 0;

  for (let trip of trips) {
    daysTraveled = daysTraveled + parseInt(trip.duration);
  }
  useEffect(() => {
    const getTrips = async () => {
      const res = await axios.get(`${API_URL}/${user.email}`);
      setTrips(res.data);
    };
    getTrips();
  }, []);

  return (
    <div className="resume-wrapper">
      <div className="resume-top">
        <div className="resume-top-left">
          <div className="resume-top-text">{living}</div>
        </div>
        <div className="resume-top-right">
          <div className="resume-top-right-info">
            <i className="far fa-flag"></i>
            <span>{trips.length}</span>
            <br /> Trips Created
          </div>
          <div className="resume-top-right-info">
            <i className="fas fa-suitcase"></i>
            <span>{daysTraveled}</span> <br /> Days Traveled
          </div>
        </div>
      </div>
      <div className="resume-bottom">
        <div className="resume-bottom-title">Bio</div>
        <div className="resume-bottom-text">{bio}</div>
      </div>
    </div>
  );
};

export default ViewTripResume;
