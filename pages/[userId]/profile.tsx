import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/router";

import { ThemeContext } from "../../context/AppContext";
import { PrismaClient } from "@prisma/client";
import { useState, useContext } from "react";
import { InferGetServerSidePropsType } from "next";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps({ req, res }) {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (!session) {
    return {
      props: { results: [] },
      redirect: {
        destination: "/",
      },
    };
  }
  const results = await prisma?.user.findFirst({
    where: {
      id: session?.userId,
    },
  });
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
      
    }, // will be passed to the page component as props
  };
}

export default function Profile({
          results,
        }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { theme } = useContext(ThemeContext);

  const id = session?.userId;
  const router = useRouter();
  const { userID } = router.query;


  // CREATE NEW PROFILE
  const saveProfile = async (id?: string, username?: string, bio?: string) => {
    try {
      const url = `/api/profile/userprofile/`;
      const body = { id, username, bio };
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      return error;
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length > 3 && bio.length > 3) {
      saveProfile(id, username, bio);
      setBio("");
      setUsername("");
    }
  };
  return (
    <section className="bg-clrWhite m-auto h-screen w-[calc(100%-10px)] max-w-[800px]">
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Messaging app to share your thoughts."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {session && (
        <>
          <div className="shadow-md w-full flex justify-between py-3 px-4 items-center">
            <h1 className="uppercase font-bold text-lg ">Profile</h1>
            <Link href="/user">
              <FontAwesomeIcon
                className="text-clrHeader hover:text-clrBlue text-right  text-[18px] cursor-pointer"
                icon={faX}
              />
            </Link>
          </div>

          {/* ---- PROFILE DETAILS ---- */}
          <div
            className={clsx(
              theme === "light" ? "bg-clrHeader" : "bg-clrBlack",
              "h-full py-10 text-clrWhite m-auto flex flex-col items-center gap-2  "
            )}
          >
            {/* ---- IMAGE ---- */}
            <div className=" flex justify-center items-center gap-4">
              {results.image && (
                <Image
                  priority
                  className="rounded-full"
                  width="100"
                  height="100"
                  quality={100}
                  src={results.image}
                  alt="User"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "auto",
                  }}
                ></Image>
              )}
              <div>
                <h2 className="font-bold text-xl  uppercase md:text-center">
                  {results.name}
                </h2>
                <span className="p-1">{results.email}</span>
              </div>
            </div>
            {/* ---- FORM ---- */}
            <div className="bg-clrWhite py-10 px-8 rounded-md flex flex-col justify-center gap-2 mt-6">
              <form
                className="flex flex-col justify-start items-start gap-2"
                action="submit"
                onSubmit={handleSubmit}
              >
                <label
                  className="text-clrBlack uppercase font-bold "
                  htmlFor="username"
                >
                  UserName:
                </label>
                <input
                  className="p-1 text-clrBlue border border-1 border-clrBlack bg-transparent shadow rounded-md"
                  placeholder="Create Username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
                <label
                  className="text-clrBlack uppercase font-bold "
                  htmlFor="bio"
                >
                  BIO:
                </label>
                <input
                  className="p-1  border border-1 text-clrBlue  border-clrBlack bg-transparent shadow rounded-md"
                  placeholder="Enter bio.."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                />
                {/* <div className="w-full flex flex-col gap-3 mb-6 text-sm md:text-md">
                  <span className="text-clrBlack uppercase font-bold">
                    Email:
                  </span>

                  <span>{results.email}</span>
                </div> */}
                <button className="mt-4 bg-clrHeader text-clrWhite p-2">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
