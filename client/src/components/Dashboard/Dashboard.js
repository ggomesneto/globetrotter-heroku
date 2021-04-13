import React, { useEffect, useState } from "react";

import Map from "./Map";
import Resume from "./Resume";
import Menu from "../Menu";
import AddTrip from "./AddTrip/AddTrip";
import Trip from "./Trip/Trip";

import { getTripsFromAPI } from "../../actions/trip";
import { getUserInfoFromAPI } from "../../actions/user";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./css/Dashboard.css";

const { v4: uuidv4 } = require("uuid");

const Dashboard = () => {
  const token = window.sessionStorage.getItem("token");
  const email = window.sessionStorage.getItem("email");

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoFromAPI(token, email));
    } else {
      history.push("/login");
    }
  }, []);

  const user = useSelector((state) => state.user.user);
  const trips = useSelector((state) => state.trips.trips);
  const history = useHistory();

  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(getTripsFromAPI(user.email));
    }
  }, [user]);

  if (!user) {
    return <div className="redirect">Redirecting</div>;
  }

  const handleSelected = (data) => {
    setSelected(data);
  };

  const clearMap = () => {
    setSelected({});
  };

  return (
    <div className="dashboard-wrapper">
      <Menu />
      <Map trip={selected} />
      <Resume />
      <AddTrip />
      {trips.map((trip) => (
        <Trip
          handleSelected={handleSelected}
          key={uuidv4()}
          data={trip}
          clearMap={clearMap}
        />
      ))}
    </div>
  );
};

export default Dashboard;
