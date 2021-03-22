import React, { useEffect, useState } from "react";

import Map from "./Map";
import Resume from "./Resume";
import Menu from "../Menu";
import AddTrip from "./AddTrip/AddTrip";
import Trip from "./Trip/Trip";

import { getTripsFromAPI } from "../../actions/trip";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./css/Dashboard.css";

const { v4: uuidv4 } = require("uuid");

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const trips = useSelector((state) => state.trips.trips);
  const history = useHistory();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(getTripsFromAPI(user.email));
    }
  }, [user]);

  if (!user) {
    history.push("/login");
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
