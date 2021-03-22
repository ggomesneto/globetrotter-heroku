import React, { useState } from "react";

import TripForm from "./TripForm";

import "./css/AddTrip.css";

const AddTrip = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="addtrip-wrapper">
      {!open ? (
        <div className="addtrip-bar-closed" onClick={handleOpen}>
          + ADD NEW TRIP
        </div>
      ) : (
        <div className="addtrip-bar-open ">
          New trip <span onClick={handleOpen}>X</span>
        </div>
      )}
      {open ? (
        <div className="addtrip-content">
          <TripForm close={handleOpen} />
        </div>
      ) : null}
    </div>
  );
};

export default AddTrip;
