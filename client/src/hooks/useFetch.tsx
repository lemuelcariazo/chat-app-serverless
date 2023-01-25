import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

type DATA = {
  email?: string;
  id?: string;
  loggedIn?: boolean;
  handleLogOut?: () => Promise<void>;
};

function useFetch(url: string) {
  const [value, setValue] = useState<DATA>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        setValue(data);
      })
      .catch((e) => {
        setError(e.response?.data?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogOut = async (setData: any) => {
    axios
      .delete(url)
      .then((response) => {
        // console.log(response?.data);
        setData(response);
        navigate("/");
      })
      .catch((e) => {
        console.error(e.response?.data?.error);
      });
  };

  return { value, isLoading, error, handleLogOut };
}

export default useFetch;
