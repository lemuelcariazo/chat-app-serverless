import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { config } from "../config";
import { UserContext } from "../utils/userContext";

// interface NAVIGATION {
//   data?: string | null;
//   navList?: String[];
// }

function Header() {
  const navigate = useNavigate();
  const { development, production } = config;
  const { setNavigation, navigation } = useContext(UserContext);

  const handleResponseData = (response: string) => {
    response
      ? setNavigation({ ...navigation, navList: ["Login"], data: response })
      : setNavigation({ ...navigation, navList: ["Profile", "Logout"] });
    localStorage.clear();
  };

  const handleLogOut = async () => {
    try {
      const responseLogout = axios.delete(development.BASE_URL + "/api/logout");
      console.log((await responseLogout).data);
      handleResponseData((await responseLogout).data);
      navigate("/");
    } catch (e: any) {
      console.log(e.response?.data?.error);
      localStorage.clear();
    }
  };

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
    <header className="top-0 left-0 right-0 absolute bg-sky-100 h-14 drop-shadow-md shadow-inner flex justify-between items-center w-screen dark:bg-gray-800">
      <div className="font-black m-4 flex justify-center items-center">
        <Link to="/" className="flex">
          CHATAM
          <svg
            className="animate-bounce"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.3671 4.06132C9.6671 4.56707 5 8.15805 5 13.9996C5 14.9188 5.18106 15.8291 5.53284 16.6784C5.88463 17.5277 6.40024 18.2993 7.05025 18.9493C7.70026 19.5993 8.47194 20.115 9.32122 20.4667C10.146 20.8084 11.0282 20.989 11.9203 20.9991C9.74796 20.9567 8 19.1824 8 16.9999C8 16.8024 8.01432 16.6082 8.04197 16.4184C8.04315 16.4071 8.04459 16.3957 8.04628 16.3843C8.3817 14.1305 10.4553 12.2171 11.4581 11.4101C11.7785 11.1523 12.2216 11.1523 12.5421 11.4101C13.5448 12.2171 15.6183 14.1305 15.9537 16.3843C15.9554 16.3957 15.9569 16.4071 15.958 16.4184C15.9857 16.6082 16 16.8024 16 16.9999C16 19.1824 14.252 20.9567 12.0797 20.9991C12.9718 20.989 13.854 20.8084 14.6788 20.4667C15.5281 20.115 16.2997 19.5993 16.9497 18.9493C17.5998 18.2993 18.1154 17.5277 18.4672 16.6784C18.807 15.8579 18.9875 14.9804 18.9994 14.093C18.9998 14.0815 19 14.07 19 14.0584L18.9999 14.0268L19 13.9997L18.9999 13.9996L18.9998 13.9995C18.9734 9.75884 16.1044 7.4446 15.5813 7.05781C15.5323 7.02155 15.4671 7.02196 15.4181 7.05823C15.2083 7.21337 14.6241 7.67639 13.9967 8.44729C13.9251 8.53521 13.7845 8.5184 13.7361 8.41591C12.5573 5.92135 10.9243 4.40726 10.5386 4.07102C10.4888 4.02764 10.4206 4.02266 10.3671 4.06132Z"
              fill="#EF4444"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.04628 16.3844C8.3817 14.1306 10.4553 12.2172 11.4581 11.4102C11.7785 11.1523 12.2216 11.1523 12.5421 11.4102C13.5448 12.2172 15.6183 14.1306 15.9537 16.3844C15.9554 16.3958 15.9569 16.4071 15.958 16.4184C15.9857 16.6083 16 16.8025 16 17C16 19.2091 14.2091 21 12 21C9.79086 21 8 19.2091 8 17C8 16.8024 8.01432 16.6083 8.04197 16.4184C8.04315 16.4071 8.04459 16.3958 8.04628 16.3844Z"
              fill="#F59E0B"
            />
          </svg>
        </Link>
      </div>
      <nav>
        <ul className="flex justify-center items-center gap-2 m-2">
          {navigation.navList.map((list: string, index: number) => {
            return (
              <li
                key={index}
                className={
                  list === "Login"
                    ? "bg-gray-700 hover:bg-gray-600  py-2 px-4 rounded-full font-black m-4 xxs:m-1 cursor-pointer"
                    : "font-black m-4 xxs:m-1 cursor-pointer"
                }
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
