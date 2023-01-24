import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";

axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  const showSomething = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen font-extrabold text-slate-200 dark:bg-gray-700">
      <header className="cursor-pointer top-0 left-0 right-0 absolute bg-sky-100 h-14 drop-shadow-md shadow-inner flex justify-between items-center w-screen dark:bg-gray-800">
        <div
          className="font-black m-4 flex justify-center items-center"
          onClick={showSomething}
        >
          <h1>CHATAM</h1>
          <div className="animate-bounce">🔥</div>
        </div>
        <nav>
          <button
            className="font-black m-4"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              navigate("/auth");
            }}
          >
            LOGIN
          </button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
