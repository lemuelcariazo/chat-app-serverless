import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "./config";

type DATA = {
  data?: string;
};

function App() {
  const [data, setData] = useState<string | null>(null);
  const { development, production } = config;
  const { BASE_URL } = development;

  const handleData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get(`${BASE_URL}/api`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <div>
        <h1>{data}</h1>
        <button onClick={handleData}>
          get the response comming from my backend
        </button>
      </div>
    </div>
  );
}

export default App;

// this will handle routing
