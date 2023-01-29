import { Routes, Route, Link } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Header from "./components/Header";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

import { UserContext } from "./utils/userContext";

axios.defaults.withCredentials = true;

interface NAVIGATION {
  data?: string | null;
  navList?: String[];
}

function App() {
  const [navigation, setNavigation] = useState<NAVIGATION>({
    data: "Hello from root App",
    navList: ["..."],
  });

  useEffect(() => {
    const storedData = localStorage.getItem("log");
    console.log("this is from the local Storage " + storedData);

    storedData === null
      ? setNavigation({ ...navigation, navList: ["Login"] })
      : setNavigation({ ...navigation, navList: ["Profile", "Logout"] });
  }, [navigation.data]);

  return (
    <UserContext.Provider value={{ navigation, setNavigation }}>
      <div className="flex justify-start items-center flex-col h-screen w-screen font-extrabold text-slate-900 dark:text-slate-200 dark:bg-gray-700">
        <Header />
        <main className="grow w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
