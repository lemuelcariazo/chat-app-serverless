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
    <section className="flex h-screen w-full flex-col items-center justify-center dark:bg-slate-800">
      <form className="flex h-96 w-80 flex-col items-center justify-center gap-3 rounded-lg bg-gray-800 drop-shadow-lg  dark:shadow-slate-50">
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
        <div className="flex h-20 w-full items-center justify-center p-3">
          <button
            className="h-fit w-fit rounded-md bg-gray-700 p-2 text-slate-100 hover:p-3 active:p-2"
            onClick={isToggle ? handleLogin : handleRegister}
          >
            {isLoading ? "..." : isToggle ? "Login" : "Register"}
          </button>
        </div>

        <div className="flex w-full cursor-pointer select-none items-center justify-between px-3">
          <h6
            className="active:test-sm h-5 w-16 select-none text-center text-xs text-slate-100 hover:text-slate-400 active:text-sm"
            onClick={(e) => {
              setEmail("");
              setPassword("");
              setCPassword("");
            }}
          >
            Reset
          </h6>
          <h6
            className="active:test-sm flex h-5 w-20 select-none items-center justify-center text-center text-xs text-slate-100 hover:text-slate-400 active:text-sm"
            onClick={handleToggle}
          >
            {isToggle ? (
              "Register"
            ) : (
              <svg
                className="h-6 w-6 select-none active:h-5 active:w-5 dark:text-slate-100"
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
      <div className="absolute bottom-12">{data}</div>
    </section>
  );
}

export default Authentication;
