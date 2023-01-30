import React, {useContext} from "react";

import { AuthContext } from "../../shared/context/auth-context";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UiElements/Card";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceList.css";

export default function PlaceList(props) {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2> No Places found</h2>
          {props.userId === auth.userId && (
            <Button to="/places/new"> Share Place</Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}{" "}
    </ul>
  );
}
