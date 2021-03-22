import React, { useState } from "react";
import Checkbox from "./Checkbox";

import "./css/CheckboxList.css";

const { v4: uuidv4 } = require("uuid");

const CheckboxList = ({ setTransport }) => {
  const airplane = [<i className="fas fa-plane"></i>, "AIRPLANE"];
  const bicycle = [<i className="fas fa-bicycle"></i>, "BICYCLE"];
  const train = [<i className="fas fa-train"></i>, "TRAIN"];
  const boat = [<i className="fas fa-ship"></i>, "BOAT"];
  const bus = [<i className="fas fa-bus"></i>, "BUS"];
  const hike = [<i className="fas fa-hiking"></i>, "HIKE"];
  const motorcycle = [<i className="fas fa-motorcycle"></i>, "MOTORCYCLE"];
  const car = [<i className="fas fa-car"></i>, "CAR"];
  const other = ["", "OTHER"];

  let items = [
    airplane,
    bicycle,
    train,
    car,
    boat,
    bus,
    hike,
    motorcycle,
    other,
  ];

  const [selected, setSelected] = useState(null);

  const handleSelected = (data, idx) => {
    setSelected(idx);
    setTransport(data[1].toLowerCase());
    //   MISSING PASSING DATA TO TRIP
  };

  return (
    <div className="checkboxlist-wrapper">
      {items.map((i, idx) => {
        return idx === selected ? (
          <Checkbox
            key={uuidv4()}
            item={i}
            idx={idx}
            handleSelected={handleSelected}
            selected={true}
          />
        ) : (
          <Checkbox
            key={uuidv4()}
            item={i}
            idx={idx}
            handleSelected={handleSelected}
          />
        );
      })}
    </div>
  );
};

export default CheckboxList;
