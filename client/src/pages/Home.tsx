import { useEffect, useContext } from "react";
import { UserContext } from "../utils/userContext";

import useFetch from "../hooks/useFetch";
import { config } from "../config";

function Home() {
  const { development, production } = config;

  const { value, isLoading, error } = useFetch(
    development.BASE_URL + "/api/profile"
  );
  const { email, id, loggedIn, username } = value;
  const storedData = localStorage.getItem("log");

  return (
    <section className="w-full h-full flex justify-center items-center">
      {!value?.loggedIn || storedData == null ? (
        error
      ) : (
        <section className="flex justify-center items-center flex-col">
          <h1>{id}</h1>
          <h1>{String(loggedIn)}</h1>
          <h1>{username || "No value"}</h1>
          <h1>{email}</h1>
        </section>
      )}
    </section>
  );
}

export default Home;
