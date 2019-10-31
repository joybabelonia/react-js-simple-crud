import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Users from "./containers/User/Users";
import Profile from "./containers/Profile/Profile";
import UpdateUser from "./components/UpdateUser/UpdateUser";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/user/:id" exact component={Profile} />
          <Route path="/user/update/:id" exact component={UpdateUser} />
          <Route path="/" exact component={Users} />
          <Route render={() => <h1>Hello world! Page not found!</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
