import React from "react";
import { Link } from "react-router-dom";

import "./ListUser.css";

const user = props => (
  <tr className="ListUser">
    <td>{props.id}</td>
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td>{props.phone}</td>
    <td></td>
    <td>
        <Link
          to={{
            pathname: `/user/${props.id}`,
            state: {
              id: props.id,
              name: props.name,
              phone: props.phone,
              email: props.email,
              isfake: props.isfake
            }
          }}
          className="btn btn-info"
        >
          View
        </Link>
        <Link
          to={{
            pathname: `/user/update/${props.id}`,
            state: {
              id: props.id,
              name: props.name,
              phone: props.phone,
              email: props.email,
              isfake: props.isfake
            }
          }}
          className="btn btn-success"
        >
          Update
        </Link>
      <button
        className="btn btn-danger"
        onClick={() => props.deleteHandler(props.id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default user;
