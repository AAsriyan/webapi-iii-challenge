import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./UserCard.js";

export default class UserList extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    axios
      .get("https://aa-lambdablogs.herokuapp.com/api/users")
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data.users });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="user-list">
        {this.state.users.map(user => (
          <UserDetails key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

function UserDetails({ user }) {
  return (
    <Link to={`/users/${user.id}`}>
      <UserCard user={user} />
    </Link>
  );
}
