import clsx from "clsx";
import useSWR from "swr";
import Link from "next/link";
import { List } from "./List";
import { Tabs } from "./Tabs";
import { NotSignedIn } from "../button/NotSignedIn";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/AppContext";
import { useSession, getSession } from "next-auth/react";
import {
  MessageFunctions,
  MessageDataType,
  MessageProps,
} from "../../types/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Output = ({ deleteMessage, updateMessage }: MessageFunctions) => {
  const { theme } = useContext(ThemeContext);
  const { data: session, status } = useSession();
  //  visit profile

  // data
  const router = useRouter();
  const { userID } = router.query;
  const { data, error } = useSWR(
    session ? `/api/messages/${userID}` : null,
    fetcher
  );
  if (error) return <div>An error occured.</div>;
  if (session && !data) return <div>Loading...</div>;
  if (!data && !session) return <NotSignedIn />;
  return (
    <section
      className={clsx(
        theme === "light" ? "bg-clrWhite" : "bg-clrGrey",
        "p-2 col-span-4 row-span-6 w-full"
      )}
    >
      <div className="flex flex-col justify-between items-start w-full">
        <Link href="/user/profile">
          <button
            className={clsx(
              theme === "light"
                ? " hover:bg-clrHeader text-clrHeader border-clrHeader"
                : " hover:bg-clrBlack text-clrBlue border-clrBlack",
              "bg-transparent text-[10px] font-semibold hover:text-clrWhite py-2 px-3 border  hover:border-transparent"
            )}
          >
            Edit Profile
          </button>
        </Link>
      </div>
      <Tabs />
      <div className="overflow-y-scroll h-[700px] w-full mt-4 bg-slate-50 px-4 py-8 border-[.0001px] border-solid shadow-xl rounded-md">
        <List
          messageData={data}
          deleteMessage={deleteMessage}
          updateMessage={updateMessage}
        />
      </div>
    </section>
  );
};
export default Output;
