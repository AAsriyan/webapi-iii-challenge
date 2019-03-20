import React, { Component } from "react";
import { Route } from "react-router-dom";

import UserList from "./components/UserList.js";
import User from "./components/User.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={UserList} />
        <Route path="/users/:id" component={User} />
      </div>
    );
  }
}

export default App;
