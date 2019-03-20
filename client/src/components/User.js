import React from "react";
import axios from "axios";
import UserCard from "./UserCard";
import UserPosts from "./UserPosts";
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: null
    };
  }

  componentDidMount() {
    this.fetchUser(this.props.match.params.id);
    this.fetchPost(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchUser(newProps.match.params.id);
      this.fetchPost(this.props.match.params.id);
    }
  }

  fetchUser = id => {
    axios.get(`http://localhost:4000/api/users/${id}`).then(res => {
      console.log(res.data);
      this.setState({ user: res.data });
    });
  };

  fetchPost = id => {
    axios.get(`http://localhost:4000/api/users/${id}/posts`).then(res => {
      console.log(res.data);
      this.setState({ posts: res.data });
    });
  };

  render() {
    if (!this.state.posts) {
      return <div>Loading user information...</div>;
    }

    return (
      <div className="save-wrapper">
        <UserCard user={this.state.user} />
        {this.state.posts.map(post => (
          <UserPosts key={post.id} post={post} />
        ))}
      </div>
    );
  }
}
