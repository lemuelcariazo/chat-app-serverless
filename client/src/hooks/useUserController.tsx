import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function useUserController() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigateToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/");
  };

  const handleLogOut = async () => {
    axios
      .delete("http://localhost:8080/api/logout")
      .then((response) => {
        console.log(response?.data);
        navigate("/");
      })
      .catch((e) => {
        console.error(e.response?.data?.error);
      });
  };
  return { navigateToHome, handleLogOut };
}

export default useUserController;
