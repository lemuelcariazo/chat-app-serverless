import { useState, useEffect, useMemo, useCallback } from "react";

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

  const fetchData = useCallback(async () => {
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
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { memoValue, isLoading, error };
}

export default useFetch;
