import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import { useContext } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "../context/AppContext";
import { PrimaryButton } from "../components/button/Button";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

export default function Home({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const { theme } = useContext(ThemeContext);

  // routes
  const router = useRouter();
  const { userID } = router.query;
  return (
    <div className={clsx(theme === "light" ? " bg-clrWhite" : "bg-clrGrey")}>
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Messaging app to share your thoughts."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main
        className={clsx(
          theme === "light" ? "bg-clrWhite" : "bg-clrGrey",
          "flex m-auto h-screen w-[calc(100%-10px)] max-w-[800px] p-3 md:p-6 "
        )}
      >
        <div className="">
          <div id="Hero" className="p-2 flex flex-col items-start gap-5">
            <span className="uppercase font-bold text-5xl">
              A home for
              <br />
              your thoughts
            </span>

            {status === "authenticated" ? (
              <div className="p-2">
                <Link href={`/${userID}/profile`}>
                  <PrimaryButton
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    ButtonValue="Visit profile to get started "
                  ></PrimaryButton>
                  <FontAwesomeIcon
                    className="pl-2"
                    icon={faArrowAltCircleRight}
                  ></FontAwesomeIcon>
                </Link>
              </div>
            ) : (
              <div className="p-3">
                <p className="font-bold pt-3">
                  You are currently not signed in.
                </p>
                <Link href="/api/auth/signin">
                  <PrimaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                    ButtonValue="Sign In"
                  ></PrimaryButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  const user = await prisma.user.findFirst({
    where: {
      id: session?.userId,
    },
  });
  return { props: { user } };
};
