import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    const data = props.location.state;
    console.log(data);
    super(props);

    this.state = {
      loadedPost: {
        id: this.props.match.params.id,
        phone: data.phone,
        email: data.email,
        name: data.name,
        isfake: data.isfake
      }
    };
    if (!data.isfake) {
      if (this.props.match.params.id) {
        if (
          !this.state.loadedPost ||
          (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
        ) {
          axios.get("/users/" + this.props.match.params.id).then(response => {
            console.log(response);
            this.setState({ loadedPost: response.data });
          });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <legend>
        <p>
          <strong>ID: </strong>
          {this.state.loadedPost.id}
        </p>
        <p>
          <strong>Name: </strong>
          {this.state.loadedPost.name}
        </p>
        <p>
          <strong>Email: </strong>
          {this.state.loadedPost.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {this.state.loadedPost.phone}
        </p>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>   
        </legend>   
      </div>
    );
  }
}

export default Profile;
