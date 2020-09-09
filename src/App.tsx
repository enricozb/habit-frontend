import React from "react";
import "./App.css";

import { HabitList } from "./components/HabitList";
import { Stats } from "./components/Stats";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stats">
          <Stats />
        </Route>
        <Route path="/">
          <HabitList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
