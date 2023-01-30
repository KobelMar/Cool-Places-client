import React, { useState, useCallback, useRef, useEffect } from "react";

export default function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //cancel acrive httprequests e.g. when we sendRequest, and before response is there
  //we unmount the current page. -> we sue e.g. cleanup-fncts in useEffect
  const activeHttpRequests = useRef([]);

  //useCallback to avoid infinite Loops
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        // To check if we have a 4xx or 5xx response code with an error.
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const errorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    error,
    isLoading,
    sendRequest,
    errorHandler,
  };
}
