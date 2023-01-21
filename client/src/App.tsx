import "./index.css";
import { useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { UserContext } from "./utils/userContext";

function App() {
  const [value, setValue] = useState<string | null>(null);
  const providerValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value, setValue]
  );

  return (
    <>
      <div className="flex justify-center items-center flex-col w-screen h-screen text-md font-extrabold">
        <header className="h-fit">
          <nav className="w-screen flex justify-between items-center">
            <Link
              to="/"
              className="w-fit m-4 border border-slate-900 rounded-full p-3 cursor-pointer drop-shadow-md"
            >
              🔥
            </Link>
            <div className=" h-16 px-2 flex justify-between items-center gap-x-5 mx-4">
              <Link className="" to="/register">
                Register
              </Link>
              <div className="w-20 h-full flex justify-center items-center">
                <Link
                  className="bg-red-500 rounded-lg p-4 active:p-2"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="bg-gradient-to-b from-red-800 to-red-300 flex justify-center items-center flex-col w-screen h-full">
          <UserContext.Provider value={providerValue}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </UserContext.Provider>
        </main>
      </div>
    </>
  );
}

export default App;

// this will handle routing
// border border-slate-900
