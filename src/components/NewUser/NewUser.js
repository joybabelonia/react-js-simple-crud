import React, { Component } from "react";
import axios from "axios";

class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: { 
        id: "", 
        phone: "", 
        email: "", 
        name: "", 
        isfake: true,
        validName: true,
        validEmail: true,
        validPhone: true
      }
    };
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

  disabledHandler() {
    if(!(this.state.users.name && this.state.users.email && this.state.users.phone)) {
      return false;
    }
  }

  changeHandler = e => {
    const { users } = { ...this.state };
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
    console.log(data);
    axios.post("/users", { data }).then(response => {
      this.setState({ users: { id: "", phone: "", email: "", name: "" } });
      console.log(response);
    }); 
  };

  resetStateHandler = () => {
    this.props.createUserHandler(this.state.users);
    this.setState({ 
      users: { 
        id: "", 
        phone: "", 
        email: "", 
        name: "", 
        isfake: true,
        validName: true,
        validEmail: true,
        validPhone: true } 
      })
  }

  render() {
    const { name, email, phone } = this.state.users;
    const invalidStyle = {
      border: '1px solid red'
    }
    return (
      <form onSubmit={this.handleSubmit} style={{width: '80%',margin:'0 auto'}}>
        <div className="form-group">
          <input
            style={!this.state.users.validName ? invalidStyle : null}
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            style={!this.state.users.validEmail ? invalidStyle : null}
            placeholder="Email"
            name="email"
            type="text"
            value={email}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            style={!this.state.users.validPhone ? invalidStyle : null}
            placeholder="Phone"
            name="phone"
            type="text"
            value={phone}
            onChange={this.changeHandler}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.resetStateHandler}
          disabled={!(this.state.users.name && this.state.users.email && this.state.users.phone)}>
          Add User
        </button>
      </form>
    );
  }
}

export default NewUser;
