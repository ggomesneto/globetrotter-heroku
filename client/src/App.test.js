import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
