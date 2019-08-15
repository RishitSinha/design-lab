import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Part1 from "./Pages/Part1";
import Part2 from "./Pages/Part2";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Part2 />} />
          <Route path="/part1" render={() => <Part1 />} />
          <Route render={() => <Redirect to={"/"} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
