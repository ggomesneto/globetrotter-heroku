import { ADD_TRIP, FETCH_TRIPS, PATCH_TRIP, DEL_TRIP } from "../actions/types";

export default function tripReduction(state = { trips: [] }, action) {
  let tripList = [...state.trips];
  let id = action.id;

  switch (action.type) {
    case ADD_TRIP:
      return { ...state, trips: [...state.trips, action.trip] };
    case FETCH_TRIPS:
      return { ...state, trips: action.trips };
    case DEL_TRIP:
      tripList = tripList.filter((trip) => trip.id !== id);
      return { ...state, trips: tripList };
    case PATCH_TRIP:
      tripList = tripList.filter((trip) => trip.id !== id);
      tripList.push(action.tripData);
      return { ...state, trips: tripList };

    default:
      return { ...state };
  }
}
