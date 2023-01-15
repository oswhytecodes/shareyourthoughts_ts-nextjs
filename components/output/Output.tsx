import Image from "next/image";
import clsx from "clsx";
import Profile from "../profile/Profile";
import { Tabs } from "../tabs/Tabs";
import { NotSignedIn } from "../button/NotSignedIn";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { PrismaClient } from "@prisma/client";
import { PrimaryButton } from "../button/Button";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/AppContext";
import { useSession, getSession } from "next-auth/react";
import { MessageDataType, MessageProps } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Output = () => {
  const theme = useContext(ThemeContext);
  const { data: session, status } = useSession();
 
  //  visit profile
  const [toggleProfile, setToggleProfile] = useState<boolean>(false);
  const handleProfileToggle = () => {
    setToggleProfile((prev) => !prev);
  };

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
        "p-4 col-span-4"
      )}
    >
      <div className="w-full flex justify-between text-right">
        <div className="text-[10px]">
          <PrimaryButton
            onClick={() => {
              handleProfileToggle();
            }}
            ButtonValue="Edit Profile"
          ></PrimaryButton>
        </div>
        {toggleProfile ? (
          <Profile handleProfileToggle={handleProfileToggle} />
        ) : null}
      </div>
      <Tabs />
      <div className=" w-full mt-6 bg-slate-50 px-6 py-8 border-[.0001px] border-solid shadow-xl rounded-md">
        <List messageData={data} />
      </div>
    </section>
  );
};
export default Output;

// export async function getServerSideProps() {
//   const prisma = new PrismaClient();
//   const session = getSession();
//   const id = session?.userId;

//   const data = await prisma?.messages.findMany({
//     where: {
//       userId: id,
//     },
//   });
//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(data)),
//     },
//   };
// }

export const List = ({ messageData }: MessageProps) => {
  const { data: session } = useSession();
  const username = session?.user?.name;
  // icon toggling
  const [toggleFavorite, setToggleFavorite] = useState({});
  const [colorFavorite, setColorFavorite] = useState({});
  useEffect(() => {
    let color = JSON.parse(localStorage.getItem("favorite"));
    if (color) {
      setColorFavorite(color);
    }
  }, []);
  const handleFavoriteToggle = (id: number) => {
    setToggleFavorite({
      ...toggleFavorite,
      [id]: !toggleFavorite[id],
    });
    !toggleFavorite[id]
      ? setColorFavorite({
          ...colorFavorite,
          [id]: "text-red-600",
        })
      : setColorFavorite({
          ...colorFavorite,
          [id]: "text-[clrBlue]",
        });
  };
  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(colorFavorite));
  }, [colorFavorite]);

  // message data mapped
  const messages = messageData.map((message: MessageDataType) => {
    return (
      <div key={message.id} className="">
        {/* first row */}
        <div className=" flex justify-between items-center text-clrHeader">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-xl bg-clrBlue inline-block">
              {session?.user?.image && (
                <Image
                  className="rounded-xl"
                  alt="User profile picture"
                  src={session?.user?.image}
                  height="40"
                  width="40"
                />
              )}
            </span>
            <span className="text-[14px]">{username}</span>
          </div>
          <div className="flex gap-3 border-solid border-2 p-2 cursor-pointer rounded border-slate-500">
            <FontAwesomeIcon icon={faPen} />
            <FontAwesomeIcon icon={faTrash} />

            <FontAwesomeIcon
              onClick={() => handleFavoriteToggle(message.id)}
              className={` ${colorFavorite[message.id]}`}
              icon={faHeart}
            />
          </div>
        </div>
        {/* second row */}
        <div className="mt-4">
          <p className=" font-bold">{message.userMessage}</p>
        </div>
        {/* third row */}
        <div className="mt-6 ">
          <p className="text-[9px]">
            {" "}
            {
              (new Date(message.date).toDateString(),
              new Date(message.date).toLocaleString())
            }
          </p>
        </div>
        <div className="my-6">
          <hr className="mx-[-24px] h-[2px] bg-slate-500" />
        </div>
      </div>
    );
  });
  return <>{messages}</>;
};
