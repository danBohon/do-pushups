import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import routes from "./routes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  updateUser = user => {
    this.setState({
      user
    });
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header user={user} updateUser={this.updateUser}>
          {/* <div className="App-logo" alt="logo" /> */}
        </Header>
        {routes}
      </div>
    );
  }
}

export default App;
