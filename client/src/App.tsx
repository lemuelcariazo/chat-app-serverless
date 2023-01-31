import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Header from "./components/Header";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

import { UserContext, StyleContext } from "./utils/userContext";

import BurgerMenu from "./components/burgerMenu";

axios.defaults.withCredentials = true;

interface NAVIGATION {
  data?: string | null;
  navList?: Array<string | React.ReactElement>;
}

function App() {
  const [navigation, setNavigation] = useState<NAVIGATION>({
    data: null,
    navList: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(open);
  }, [open]);

  useEffect(() => {
    const storedData = localStorage.getItem("log");
    console.log("Local: " + storedData);
    !storedData
      ? setNavigation({ ...navigation, navList: ["Login"] })
      : setNavigation({
          ...navigation,
          navList: ["Logout", "Profile", <BurgerMenu />],
        });
  }, [navigation.data]);

  return (
    <UserContext.Provider value={{ navigation, setNavigation }}>
      <StyleContext.Provider value={{ open, setOpen }}>
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
      </StyleContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
