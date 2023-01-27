import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import axios from "axios";

import Login from "../components/Login";
import Register from "../components/Register";

import { UserContext } from "../utils/userContext";

function Authentication() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { navigation, setNavigation, setData } = useContext(UserContext);

  const { development, production } = config;
  const navigate = useNavigate();

  const handleResponseData = (response: string) => {
    response
      ? setNavigation({
          ...navigation,
          navList: ["Profile", "Logout"],
          data: response,
        })
      : setNavigation({ ...navigation, navList: ["Login"] });
    localStorage.setItem("log", response);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(development.BASE_URL + "/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");

        handleResponseData(res.data);
      })
      .catch((e) => {
        console.error(e.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      <form className="bg-gray-800 flex justify-center items-center flex-col gap-5 h-80 w-80 rounded-lg drop-shadow-lg  dark:shadow-slate-50">
        <Login
          email={email}
          setEmail={setEmail}
          pw={password}
          setPw={setPassword}
        />
        <div className="w-full h-20 p-3 flex justify-center items-center">
          <button
            className="w-fit h-fit bg-gray-700 p-2 rounded-md hover:p-3 active:p-2"
            onClick={handleLogin}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="flex justify-end w-full pr-5 cursor-pointer">
          <h6 className=" hover:text-slate-400 text-xs">Register</h6>
        </div>
      </form>
    </>
  );
}

export default Authentication;

//setUser={setUsername} user={username} it is good
