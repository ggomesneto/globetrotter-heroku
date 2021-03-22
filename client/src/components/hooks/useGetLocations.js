import { useState } from "react";
import axios from "axios";

// MISSING TRY AND CATCH FOR THE AXIOS

const useLocationsList = (initialState = null) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(null);

  const key = "1E9UqhWwjWvrdeIWwQO3E6X92aq6RfZ6";
  const geoUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}`;

  const handleState = async (location) => {
    try {
      if (location === null) {
        setState(null);
      } else {
        const res = await axios.get(`${geoUrl}&location=${location}`);

        const locationsData = res.data.results[0].locations;

        if (locationsData.length > 0) {
          let locations = locationsData.map((l) => {
            const location = {
              street: l.street,
              city: l.adminArea5,
              state: l.adminArea3,
              country: l.adminArea1,
              latLng: l.latLng,
            };

            return location;
          });

          // PASS THE LOCATIONS TO THE STATE

          setState(locations);
        }
      }
    } catch (e) {
      setError(e);
    }
  };

  return [state, handleState, error];
};

export default useLocationsList;
