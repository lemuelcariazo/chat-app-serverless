import { useState, useEffect, MouseEventHandler, useMemo } from "react";
import axios from "axios";
import { config } from "../config";

interface FETCH_USER {
  _id: String;
  email: String;
}

const SearchInput = ({ handleUserProfile }: any) => {
  const { development } = config;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [fetchUser, setFetchUser] = useState<FETCH_USER[]>([]);
  const [typeUser, setTypeUser] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);

  const memoUserData = useMemo(() => {
    if (!typeUser) {
      return setUserData(null); // or an empty string
    }

    return userData;
  }, [typeUser, userData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios
        .post(development.BASE_URL + "/api/findAllUser")
        .then((response) => {
          setFetchUser(response?.data);
        })
        .catch((e) => console.log(e));
    }, 500); // Delay for 500ms

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [typeUser]);

  const filteredUser = fetchUser
    .filter(({ email }) => {
      return (
        email.charAt(0).toLocaleLowerCase() ===
        typeUser.charAt(0).toLocaleLowerCase()
      );
    })
    .filter(({ email }) => {
      return email.toLocaleLowerCase().includes(typeUser.toLocaleLowerCase());
    });

  const handleKey = async (e: React.KeyboardEvent) => {
    // FOR THE SELECTION OF LIST
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(
          (prevIndex: number) => (prevIndex + 1) % filteredUser.length
        );

        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex - 1) % filteredUser.length);
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < filteredUser.length) {
          e.preventDefault();
          const selectedEmail = filteredUser[selectedIndex].email;
          await fetchSelectedEmail(selectedEmail);
        }
        break;
      default:
        break;
    }
  };

  const fetchSelectedEmail = async (email: String) => {
    // FOR FETCHING DATA
    try {
      const response = await axios.post(
        development.BASE_URL + "/api/findUser",
        {
          email,
        }
      );

      const jsonData = JSON.stringify(response?.data);
      console.log(jsonData);

      return setUserData(jsonData);
    } catch (e: any) {
      console.log(typeof e);
      return console.log(e?.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10 text-slate-100 dark:text-slate-900">
        <input
          type="search"
          value={typeUser}
          onKeyDown={handleKey}
          placeholder="find friends..."
          onChange={(e) => setTypeUser(e.target.value)}
          className="m-2 w-80 rounded-md border-none py-3 px-4 focus:border dark:text-slate-900"
        />

        <div className="flex w-full flex-col items-start justify-center">
          {typeUser
            ? filteredUser.map(({ email }, index) => {
                return (
                  <p
                    className={`w-full cursor-pointer select-none rounded-md p-4 hover:bg-slate-500 active:rounded-full dark:text-slate-100 ${
                      selectedIndex === index &&
                      "bg-slate-800 dark:bg-slate-600"
                    }`}
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      fetchSelectedEmail(email);
                    }}
                  >
                    {email}
                  </p>
                );
              })
            : ""}
        </div>
      </div>
      <h1 className="">{memoUserData}</h1>
    </>
  );
};

export default SearchInput;
