import React, { useState, useEffect } from "react";

import AutoComplete from "../AddTrip/AutoComplete";
import BasicDateRangePicker from "../AddTrip/DatePicker";
import CheckboxList from "../AddTrip/CheckboxList";

import useGetLocations from "../../hooks/useGetLocations";
import { updateTripOnAPI } from "../../../actions/trip";
import { useSelector, useDispatch } from "react-redux";

const EditTripForm = ({ data, close }) => {
  const initial_state = {
    coord_destination: data.coord_destination,
    coord_leaving: data.coord_leaving,
    destination: data.destination,
    leaving: data.leaving,
    startdate: null,
    stopdate: null,
    transportation: "",
    duration: data.duration,
  };
  const initial_errors = {
    leaving: false,
    destination: false,
    startDate: true,
    stopdate: true,
    transportation: true,
    dates: false,
  };
  const [formData, setFormData] = useState(initial_state);
  const [locations, setLocations] = useGetLocations();
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showAutoComplete2, setShowAutoComplete2] = useState(false);
  const [errors, setErrors] = useState(initial_errors);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  console.log(data);

  const { email } = user;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  useEffect(() => {
    async function getLocations() {
      await setLocations(formData.destination);
    }
    getLocations();
    setShowAutoComplete(true);

    if (formData.destination.length === 0) {
      setShowAutoComplete(false);
    }
  }, [formData.destination]);

  useEffect(() => {
    setShowAutoComplete(false);
  }, [formData.coord_destination]);

  useEffect(() => {
    async function getLocations() {
      await setLocations(formData.leaving);
    }
    getLocations();
    setShowAutoComplete2(true);

    if (formData.leaving.length === 0) {
      setShowAutoComplete2(false);
    }
  }, [formData.leaving]);

  useEffect(() => {
    setShowAutoComplete2(false);
  }, [formData.coord_leaving]);

  const setDestination = (location) => {
    let locationAddress = "";
    if (location.street) {
      locationAddress = locationAddress + " " + location.street + ", ";
    }
    if (location.city) {
      locationAddress = locationAddress + " " + location.city + ", ";
    }
    if (location.state) {
      locationAddress = locationAddress + " " + location.state + " - ";
    }
    if (location.country) {
      locationAddress = locationAddress + " " + location.country;
    }
    setFormData((formData) => ({
      ...formData,
      destination: locationAddress,
      coord_destination: location.latLng,
    }));
  };

  const setLeaving = (location) => {
    let locationAddress = "";
    if (location.street) {
      locationAddress = locationAddress + " " + location.street + ", ";
    }
    if (location.city) {
      locationAddress = locationAddress + " " + location.city + ", ";
    }
    if (location.state) {
      locationAddress = locationAddress + " " + location.state + " - ";
    }
    if (location.country) {
      locationAddress = locationAddress + " " + location.country;
    }
    setFormData((formData) => ({
      ...formData,
      leaving: locationAddress,
      coord_leaving: location.latLng,
    }));
  };

  const setTransport = (transport) => {
    let e = {
      target: {
        name: "transportation",
        value: transport,
      },
    };
    handleChange(e);
  };

  const setStartDate = (date) => {
    if (date) {
      let data = date.toString();
      data = data.slice(0, 16);
      let e = {
        target: {
          name: "startdate",
          value: data,
        },
      };
      handleChange(e);
    }
  };

  const setStopDate = (date) => {
    if (date) {
      let data = date.toString();
      data = data.slice(0, 16);
      let e = {
        target: {
          name: "stopdate",
          value: data,
        },
      };
      handleChange(e);
    }
  };

  useEffect(() => {
    const {
      destination,
      leaving,
      startdate,
      stopdate,
      transportation,
    } = formData;
    let e = { ...errors };

    if (destination.length === 0) {
      e = { ...e, destination: true };
    } else {
      e = { ...e, destination: false };
    }

    if (leaving.length === 0) {
      e = { ...e, leaving: true };
    } else {
      e = { ...e, leaving: false };
    }

    if (startdate === undefined || startdate === null) {
      e = { ...e, startdate: true };
    } else {
      e = { ...e, startdate: false };
    }

    if (stopdate === undefined || stopdate === null) {
      e = { ...e, stopdate: true };
    } else {
      e = { ...e, stopdate: false };
    }

    if (transportation.length === 0) {
      e = { ...e, transportation: true };
    } else {
      e = { ...e, transportation: false };
    }

    if (new Date(startdate) > new Date(stopdate)) {
      e = { ...e, dates: true };
    } else {
      e = { ...e, dates: false };
    }

    setErrors(e);
  }, [formData]);

  const handleSubmit = () => {
    let patchTrip = { ...formData, creator: email };

    const {
      leaving,
      destination,
      startdate,
      stopdate,
      transportation,
      dates,
    } = errors;

    if (
      !leaving &&
      !destination &&
      !startdate &&
      !stopdate &&
      !transportation &&
      !dates
    ) {
      const tripStart = new Date(formData.startdate);
      const tripStop = new Date(formData.stopdate);

      let duration = Math.ceil((tripStop - tripStart) / (1000 * 60 * 60 * 24));
      let trip = { ...patchTrip, duration };

      dispatch(updateTripOnAPI(data.id, trip));
      close();
    }
  };

  return (
    <div className="tripform-wrapper">
      <div className="tripform-line">
        <div className="tripform-line-label">
          Leaving From <span>*</span>
        </div>
        <div className="tripform-line-input">
          <input
            type="text"
            maxLength="50"
            placeholder="eg. Paris"
            name="leaving"
            id="leaving"
            onChange={handleChange}
            value={formData.leaving}
          />
          {showAutoComplete2 ? (
            <AutoComplete list={locations} setLocation={setLeaving} />
          ) : null}
        </div>
        {errors.leaving ? (
          <div className="tripform-error">Input needed</div>
        ) : null}
      </div>

      <div className="tripform-line">
        <div className="tripform-line-label">
          Destination city <span>*</span>
        </div>
        <div className="tripform-line-input">
          <input
            type="text"
            maxLength="50"
            placeholder="eg. Paris"
            name="destination"
            id="destination"
            onChange={handleChange}
            value={formData.destination}
          />
          {showAutoComplete ? (
            <AutoComplete list={locations} setLocation={setDestination} />
          ) : null}
        </div>
        {errors.destination ? (
          <div className="tripform-error">Input needed</div>
        ) : null}
      </div>

      <div className="tripform-line">
        <div className="tripform-line-label">
          Date <span>*</span>
        </div>
        <div className="tripform-line-input-special">
          <BasicDateRangePicker
            setDate={setStartDate}
            placeholder={"Start Date"}
          />
        </div>
        <div className="tripform-line-divisor">-</div>
        <div className="tripform-line-input-special">
          <BasicDateRangePicker
            setDate={setStopDate}
            placeholder={"End Date"}
          />
        </div>
        {errors.startdate || errors.stopdate || errors.dates ? (
          <div className="tripform-error">Input needed</div>
        ) : null}
      </div>

      <div className="tripform-line-checkbox">
        <div className="tripform-line-label">
          Transport type <span>*</span>
        </div>
        <div className="tripform-line-input">
          <CheckboxList setTransport={setTransport} />
        </div>
        {errors.transportation ? (
          <div className="tripform-error">Input needed</div>
        ) : null}
      </div>

      <div className="tripform-line-btn">
        <div className="tripform-button" onClick={handleSubmit}>
          EDIT TRIP
        </div>
        <div className="tripform-button" onClick={close}>
          CANCEL
        </div>
      </div>
    </div>
  );
};

export default EditTripForm;
