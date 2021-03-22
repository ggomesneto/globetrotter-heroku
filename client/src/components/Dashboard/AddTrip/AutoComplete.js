import React from "react";

import "./css/AutoComplete.css";

const { v4: uuidv4 } = require("uuid");

const AutoComplete = ({ list, setLocation }) => {
  if (!list) {
    return null;
  }

  return (
    <div className="autocomplete-wrapper">
      {list.map((location) => (
        <div
          className="autocomplete-item"
          key={uuidv4()}
          onClick={() => {
            setLocation(location);
          }}
        >
          {location.street ? location.street + ", " : null}
          {location.city ? location.city + ", " : null}
          {location.state ? location.state + " - " : null}
          {location.country ? location.country : null}
        </div>
      ))}
    </div>
  );
};

export default AutoComplete;
