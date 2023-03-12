import React, { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext, StyleContext } from "../utils/userContext";

function useController(url: string) {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [CPassword, setCPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const { navigation, setNavigation } = useContext(UserContext);
  // const { open, setOpen } = useContext(StyleContext);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });
      response.data &&
        setNavigation({
          ...navigation,
          data: response.data,
        });
      navigate("/");
      localStorage.setItem("log", response.data);
      setData(response.data);
    } catch (e: any) {
      setData(e.response?.data);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
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

  const handleLogOut = async () => {
    try {
      const response = axios.delete(url);
      response && setNavigation({ ...navigation, data: response });
      localStorage.clear();
      navigate("/");
      // setOpen(false);
      setData(false);
    } catch (e: any) {
      console.log(e.response?.data?.error);
      localStorage.clear();
    }
  };
  // Register, Login, Logout ;)

  const [findEmail, setFindEmail] = useState<any>("");
  const [user, setUser] = useState<any>([]);
  const memoizedData = useMemo(() => user, [user]);
  const findUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!findEmail) {
      console.log("Please provide a username");
      setIsLoading(false);
    } else {
      try {
        const response = await axios.post(url, { email: findEmail });
        setUser(response?.data);
        console.log(user);
      } catch (e: any) {
        console.log(e?.response?.data);
        setUser(e?.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    memoizedData,
    setUser,
    findEmail,
    setFindEmail,
    findUser,
    handleRegister,
    handleLogin,
    handleLogOut,
    navigation,
    navigate,
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
