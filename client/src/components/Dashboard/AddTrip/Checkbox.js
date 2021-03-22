import React from "react";

import "./css/Checkbox.css";

const Checkbox = ({ item, handleSelected, idx, selected = false }) => {
  let icon = item[0];
  let text = item[1];

  return selected === true ? (
    <div
      className="checkbox-wrapper"
      style={{ backgroundColor: "lightgrey" }}
      onClick={() => handleSelected(item, idx)}
    >
      {icon}
      {text}
    </div>
  ) : (
    <div className="checkbox-wrapper" onClick={() => handleSelected(item, idx)}>
      {icon}
      {text}
    </div>
  );
};

export default Checkbox;
