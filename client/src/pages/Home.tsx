import useFetch from "../hooks/useFetch";
import { config } from "../config";
import { useContext } from "react";
import Loading from "../components/Loading";
import { UserContext } from "../utils/userContext";
import SearchInput from "../components/SearchInput";

function Home() {
  const { development, production } = config;
  const { navigation, setNavigation } = useContext(UserContext);

  const {
    memoValue: value,
    isLoading,
    error,
  } = useFetch(development.BASE_URL + "/api/profile");
  const { email, id, loggedIn, username } = value;
  const storedData = localStorage.getItem("log");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    localStorage.clear();
    setNavigation({ ...navigation, data: error });
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center border bg-gray-700 dark:text-slate-100">
      <div className="flex h-full w-1/2 flex-col items-center justify-start">
        {!value?.loggedIn || storedData == null ? (
          <h1>{"Come In! lets talk and read"}</h1>
        ) : (
          <>
            <h1 className="mb-10 w-full">Welcome! user {id}</h1>
            <SearchInput />
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
