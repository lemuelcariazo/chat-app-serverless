import useFetch from "../hooks/useFetch";
import { config } from "../config";
import { useContext } from "react";
import Loading from "../components/Loading";
import { UserContext } from "../utils/userContext";
import useController from "../hooks/useController";

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

  const {
    isLoading: isLoad,
    memoizedData,
    findUser,
    findEmail,
    setFindEmail,
  } = useController(development.BASE_URL + "/api/findUser");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    localStorage.clear();
    setNavigation({ ...navigation, data: error });
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-400">
        {!value?.loggedIn || storedData == null ? (
          <h1>{"Come In! lets talk and read"}</h1>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* <div className="absolute left-2">
              <button className="m-4 cursor-pointer  rounded-full bg-gray-700 py-2 px-4 font-black text-slate-100 hover:bg-gray-800 xxs:m-1">
                Add friend
              </button>
            </div> */}
            <h1>{id}</h1>
            <h1>{String(loggedIn)}</h1>
            <h1>{username || "No value"}</h1>
            <h1>{email}</h1>
            <div className="flex items-center justify-center gap-2 border p-2">
              <input
                type="search"
                value={findEmail}
                placeholder="explore..."
                onChange={(e) => setFindEmail(e.target.value)}
                className="rounded-full border-none border-none py-3 px-4 text-center dark:text-slate-900"
              />
              <button
                type="submit"
                onClick={findUser}
                className="rounded-full border p-6 active:bg-slate-100"
              ></button>
            </div>
            <div className="m-4 flex h-10 w-fit flex-col items-center justify-center py-3">
              {isLoad ? <Loading /> : <h1>{memoizedData}</h1>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
