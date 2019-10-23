import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class UpdateUser extends Component {
  constructor(props) {
    const data = props.location.state;
    super(props);

    this.state = {
      users: {
        id: this.props.match.params.id,
        phone: data.phone,
        email: data.email,
        name: data.name,
        isfake: data.isfake,
        validName: true,
        validEmail: true,
        validPhone: true
      }
    };

    if (!this.state.users.isfake) {
      if (this.props.match.params.id) {
        axios.get("/users/" + this.props.match.params.id).then(response => {
          const users = {
            ...response.data, 
            validName: true,
            validEmail: true,
            validPhone: true};
          this.setState({ users: users });
        });
      }
    }
  }

  validate(name, value){
    if(name === "name"){
      if(value.trim() !== ''){
        return true
      }
    }
    if(name === "email"){
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if(pattern.test(value)){
        return true
      }
    }
    if(name === "phone"){
      if(value.trim() !== ''){
        return true
      }
    }
    return false;
  }

  changeHandler = e => {
    const { users } = { ...this.state };
    console.log(users)
    const currentState = users;
    const { name, value } = e.target;
    if(name === "name"){
      currentState.validName = this.validate(name, value)
    }
    if(name === "email"){
      currentState.validEmail = this.validate(name, value)
    }
    if(name === "phone"){
      currentState.validPhone = this.validate(name, value)
    }
    console.log(currentState)
    currentState[name] = value;
    this.setState({ users: currentState });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.users;
    if (data.isfake) {
      console.log(data);
      this.props.history.push("/", { response: data });
    } else {
      axios.put("/users/" + data.id, { data }).then(response => {
        this.props.history.push("/", { response: response.data.data });
      });
    }
  };

  render() {
    const { name, email, phone } = this.state.users;
    const invalidStyle = {
      border: '1px solid red'
    }
    return (
      <form onSubmit={this.handleSubmit} style={{width: '80%',margin:'0 auto'}}>
        <div className="form-group">
          <label>Name </label>
          <input
            style={!this.state.users.validName ? invalidStyle : null}
            name="name"
            type="text"
            value={name}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email </label>
          <input
            style={!this.state.users.validEmail ? invalidStyle : null}
            name="email"
            type="text"
            value={email}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone </label>
          <input
            name="phone"
            type="text"
            value={phone}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <button className="btn btn-success" style={{marginRight:'10px'}}> Update</button>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
      </form>
    );
  }
}

export default UpdateUser;
