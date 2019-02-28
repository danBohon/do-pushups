import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.getUser();
  }

  login = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(user => {
        this.props.updateUser(user.data);
        this.setState({ username: "", password: "" });
      })
      .catch(err => alert(err.response.request.response));
  };

  register = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(user => {
        this.setState({ username: "", password: "" });
        this.props.updateUser(user.data);
      })
      .catch(err => {
        this.setState({ username: "", password: "" });
        alert(err.response.request.response);
      });
  };

  logout = () => {
    axios
      .get("/auth/logout")
      .then(() => {
        this.props.updateUser({});
      })
      .catch(err => console.log(err));
  };

  getUser = () => {
    axios.get("/api/user").then(user => {
      this.props.updateUser(user.data);
    });
  };

  render() {
    const { username, password } = this.state;
    const { user } = this.props;
    console.log(user);
    return (
      <div className="App-header">
        <span className="left">
          <span className="logo">DO PUSHUPS</span>
          {/* <span>{this.props.children}</span> */}
          <span className="nav">
            <span className="divider">|</span>
            <Link to="/home">Home</Link>
            <Link to="/comps">All</Link>
            <Link to="/create">Create</Link>
          </span>
        </span>

        <span className="login">
          {user.username ? (
            <span>
              Welcome, {user.username}
              <button onClick={this.logout}>Logout</button>
            </span>
          ) : (
            <div className="login-inner">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <button onClick={this.login}>Login</button>
              <button onClick={this.register}>Register</button>
            </div>
          )}
        </span>
      </div>
    );
  }
}
