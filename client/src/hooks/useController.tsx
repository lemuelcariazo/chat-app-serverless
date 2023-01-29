import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import axios from "axios";

import { UserContext } from "../utils/userContext";

function useController(url: string) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [CPassword, setCPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<any>(null);

  const { development, production } = config;
  const navigate = useNavigate();

  const { navigation, setNavigation } = useContext(UserContext);

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
        // console.log(res.data);
        navigate("/");
        handleResponseData(res.data);
        setData(res.data);
      })
      .catch((e) => {
        // console.error(e.response?.data);
        setData(e.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("handle Register is Clicked");
    if (password !== CPassword) {
      setData("Please check you password");
      setIsLoading(false);
      setPassword("");
      setCPassword("");
    } else {
      try {
        const response: any = await axios.post(url, {
          email: email,
          password: password,
        });

        setData(response.data);
      } catch (e: any) {
        setData(e.response.data);
      } finally {
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setCPassword("");
      }
    }
  };

  return {
    handleLogin,
    handleRegister,
    email,
    password,
    CPassword,
    isLoading,
    setEmail,
    setPassword,
    setCPassword,
    setIsLoading,
    data,
    setData,
  };
}

export default useController;
