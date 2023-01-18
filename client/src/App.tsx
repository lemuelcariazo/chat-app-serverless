import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

type DATA = {
  data?: string;
};

function App() {
  const [data, setData] = useState<string | null>(null);

  const handleData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/api")
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
