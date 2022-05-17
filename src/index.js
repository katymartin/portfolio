import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";

import "./index.css";

import Home from "./components/Home";
import ProjectIndex from "./components/ProjectIndex";
import Project from "./components/Project";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/project-index" component={ProjectIndex} />
          <Route path="/project/:id" component={Project} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
