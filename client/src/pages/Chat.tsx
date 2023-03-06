import { getCookieParser } from "next/dist/server/api-utils";
import { useState } from "react";

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

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <section className="relative flex h-full w-full justify-center">
          <div className="scrollbar-rounded-lg absolute h-full w-[21.5em] gap-2 overflow-hidden p-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900 sm:w-[22em]">
            {contacts.map((contact, index) => {
              return (
                <div className="flex h-[4.3em] w-80 items-center justify-center">
                  <div
                    key={index}
                    className="pointer relative flex h-12 w-full cursor-pointer select-none items-center justify-center overflow-hidden rounded-md py-8 hover:border hover:bg-transparent"
                  >
                    {contact}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="hidden border sm:block sm:h-full sm:w-full">
          convoBox
        </section>
        <section className="hidden border sm:block sm:h-full sm:w-full">
          info
        </section>
      </div>
    </>
  );
}

export default Chat;
