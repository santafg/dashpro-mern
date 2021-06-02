import React from "react";
import Datalist from "./Datalist";
import Visulization from "./Visulization";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="page">
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Datalist />
          </Route>
          <Route exact path="/viz">
            <Visulization />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
