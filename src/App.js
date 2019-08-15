import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Day1 from "./Pages/Day1";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/day1" render={() => <Day1 />} />
          <Route render={() => <Redirect to={"/day1"} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
