import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Header from "./components/Header";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

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
    const storedData = localStorage.getItem("log");
    console.log("Local: " + storedData);
    !storedData && storedData === null
      ? setNavigation({ ...navigation, navList: ["Login"] })
      : setNavigation({
          ...navigation,
          navList: ["Chat", "Logout", "Profile", <BurgerMenu />],
        });
  }, [navigation?.data]);

  return (
    <UserContext.Provider value={{ navigation, setNavigation }}>
      <StyleContext.Provider value={{ open, setOpen }}>
        <div className="flex h-screen w-screen flex-col items-center justify-start font-extrabold text-slate-900 dark:bg-gray-700 dark:text-slate-200">
          <Header />
          <main className="h-full w-full grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
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
