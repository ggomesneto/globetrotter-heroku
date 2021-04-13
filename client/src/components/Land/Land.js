import React from "react";

import "./css/Land.css";

import react from "../img/react.png";
import git from "../img/git.png";
import node from "../img/nodejs.png";
import js from "../img/javascript.png";
import vscode from "../img/vscode.png";
import psql from "../img/psql.png";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getUserInfoFromAPI } from "../../actions/user";

import LandMenu from "./LandMenu";

const { v4: uuidv4 } = require("uuid");

const Land = () => {
  let logos = [
    [react, "React"],
    [git, "Git"],
    [node, "NodeJS"],
    [js, "JavaScript"],
    [vscode, "VSCode"],
    [psql, "PostgreSQL"]
  ];

  const token = window.sessionStorage.getItem("token");
  const email = window.sessionStorage.getItem("email");

  const dispatch = useDispatch();
  const history = useHistory();

  if (token) {
    dispatch(getUserInfoFromAPI(token, email));
    history.push("/dashboard");
  }

  return (
    <div className="land-wrapper">
      <LandMenu />
      <div className="land-content">
        <div className="land-logo">GLOBETROTTER</div>
        <div className="land-title">
          Create your own <br />
          beautiful travel map
        </div>
      </div>
      <div className="land-footer">
        <div className="land-footer-bg"></div>
        <div className="land-footer-left">
          <div className="land-footer-left-title">
            <i className="fas fa-edit"></i>Plan your trips
          </div>
          <div className="land-footer-left-link">
            <i className="fas fa-share-alt"></i>Share them with your friends
          </div>
          <div className="land-footer-left-link">
            <i className="fas fa-plane"></i>Start Traveling
          </div>
        </div>
        <div className="land-footer-center">
          {logos.map((logo) => (
            <div key={uuidv4()} className="land-footer-center-logos">
              <img alt="" src={logo[0]} />
              <div className="land-footer-center-text">{logo[1]}</div>
            </div>
          ))}
        </div>
        <div className="land-footer-right">
          <div className="land-footer-right-text">
            <i>
              Globetrotter is my final Capstone for the Springboard's Software
              Engineering BootCamp. The FrontEnd is made with React and ReduxJS
              while the BackEnd is made all in ExpressJS using PostreSQL as
              database.
            </i>
            <br />
            <div className="land-footer-right-sign">- Geraldo Gomes</div>
            <br />
            <br />
            <a
              href="https://github.com/ggomesneto/globetrotter-heroku"
              target="blank"
            >
              Github
            </a>
            |
            <a href="http://linkedin.com/in/ggomesneto" target="blank">
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
