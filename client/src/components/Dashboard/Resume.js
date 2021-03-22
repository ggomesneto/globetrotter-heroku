import React from "react";

import { useSelector } from "react-redux";

import "./css/Resume.css";

const Resume = () => {
  const trips = useSelector((state) => state.trips.trips);

  let daysTraveled = 0;

  for (let trip of trips) {
    daysTraveled = daysTraveled + parseInt(trip.duration);
  }

  const user = useSelector((state) => state.user.user);
  const { living, bio } = user;
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

export default Resume;
