import React from "react";

import { useSelector } from "react-redux";

import "./css/Menu.css";

import { NavLink } from "react-router-dom";

const Menu = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="menu-wrapper">
      <div className="menu-content">
        <div className="menu-logo">Globetrotter</div>
        {user ? (
          <div className="menu-logo-left">
            <div className="menu-logo-left-link">
              <NavLink exact to="/dashboard">
                My Trips
              </NavLink>
            </div>
            <div className="menu-logo-left-link">
              <NavLink exact to="profile">
                Profile
              </NavLink>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
