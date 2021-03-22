import React, { useState, useEffect } from "react";

import AutoComplete from "../AddTrip/AutoComplete";
import BasicDateRangePicker from "../AddTrip/DatePicker";

import useGetLocations from "../../hooks/useGetLocations";

import "./css/AddPlaceForm.css";

const { v4: uuidv4 } = require("uuid");

const AddPlaceForm = ({ addDay, close, trip }) => {
  const initial_state = { destination: "", id: uuidv4() };

  const initial_errors = {
    destination: false,
    startDate: false,
    notInBetween: false,
  };

  let tripStart = new Date(trip.startdate);
  let tripStop = new Date(trip.stopdate);

  const [formData, setFormData] = useState(initial_state);
  const [locations, setLocations] = useGetLocations();
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [errors, setErrors] = useState(initial_errors);

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

  useEffect(() => {
    const { destination, startdate } = formData;
    let e = { ...errors };

    if (destination.length === 0) {
      e = { ...e, destination: true };
    } else {
      e = { ...e, destination: false };
    }
    if (startdate === undefined || startdate === null) {
      e = { ...e, startdate: true };
    } else {
      e = { ...e, startdate: false };
    }

    let formatStartDate = new Date(startdate);

    if (formatStartDate < tripStart || formatStartDate > tripStop) {
      e.notInBetween = true;
    } else {
      e.notInBetween = false;
    }

    setErrors(e);
  }, [formData]);

  const handleSubmit = () => {
    const { destination, startdate, notInBetween } = errors;
    if (!destination && !startdate && !notInBetween) {
      addDay(formData);
      close();
    }
  };

  return (
    <div className="addplace-form-wrapper">
      <div className="addplace-form-line">
        <div className="addplace-form-line-label">
          Destination city <span>*</span>
        </div>
        <div className="addplace-form-line-input">
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

      <div className="addplace-form-line">
        <div className="addplace-form-line-label">
          Date <span>*</span>
        </div>
        <div className="addplace-form-line-input-special">
          <BasicDateRangePicker
            setDate={setStartDate}
            placeholder={"Start Date"}
          />
        </div>
        {errors.startdate ? (
          <div className="tripform-error">Input needed</div>
        ) : null}
        {errors.notInBetween ? (
          <div className="tripform-error">Date out of trip's range</div>
        ) : null}
      </div>

      <div className="addplace-form-line">
        <div className="addplace-form-line-label">Details</div>
        <div className="addplace-form-line-textarea">
          <textarea
            style={{ resize: "none" }}
            cols="50"
            rows="10"
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="addplace-form-line-btn">
        <div className="addplace-form-button" onClick={handleSubmit}>
          Add Place
        </div>
      </div>
    </div>
  );
};

export default AddPlaceForm;
