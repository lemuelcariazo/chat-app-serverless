import { config } from "../config";
import useFetch from "../hooks/useFetch";

import { useContext, useState } from "react";
import { UserContext } from "../utils/userContext";

type LOG = {
  getData: React.Dispatch<any>;
};

function Profile() {
  // const { development, production } = config;
  // const [navList, setNavList] = useState<Array<string>>([]);
  // const { value, isLoading, error } = useFetch(
  //   `${development.BASE_URL}/api/profile`
  // );

  // const { id, email, loggedIn } = value;

  return (
    <div className="flex justify-center items-center">
      {/* {loggedIn ? (
        <h1 className="text-center">
          {isLoading ? "Loading..." : `Hello, ${id} ${email} ${loggedIn}`}
        </h1>
      ) : (
        error
      )} */}
      this is profile
    </div>
  );
}

export default Profile;
