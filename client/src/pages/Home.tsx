import { useEffect, useState, useContext, useMemo } from "react";
import { UserContext } from "../utils/userContext";

function Home() {
  const { value } = useContext(UserContext);
  console.log(typeof value);
  useMemo(() => {
    value;
  }, [value]);

  return (
    <>
      <h1>{value}</h1>
    </>
  );
}

export default Home;
