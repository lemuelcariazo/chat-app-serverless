import { useState, useEffect } from "react";

import axios from "axios";

type DATA = {
  email?: string;
  id?: string;
  loggedIn?: boolean;
};

function useFetch(url: string) {
  const [value, setValue] = useState<DATA>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        setValue(data);
      })
      .catch((e) => {
        setError(e.response?.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      console.log("clean up");
    };
  }, []);

  return { value, isLoading, error };
}

export default useFetch;
