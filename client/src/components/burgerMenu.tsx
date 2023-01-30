import React, { useState, useEffect } from "react";

const BurgerMenu: React.FC = () => {
  const [effect, setEffect] = useState<boolean>(false);
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setEffect(true);
    console.log(effect);
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
      }  flex justify-center items-center flex-col gap-1 md:hidden`}
      onClick={handleToggle}
    >
      <span className="h-1.5 w-8 bg-slate-50 rounded-md"></span>
      <span className="h-1.5 w-8 bg-slate-50 rounded-md"></span>
      <span className="h-1.5 w-8 bg-slate-50 rounded-md"></span>
    </div>
  );
};

export default BurgerMenu;
// this trigger the button to open the menu
