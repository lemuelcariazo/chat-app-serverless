import { config } from "../config";
import useFetch from "../hooks/useFetch";

import { useContext, useState } from "react";
import { UserContext } from "../utils/userContext";

type LOG = {
  getData: React.Dispatch<any>;
};

function Profile() {
  return (
    <section className="ml-10 flex h-full w-44 items-center justify-center bg-slate-300 dark:bg-slate-600">
      <div>this is profile</div>
      <h1>Current friends: 0</h1>
      <article></article>
    </section>
  );
}

export default Profile;
