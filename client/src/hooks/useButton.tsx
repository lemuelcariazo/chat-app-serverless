import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";

function useButton(path: string) {
  const navigate = useNavigate();
  const handlePath = () => {
    navigate(path);
  };

  return { handlePath };
}

export default useButton;
