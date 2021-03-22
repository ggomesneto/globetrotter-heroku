import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = ({ placeholder, setDate }) => {
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    setDate(startDate);
  }, [startDate]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      popperPlacement="bottom"
      placeholderText={placeholder}
      popperModifiers={{
        flip: {
          behavior: ["bottom"], // don't allow it to flip to be above
        },
        preventOverflow: {
          enabled: false, // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
        },
        hide: {
          enabled: false, // turn off since needs preventOverflow to be enabled
        },
      }}
    />
  );
};

export default Example;
