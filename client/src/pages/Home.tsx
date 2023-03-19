import useFetch from "../hooks/useFetch";
import { config } from "../config";
import { useContext } from "react";
import Loading from "../components/Loading";
import { UserContext } from "../utils/userContext";
import SearchInput from "../components/SearchInput";
// interface USER {
//   email?: String | null | undefined;
// }
// development.BASE_URL + "/api/findUser"
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
          <SearchInput />
        )}
      </div>
    </section>
  );
}

export default Home;

{
  /* <div className="absolute left-2">
              <button className="m-4 cursor-pointer  rounded-full bg-gray-700 py-2 px-4 font-black text-slate-100 hover:bg-gray-800 xxs:m-1">
                Add friend
              </button>
            </div> */
}

{
  /* <h1>{id}</h1>
            <h1>{String(loggedIn)}</h1>
            <h1>{username || "No value"}</h1>
            <h1>{email}</h1> */
}
