import Link from "next/link";
import { PrimaryButton } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/AppContext";

import { PrismaClient } from "@prisma/client";
import clsx from "clsx";
import Profile from "../profile/profile";

export const Output = ({ data }) => {
  console.log(data);
  const { theme } = useContext(ThemeContext);
  const [toggleTab, setToggleTab] = useState(1);
  const handleTab = (n: number) => {
    setToggleTab(n);
  };

  const [toggleProfile, setToggleProfile] = useState(false);
  const handleProfileToggle = () => {
    setToggleProfile((prev) => !prev);
  };
  return (
    <section
      className={clsx(
        theme === "light" ? "bg-clrWhite" : "bg-clrGrey",
        "p-4 col-span-4"
      )}
    >
      <div className="w-full flex justify-between  text-right">
        <div onClick={handleProfileToggle} className="text-[10px]">
          <PrimaryButton
            onClick={() => console.log("button click")}
            ButtonValue="Edit Profile"
          ></PrimaryButton>
        </div>
        {toggleProfile ? <Profile /> : null}
      </div>
      {/* TAB */}
      <div className="mt-6">
        <div className="grid grid-cols-3 bg-white border-b-2 border-clrHeader">
          <button
            onClick={() => setToggleTab(1)}
            className={clsx(
              "p-4 text-clrWhite border-r border-r-1 border-clrHeader",
              toggleTab === 1
                ? theme === "light"
                  ? "bg-clrHeader"
                  : "bg-clrBlack"
                : "bg-white text-clrBlack"
            )}
          >
            Messages
          </button>
          <button
            className={clsx(
              "p-4 text-clrWhite border-r border-r-1 border-clrHeader",
              toggleTab === 2
                ? theme === "light"
                  ? "bg-clrHeader"
                  : "bg-clrBlack"
                : "bg-white text-clrBlack"
            )}
            onClick={() => setToggleTab(2)}
          >
            Favorites
          </button>
          <button
            className={clsx(
              "p-4 text-clrWhite",
              toggleTab === 3
                ? theme === "light"
                  ? "bg-clrHeader"
                  : "bg-clrBlack "
                : "bg-white text-clrBlack"
            )}
            onClick={() => setToggleTab(3)}
          >
            Search
          </button>
        </div>
      </div>
      {/* lists */}
      <div className=" w-full mt-6 bg-slate-50 px-6 py-8 border-[.0001px] border-solid shadow-xl rounded-md">
        <List />
      </div>
    </section>
  );
};

export default Output;

export const getServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient();
  async function main() {
    // ... you will write your Prisma Client queries here
    const results = await prisma.messages.findUnique({
      where: {
        userId: "clci5gra60000v388p2au0lsw",
      },
    });
    return results;
  }

  const data = await main()
    .then(async (res) => {
      await prisma.$disconnect();
      return res;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  console.log("Server Data", data);

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

export const List = () => {
  return (
    <div className="">
      {/* first row */}
      <div className=" flex justify-between items-center text-clrHeader">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-xl bg-clrBlue inline-block"></span>
          <span className="text-[14px]">oswhytecodes</span>
        </div>
        <div className="flex gap-3 border-solid border-2 p-2 cursor-pointer rounded border-slate-500">
          <FontAwesomeIcon icon={faPen} />
          <FontAwesomeIcon icon={faTrash} />
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      {/* second row */}
      <div className="mt-4">
        <p className=" font-bold">Hey Hey Hey</p>
      </div>
      {/* third row */}
      <div className="mt-6 ">
        <p className="text-[6px]">12/7/2022, 2:46:08 PM</p>
      </div>
      <div className="my-6  ">
        <hr className="mx-[-24px] drop" />
      </div>
    </div>
  );
};
