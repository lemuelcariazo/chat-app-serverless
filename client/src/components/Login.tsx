import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { UserContext } from "../utils/userContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { development, production } = config;
  const { value, setValue } = useContext(UserContext);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${development.BASE_URL}/api/login`, {
        email: email,
        password: password,
      });
      setValue(response?.data);
      navigate("/");
    } catch (e: any) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <form className="flex justify-center items-center flex-col gap-12">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
