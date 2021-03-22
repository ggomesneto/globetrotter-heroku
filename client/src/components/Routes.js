import React from "react";

import { Switch, Route } from "react-router-dom";

import Land from "./Land/Land";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Land />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Routes;
