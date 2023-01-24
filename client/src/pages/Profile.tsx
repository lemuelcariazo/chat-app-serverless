import { useEffect, useState } from "react";
import { config } from "../config";
import axios from "axios";

type DATA = {
  email?: string;
  id?: string;
};

function Profile() {
  const [value, setValue] = useState<DATA>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { development, production } = config;
  const { id, email } = value;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(development.BASE_URL + "/api/profile")
      .then((response) => {
        const { data } = response;
        setValue(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return console.log("clean up");
  }, []);

  return (
    <div>
      <h1>{isLoading ? "Loading..." : `Hello, ${id} ${email}`}</h1>
    </div>
  );
}

export default Profile;
