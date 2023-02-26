import { useState, useEffect, useMemo, useContext } from "react";

import axios from "axios";

type DATA = {
  email?: string;
  id?: string;
  loggedIn?: boolean;
  username?: string;
};

function useFetch(url: string) {
  const [value, setValue] = useState<DATA>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const memoValue = useMemo(() => value, [value]);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        !ignore && setValue(data);
      })
      .catch((e) => {
        setError(e.response);
        // setError(e.response?.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { memoValue, isLoading, error };
}

export default useFetch;
