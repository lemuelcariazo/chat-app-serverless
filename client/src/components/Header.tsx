import { Link } from "react-router-dom";

import { StyleNav } from "../utils/styles";
import { config } from "../config";

import Icons from "../utils/Icons";
import useController from "../hooks/useController";

function Header() {
  const { development, production } = config;
  const { handleLogOut, navigation, navigate } = useController(
    development.BASE_URL + "/api/logout"
  );

  const handleNav = (list: string) => {
    switch (list) {
      case "Login":
        navigate("/auth");

        break;
      case "Logout":
        handleLogOut();
        break;
      case "Profile":
        console.log("I clicked " + list);
        navigate("/profile");
        break;

      default:
        break;
    }
  };

  return (
    <header className="top-0 left-0 right-0 bg-sky-100 h-14 drop-shadow-md shadow-inner flex justify-between items-center w-screen dark:bg-gray-800">
      <div className="font-black m-4 flex justify-center items-center">
        <Link to="/" className="flex">
          CHATAM
          <Icons />
        </Link>
      </div>
      <nav>
        <ul className="flex justify-center items-center gap-2 m-2 cursor-pointer select-none">
          {navigation.navList.map((list: string, index: number) => {
            const style = StyleNav.find((s) => s.id === list);
            const className = style
              ? style?.styleNav
              : "font-black m-4 xxs:m-1 cursor-pointer";
            return (
              <li
                key={index}
                className={className}
                onClick={() => handleNav(list)}
              >
                {list}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
