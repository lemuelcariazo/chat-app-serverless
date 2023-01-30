import React, { useState, useEffect } from "react";
import { config } from "../config";
import Login from "../components/Login";
import Register from "../components/Register";

import useController from "../hooks/useController";

function Authentication() {
  const [isToggle, setIsToggle] = useState(true);
  const { development, production } = config;
  const {
    handleRegister,
    handleLogin,
    email,
    password,
    CPassword,
    isLoading,
    setEmail,
    setPassword,
    setCPassword,
    data,
    setData,
  } = useController(
    development.BASE_URL + `/api${isToggle ? "/login" : "/register"}`
  );

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      data === "New User has been created!" ? setIsToggle(true) : null;
      const vanishData = setTimeout(() => {
        setData(null);
      }, 3000);

      return () => {
        clearTimeout(vanishData);
      };
    }
    return () => {
      ignore = true;
    };
  }, [data]);

  const handleToggle = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    setIsToggle(!isToggle);
  };

  return (
    <section className="h-full w-full flex justify-center items-center flex-col">
      <form className="bg-gray-800 flex justify-center items-center flex-col gap-3 h-96 w-80 rounded-lg drop-shadow-lg  dark:shadow-slate-50">
        {isToggle ? (
          <Login
            email={email}
            setEmail={setEmail}
            pw={password}
            setPw={setPassword}
          />
        ) : (
          <Register
            email={email}
            setEmail={setEmail}
            pw={password}
            setPw={setPassword}
            cPw={CPassword}
            setCPw={setCPassword}
          />
        )}
        <div className="w-full h-20 p-3 flex justify-center items-center">
          <button
            className="w-fit h-fit bg-gray-700 p-2 rounded-md hover:p-3 active:p-2 text-slate-100"
            onClick={isToggle ? handleLogin : handleRegister}
          >
            {isLoading ? "Loading..." : isToggle ? "Login" : "Register"}
          </button>
        </div>

        <div className="flex justify-between items-center w-full cursor-pointer select-none px-3">
          <h6
            className="text-xs text-slate-100 select-none h-5 w-16 text-center hover:text-slate-400 active:test-sm active:text-sm"
            onClick={(e) => {
              setEmail("");
              setPassword("");
              setCPassword("");
            }}
          >
            Reset
          </h6>
          <h6
            className="flex justify-center items-center text-xs text-slate-100 select-none h-5 w-20 text-center hover:text-slate-400 active:test-sm active:text-sm"
            onClick={handleToggle}
          >
            {isToggle ? (
              "Register"
            ) : (
              <svg
                className="w-6 h-6 dark:text-slate-100 select-none active:w-5 active:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                ></path>
              </svg>
            )}
          </h6>
        </div>
      </form>
      <div className="bottom-12 absolute">{data}</div>
    </section>
  );
}

export default Authentication;
