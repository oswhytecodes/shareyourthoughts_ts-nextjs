import Head from "next/head";
import { useSWRConfig } from "swr";

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import Input from "../../components/input/Input";
import Output from "../../components/output/Output";
import { ThemeContext } from "../../context/AppContext";
import { useSession, getSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";

export default function User({
      user,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // theme
  const { theme } = useContext(ThemeContext);
  // session data
  const { data: session } = useSession();
  // router
  const router = useRouter();
  console.log(router);
  const username = user?.id;
  const { userID } = router.query;
  useEffect(() => {
    router.push({
      query: {
        userID: username,
      },
    });
  }, [username]);
  const { mutate } = useSWRConfig();

  // data from getServerSideProps

  const createMessage = async (id?: string, message?: string) => {
    if (session) {
      try {
        const url = `/api/messages/`;
        const body = { id, message, favorite: 0 };
        const options = {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        mutate(`${url}${userID}`);
      } catch (error) {
        return error;
      }
    }
  };
  const updateMessage = async (id: number, message: string) => {
    if (session) {
      try {
        const url = `/api/messages/${userID}`;
        const body = { id, message };
        const options = {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        mutate(`${url}${userID}`);
        return data;
      } catch (error) {
        return error;
      }
    }
  };
  const deleteMessage = async (id: number) => {
    if (session) {
      try {
        const url = `/api/messages/${userID}`;
        const body = { id };
        const options = {
          method: "DELETE",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        mutate(`${url}`);
        return data;
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <section
      className={`
      ${theme === "light" ? "bg-white" : "bg-clrWhite"} 
      h-screen flex m-auto w-[calc(100%-10px)] max-w-[800px] 
      `}
    >
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Messaging app to share your thoughts."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full grid md:grid-cols-6 grid-cols-1 grid-rows-5">
        <Input createMessage={createMessage} />
        <Output deleteMessage={deleteMessage} updateMessage={updateMessage} />
      </div>
    </section>
  );
}

export const getServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (!session) {
    return {
      props: { user: [] },
      redirect: {
        destination: "/",
      },
    };
  }
  const user = await prisma.user.findFirst({
    where: {
      id: session?.userId,
    },
  });
  return { props: { user } };
};
