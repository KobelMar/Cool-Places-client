import React, { useEffect, useState } from "react";

import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import UsersList from "../components/UsersList";
import useHttpClient from "../../shared/hooks/http-hook";

export default function Users() {
  const { error, isLoading, sendRequest, errorHandler } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}
