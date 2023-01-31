import React, { useState, useEffect, useContext } from "react";
import { StyleContext } from "../utils/userContext";

const BurgerMenu: React.FC = () => {
  const { open, setOpen } = useContext(StyleContext);

  const [effect, setEffect] = useState<boolean>(false);
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setEffect(true);
    setOpen(!open);
  };

  useEffect(() => {
    let timeOutId: number;
    if (effect) {
      timeOutId = setTimeout(() => {
        setEffect(false);
      }, 500);
    }
    return () => {
      clearTimeout(timeOutId);
    };
  }, [effect]);

  return (
    <div
      className={`${
        effect && "animate-spin-burger"
      } flex flex-col items-center justify-center gap-1 transition-all sm:hidden`}
      onClick={handleToggle}
    >
      <span
        className={`${
          open && "absolute origin-center -rotate-45 transition-all"
        } block h-1.5 w-8 rounded-md bg-slate-50`}
      ></span>
      <span
        className={`${
          open && "hidden origin-center"
        } block h-1.5 w-8 rounded-md bg-slate-50`}
      ></span>
      <span
        className={`${
          open && "origin-center rotate-45 transition-all"
        } block h-1.5 w-8 rounded-md bg-slate-50`}
      ></span>
    </div>
  );
};

export default BurgerMenu;
