import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import PlaceList from "../components/PlaceList";
import useHttpClient from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const { error, isLoading, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.userPlaces);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, setLoadedPlaces]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevState) => {
      return prevState.filter((place) => place.id !== deletedPlaceId);
    });
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && loadedPlaces && (
        <PlaceList
          items={loadedPlaces}
          onDeletePlace={placeDeletedHandler}
          userId={userId}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
