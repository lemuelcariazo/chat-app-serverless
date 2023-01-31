import { useContext } from "react";
import { StyleContext } from "../utils/userContext";

const useStyles = () => {
  const { open } = useContext(StyleContext);

  const StyleNav: Array<{ id: string; styleNav: string }> = [
    {
      id: "Login",
      styleNav:
        "bg-gray-700 hover:bg-gray-600  py-2 px-4 rounded-full font-black m-4 xxs:m-1 cursor-pointer text-slate-100",
    },
    {
      id: "Profile",
      styleNav: `${
        open
          ? "not-sr-only transition-all"
          : "sr-only sm:not-sr-only transition-all"
      }`,
    },
    {
      id: "Logout",
      styleNav: `${
        open
          ? "not-sr-only bg-gray-700 hover:bg-gray-600 py-2 px-4 font-black m-4 xxs:m-1 cursor-pointer text-slate-100 xxs:block"
          : "sr-only sm:not-sr-only transition-all"
      }`,
    },
  ];

  return { StyleNav };
};

export default useStyles;
