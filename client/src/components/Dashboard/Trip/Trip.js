import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { deleteTripFromAPI } from "../../../actions/trip";
import { updateTripOnAPI } from "../../../actions/trip";
import "./css/Trip.css";
import AddPlace from "./AddPlace";
import DayList from "./DayList";
import EditTrip from "./EditTrip";
import { NavLink } from "react-router-dom";

const Trip = ({ data, handleSelected, clearMap }) => {
  const [showMore, setShowMore] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  let { email } = user;

  let places;
  if (!data.days) {
    places = [];
  } else {
    places = data.days;
  }

  let { destination, startdate, stopdate, transportation, id } = data;

  let duration = 0;
  let start = new Date(startdate);
  let stop = new Date(stopdate);

  duration = Math.ceil((stop - start) / (1000 * 60 * 60 * 24));

  const handleDelete = () => {
    dispatch(deleteTripFromAPI(id, email));
    clearMap();
  };

  const addDay = (day) => {
    let dayList = data.days || [];
    dayList.push(day);

    let patchTrip = { ...data, days: dayList };

    dispatch(updateTripOnAPI(data.id, patchTrip));
  };

  const deleteDay = (id) => {
    let dayList = data.days;
    let newList = dayList.filter((day) => day.id !== id);
    let patchTrip = { ...data, days: newList };
    dispatch(updateTripOnAPI(data.id, patchTrip));
  };

  const handleClick = () => {
    handleSelected(data);
    setShow(!show);
  };

  return (
    <div className="trip-wrapper">
      <div className="trip-line">
        <div className="trip-city" onClick={handleClick}>
          {destination}
        </div>
        <div className="trip-start" onClick={handleClick}>
          {startdate}
        </div>
        <div className="trip-end" onClick={handleClick}>
          {stopdate}
        </div>
        <div className="trip-duration" onClick={handleClick}>
          {duration > 1 ? duration + " days" : duration + " day"}
        </div>
        <div className="trip-transport" onClick={handleClick}>
          {transportation}
        </div>
        <div className="trip-more">
          <div className="trip-btn" onClick={() => setShowMore(!showMore)}>
            ...
          </div>
          <div
            style={!showMore ? { display: "none" } : null}
            className="trip-dropdown"
          >
            <EditTrip data={data} />
            <div className="trip-dropdown-btn" onClick={handleDelete}>
              Delete
            </div>
            <div className="trip-dropdown-btn">
              <NavLink exact to={`/trip/${data.id}`}>
                Share trip
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="trip-add-day" style={!show ? { display: "none" } : null}>
        <AddPlace addDay={addDay} trip={data} />
      </div>
      <DayList locations={places} show={show} handleDelete={deleteDay} />
    </div>
  );
};

export default Trip;
