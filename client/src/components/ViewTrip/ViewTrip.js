import React, { useState, useEffect } from "react";

import axios from "axios";

import "./css/ViewTrip.css";

import ViewTripMap from "./ViewTripMap";
import Menu from "../Menu";
import ViewTripResume from "./ViewTripResume";

import { useParams, useHistory, NavLink } from "react-router-dom";

const ViewTrip = () => {
  const params = useParams();
  const API_URL_USER = process.env.REACT_APP_API_URL || "/api/users";
  const API_URL_TRIP = process.env.REACT_APP_API_URL || "/api/trips";

  const id = params.id;

  const [tripData, setTripData] = useState(null);
  const [missing, setMissing] = useState(false);
  const [creator, setCreator] = useState({});

  useEffect(() => {
    const getTrip = async (id) => {
      const res = await axios.get(`${API_URL_TRIP}/${id}`);
      let trip = res.data;
      if (Object.keys(trip).length === 0) {
        setMissing(true);
      } else {
        setTripData(trip);
        let creator = trip.creator;

        let creatorInfo = await axios.get(`${API_URL_USER}/${creator}`);

        creatorInfo = creatorInfo.data.user;
        setCreator(creatorInfo);
      }
    };
    getTrip(id);
  }, []);

  if (missing) {
    return (
      <div className="viewtrip-notrip">
        <NavLink exact to="/dashboard">
          There is no trip with this id
        </NavLink>
      </div>
    );
  }

  if (!tripData) {
    return <div className="loading">Loading</div>;
  }

  let days;
  if (tripData.days) {
    days = tripData.days;
  } else {
    days = [];
  }

  return (
    <div className="viewtrip-wrapper">
      <Menu />
      <ViewTripMap trip={tripData} user={creator} />
      <ViewTripResume user={creator} />
      <div className="viewtrip-trip">
        <div className="viewtrip-trip-destination">{tripData.destination}</div>
        <div className="viewtrip-trip-startdate">{tripData.startdate}</div>
        <div className="viewtrip-trip-stopdate">{tripData.stopdate}</div>
        <div className="viewtrip-trip-duration">{tripData.duration} day(s)</div>
        <div className="viewtrip-trip-transportation">
          {tripData.transportation}
        </div>
      </div>
      <div className="viewtrip-days">
        <div className="viewtrip-days-label">Detailed Days:</div>
        {days.map((day) => (
          <div className="viewtrip-day-wrapper">
            <div className="viewtrip-day">
              <div className="viewtrip-day-destination">{day.destination}</div>
              <div className="viewtrip-day-date">{day.startdate}</div>
            </div>
            <div className="viewtrip-day-details">
              <div className="viewtrip-day-text">{day.details}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTrip;
