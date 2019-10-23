import React, { Component } from "react";
import axios from "../../axios";
import update from "react-addons-update";
import List from "../../components/ListUser/ListUser";
import NewUser from "../../components/NewUser/NewUser";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUserId: null,
      error: false,
      creating: false
    };
    this.createHandler = this.createHandler.bind(this);
  }

  deleteHandler = id => {
    axios
      .delete("/users/" + id)
      .then(response => {
        this.setState(prevState => {
          const users = prevState.users.filter(user => user.id !== id);
          return { users };
        });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  componentDidMount() {
    axios
      .get("/users")
      .then(response => {
        const users = response.data;
        const updatedUsers = users.map(user => {
          return {
            ...user
          };
        });
        const state = this.props.location.state;
        if (state !== undefined) {
          const data = state.response;
          if (data.id >= 11) {
            this.setState({ users: updatedUsers });
            const joined = this.state.users.concat(data);
            this.setState({ users: joined });
            console.log(this.state.users);
            this.props.location.state = undefined;
          } else {
            const data = state.response;
            console.log(data);
            const commentIndex = updatedUsers.findIndex(function(c) {
              return (c.id = data.id);
            });
            const updatedComment = update(updatedUsers[commentIndex], {
              name: { $set: data.name },
              email: { $set: data.email },
              phone: { $set: data.phone }
            });
            updatedComment.isfake = true;
            const newData = update(updatedUsers, {
              $splice: [[commentIndex, 1, updatedComment]]
            });
            this.setState({ users: newData });
            this.props.location.state = undefined;
          }
        } else {
          this.setState({ users: updatedUsers });
        }
        console.log(this.state.users);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  userSelectedHandler = id => {
    this.setState({ selectedUserId: id });
  };

  createHandler(user) {
    user.id = this.state.users.length + 1;
    const joined = this.state.users.concat(user);
    this.setState({ users: joined });
    console.log(this.state.users);
  }

  render() {
    let users = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      users = this.state.users.map(user => {
        console.log(user.isfake);
        return (
          <List
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            phone={user.phone}
            isfake={user.isfake}
            deleteHandler={this.deleteHandler}
          />
        );
      });
    }
    return (
      <div>
        <NewUser createUserHandler={this.createHandler} />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );
  }
}

export default Users;
