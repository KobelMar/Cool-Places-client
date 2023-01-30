import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UiElements/Card";

import "./UsersList.css";

export default function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <Card className="center">
        <h2>No Users found.</h2>
      </Card>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}
