import { getCookieParser } from "next/dist/server/api-utils";
import { InputHTMLAttributes, useState } from "react";

function Chat() {
  const [contacts, setContacts] = useState<String[]>([
    "Jennifer",
    "LLoyd",
    "Lemuel",
    "Wawap",
    "Mader",
    "Makaila",
    "Baldwin",
    "Dillon",
    "Delgado",
    "Clarissa",
    "Pearson",
    "Jessie",
    "Carr",
    "Abigayle",
    "Khan",
    "Penelope",
    "Nicholson",
  ]);
  const [searchFriend, setSearchFriend] = useState<any>("");
  return (
    <>
      <div className="flex h-full w-full items-center justify-center text-slate-100 dark:bg-slate-700">
        <section className="flex h-screen min-w-full flex-col items-center justify-center text-slate-100 dark:bg-slate-700 sm:min-w-[20rem]">
          <div className="font-bolder flex h-fit w-full items-center justify-end border-b-[.5px] p-2 sm:flex-col sm:border-r-[.5px]">
            <h1 className="">Chat</h1>
            <input
              className="m-2 rounded-full border-none py-3 px-4 focus:border dark:text-slate-900"
              type="text"
              placeholder="search friends..."
              value={searchFriend}
              onChange={(e) => setSearchFriend(e.target.value)}
            />
          </div>
          <div className="flex h-full min-w-full flex-col items-center justify-start gap-2 p-2 scrollbar scrollbar-thin scrollbar-thumb-transparent sm:min-w-[20re.m] sm:border-r-[.5px] sm:border-dotted">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full cursor-pointer select-none items-center justify-center rounded-md border border-slate-900 bg-transparent p-4 hover:border-slate-100 hover:text-slate-400 active:bg-slate-300 active:text-slate-900"
                >
                  <h1>{contact}</h1>
                </div>
              );
            })}
          </div>
        </section>
        <section className="hidden sm:block sm:h-full sm:w-full"></section>
        <section className="hidden border sm:block sm:h-full sm:w-full">
          info
        </section>
      </div>
    </>
  );
}

export default Chat;
