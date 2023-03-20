import { useState, useEffect, MouseEventHandler } from "react";
import axios from "axios";
import { config } from "../config";

interface FETCH_USER {
  _id: String;
  email: String;
}

const SearchInput = ({ handleUserProfile }: any) => {
  const { development } = config;
  const [fetchUser, setFetchUser] = useState<FETCH_USER[]>([]);
  const [typeUser, setTypeUser] = useState<any>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // const [defaultHighLight, setDefaultHighLight] =
  //   useState<String>("bg-slate-600");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Call the API with the search term
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

  const handleKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex(
          (prevIndex: number) => (prevIndex + 1) % filteredUser.length
        );

        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) => (prevIndex - 1) % filteredUser.length);

      default:
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border p-10 text-slate-100 dark:text-slate-900">
      <input
        type="search"
        value={typeUser}
        onChange={(e) => setTypeUser(e.target.value)}
        className="m-2 w-80 rounded-md border-none py-3 px-4 focus:border dark:text-slate-900"
        onKeyDown={handleKey}
      />
      <div className="flex w-full flex-col items-start justify-center">
        {typeUser
          ? filteredUser.map(({ email }, index) => {
              return typeUser === email ? null : (
                <p
                  className={`w-full cursor-pointer select-none rounded-md p-4 hover:bg-slate-500 active:rounded-full dark:text-slate-100 ${
                    selectedIndex === index && "bg-slate-800 dark:bg-slate-600"
                  }`}
                  key={index}
                >
                  {email}
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};
// "bg-slate-700"

export default SearchInput;

// notes: When the filtered has been clicked, it will go to the USERSprofile for the user to check
