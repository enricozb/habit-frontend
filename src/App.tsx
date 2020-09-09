import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { HabitList } from "./components/HabitList";
import { Stats } from "./components/Stats";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = {
      email: "ab@gmail.com",
      password: "lmaoplsdon'thack",
    };

    axios.post("user/login", data).then((res) => setLoading(false))
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
