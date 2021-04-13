import React, { useState, useEffect } from "react";

import "./css/LandMenu.css";

import { NavLink } from "react-router-dom";

const LandMenu = () => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <div
      style={
        scrollTop > 0
          ? { backgroundColor: "white", width: "100%", marginRight: "150px" }
          : null
      }
      className="land-menu"
    >
      <div
        style={scrollTop > 0 ? { color: "rgb(241, 97, 44)" } : null}
        className="land-menu-link"
      >
        <i className="fas fa-suitcase"></i>Globetrotter
      </div>
      <div
        style={scrollTop > 0 ? { color: "rgb(241, 97, 44)" } : null}
        className="land-menu-link"
      >
        <NavLink
          style={
            scrollTop > 0
              ? { color: "rgb(241, 97, 44)", textDecoration: "none" }
              : null
          }
          exact
          to="/login"
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default LandMenu;
