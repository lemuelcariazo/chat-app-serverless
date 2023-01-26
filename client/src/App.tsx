import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { UserContext } from "./utils/userContext";
import useFetch from "./hooks/useFetch";
import { config } from "./config";

import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const { development, production } = config;
  const { handleLogOut } = useFetch(development.BASE_URL + "/api/logout");

  const [value, setValue] = useState("hello from useContext");
  const [data, setData] = useState<any>("");
  const [navList, setNavList] = useState<Array<string>>(["Login"]);

  const memoizeData = useMemo(() => data, [data]);

  const handleNav = (list: string) => {
    switch (list) {
      case "Login":
        navigate("/auth");

        break;
      case "Logout":
        handleLogOut(setData);
        break;
      case "Profile":
        console.log("I clicked " + list);
        navigate("/auth/profile");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let isIgnored = false;
    console.log(memoizeData?.data);
    data?.data === "Login Successfully"
      ? setNavList(["Profile", "Logout"])
      : setNavList(["Login"]);
    return () => {
      console.log("clean");
      isIgnored = !isIgnored;
    };
  }, [memoizeData]);

  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen font-extrabold text-slate-200 dark:bg-gray-700">
      <header className="top-0 left-0 right-0 absolute bg-sky-100 h-14 drop-shadow-md shadow-inner flex justify-between items-center w-screen dark:bg-gray-800">
        <div className="font-black m-4 flex justify-center items-center">
          <Link to="/">CHATAM</Link>
          <div className="animate-bounce">🔥</div>
        </div>
        <nav>
          <ul className="flex justify-center items-center gap-2 m-2">
            {navList.map((list, index) => {
              return (
                <li
                  key={index}
                  className={
                    list === "Login"
                      ? "bg-gray-700 hover:bg-gray-600  py-2 px-4 rounded-full font-black m-4 xxs:m-1 cursor-pointer"
                      : "font-black m-4 xxs:m-1 cursor-pointer"
                  }
                  onClick={() => handleNav(list)}
                >
                  {list}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>
        <UserContext.Provider value={{ value, setValue }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth getData={setData} />} />
            <Route path="/auth/profile" element={<Profile />} />
          </Routes>
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
