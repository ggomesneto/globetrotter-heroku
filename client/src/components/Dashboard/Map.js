import { useSelector } from "react-redux";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  MapConsumer,
} from "react-leaflet";

import "./css/Map.css";

import { DoubleLinkedList } from "../../helpers/DoubleLinkedList";

const { v4: uuidv4 } = require("uuid");

const defaultValues = {
  center: [37.09024, -95.712891],
  zoom: 3,
};

const Map = ({ trip }) => {
  const user = useSelector((state) => state.user.user);

  const { name, img } = user;

  let locations = [];
  let values;
  let organize;
  if (Object.keys(trip).length === 0) {
    locations = [];
    values = defaultValues;
    organize = [];
  } else {
    let startDay = {
      startdate: trip.startdate,
      coord_destination: trip.coord_leaving,
      destination: trip.leaving,
    };

    let stopDay = {
      startdate: trip.stopdate,
      coord_destination: trip.coord_destination,
      destination: trip.destination,
    };

    let days = [startDay, stopDay];

    if (Array.isArray(trip.days)) {
      for (let day of trip.days) {
        days.push(day);
      }

      days = days.sort(function (a, b) {
        return new Date(a.startdate) - new Date(b.startdate);
      });

      for (let day of days) {
        locations.push(day);
      }
    } else {
      locations = [startDay, stopDay];
    }

    let locationList = new DoubleLinkedList();

    for (let location of locations) {
      locationList.add(location);
    }

    organize = locationList.organize();

    values = {
      center: stopDay.coord_destination,
      zoom: 3,
    };
  }

  return (
    <div className="map-container">
      <MapContainer scrollWheelZoom={false}>
        <MapConsumer>
          {(map) => {
            map.setView(values.center, values.zoom);
            return null;
          }}
        </MapConsumer>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => {
          return (
            <Marker key={uuidv4()} position={location.coord_destination}>
              <Popup>
                <div className="marker-date">{location.startdate}</div>
                <div className="marker-destination">{location.destination}</div>
              </Popup>
            </Marker>
          );
        })}
        {organize.map((location) => {
          return (
            <Polyline
              key={uuidv4()}
              positions={[location[0], location[1]]}
              color={"#ffc107"}
              weight={5}
            />
          );
        })}
      </MapContainer>
      <div className="map-sub">
        <div className="map-sub-bg"></div>
        <div className="map-sub-photo">
          <img src={img} alt="" />
        </div>
        <div className="map-username">{name}</div>
      </div>
    </div>
  );
};

export default Map;
