import { useEffect, useContext } from "react";
import { UserContext } from "../utils/userContext";

import useFetch from "../hooks/useFetch";
import { config } from "../config";

function Home() {
  const { development, production } = config;
  const { navigation, setNavigation } = useContext(UserContext);

  const { value, isLoading, error } = useFetch(
    development.BASE_URL + "/api/profile"
  );
  const { email, id, loggedIn } = value;
  const storedData = localStorage.getItem("log");
  return (
    <section className="flex justify-center items-center">
      {/* {isLoading ? "Loading..." : <article>test</article>} */}

      {!loggedIn || storedData == null ? error : id}
    </section>
  );
}

export default Home;
