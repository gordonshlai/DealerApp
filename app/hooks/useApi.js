import { useState } from "react";

/**
 * A custom hook handling any api calls, including capability to handle the following states:
 * data return from the api call. The error flag, indicating whether the api call contains error.
 * The loading state, indicating whether the api call is in progress.
 * @param {function} apiFunc - the function for calling the api
 */
export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
};
