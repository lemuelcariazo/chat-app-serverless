import { Link } from "react-router-dom";

// import { StyleNav } from "../utils/styles";
import useStyles from "../hooks/useStyles";
import { config } from "../config";

import Icons from "../utils/Icons";
import useController from "../hooks/useController";

function Header() {
  const { development, production } = config;
  const { StyleNav } = useStyles();
  const { handleLogOut, navigation, navigate } = useController(
    development.BASE_URL + "/api/logout"
  );
// actiom for nav list route
  const handleNav = (list: string) => {
    switch (list) {
      case "Login":
        navigate("/auth");

        break;
      case "Logout":
        handleLogOut();
        break;
      case "Profile":
        // console.log("I clicked " + list);
        navigate("/profile");
        break;

      default:
        break;
    }
  };

  return (
    <header className="top-0 left-0 right-0 flex h-14 w-screen items-center justify-between bg-sky-100 shadow-inner drop-shadow-md dark:bg-gray-800">
      <div className="m-4 flex items-center justify-center font-black">
        <Link to="/" className="flex">
          CHATAM
          <Icons />
        </Link>
      </div>
      <nav>
        <ul className="m-2 flex cursor-pointer select-none items-center justify-center gap-2">
          {navigation.navList.map((list: string, index: number) => {
            const style = StyleNav.find((s) => s.id === list);
            const className = style && style?.styleNav;
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
