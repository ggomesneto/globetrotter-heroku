import axios from "axios";

import { ADD_TRIP, FETCH_TRIPS, PATCH_TRIP, DEL_TRIP } from "../actions/types";

// http://localhost:5000
const API_URL = process.env.REACT_APP_API_URL || "/api/trips";

export function addTripToAPI(trip) {
  const {
    coord_destination,
    coord_leaving,
    destination,
    leaving,
    startdate,
    stopdate,
    transportation,
    creator,
    duration,
  } = trip;

  let token = window.sessionStorage.getItem("token");
  let config = {
    headers: {
      token,
    },
  };

  return async function (dispatch) {
    const response = await axios.post(
      `${API_URL}`,
      {
        coord_destination,
        coord_leaving,
        destination,
        leaving,
        startdate,
        stopdate,
        transportation,
        creator,
        duration,
      },
      config
    );
    let trip = response.data;

    return dispatch(addTrip(trip));
  };
}

function addTrip(trip) {
  return {
    type: ADD_TRIP,
    trip,
  };
}

export function getTripsFromAPI(email) {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/user/${email}`);
    let trips = response.data;

    return dispatch(getTrips(trips));
  };
}

function getTrips(trips) {
  return {
    type: FETCH_TRIPS,
    trips,
  };
}

export function deleteTripFromAPI(id, email) {
  let token = window.sessionStorage.getItem("token");
  let data = {
    email,
  };

  return async function (dispatch) {
    await axios.delete(`${API_URL}/${id}`, {
      data,
      headers: {
        token,
      },
    });

    return dispatch(deleteTrip(id));
  };
}

function deleteTrip(id) {
  return {
    type: DEL_TRIP,
    id,
  };
}

export function updateTripOnAPI(id, trip) {
  let token = window.sessionStorage.getItem("token");

  let config = {
    headers: {
      token,
    },
  };

  return async function (dispatch) {
    const response = await axios.patch(`${API_URL}/${id}`, trip, config);
    let tripData = response.data;

    return dispatch(updateTrip(tripData, id));
  };
}

function updateTrip(tripData, id) {
  return {
    type: PATCH_TRIP,
    tripData,
    id,
  };
}
