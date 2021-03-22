import React, { useState } from "react";

import "./css/Day.css";

const Day = ({ data, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const { destination, details, startdate, id } = data;

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="day-wrapper">
      <div className="day-date">{startdate}</div>
      <div className="day-box">
        <div className="day-city" onClick={handleOpen}>
          <i className="fas fa-map-marker"></i> {destination}
        </div>
        <div className="day-btns">
          <div className="day-btn-delete" onClick={() => handleDelete(id)}>
            delete
          </div>
        </div>
      </div>
      {open ? (
        <div className="day-details">
          <div className="day-details-title">Details:</div>
          <div className="day-details-text">{details}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Day;
