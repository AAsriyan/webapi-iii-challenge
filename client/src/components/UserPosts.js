import React, { Component } from "react";

export class UserPosts extends Component {
  render() {
    return <div>{this.props.post.text}</div>;
  }
}

export default UserPosts;
