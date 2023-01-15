import Head from "next/head";
import { useContext } from "react";
import { ThemeContext } from "../context/AppContext";
import { PrimaryButton } from "../components/button/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home(props: any) {
  const { data: session, status } = useSession();
  const  theme  = useContext(ThemeContext);
  return (
    <div
      className={`
        ${theme === "light" ? " bg-clrWhite" : "bg-clrGrey"}
      `}
    >
      <Head>
        <title>Share Your Thoughts</title>
        <meta
          name="description"
          content="Messaging app to share your thoughts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex m-auto h-screen w-[calc(100%-20px)] max-w-[800px] bg-blue-200">
        <div className="w-23">
          <div id="Hero" className="m-20 flex flex-col items-start gap-5">
            <span className="uppercase font-bold text-5xl">
              A home for
              <br />
              your thoughts
            </span>
            <p>Share your thoughts today, and edit them tomorrow</p>
            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link href="/api/auth/signout">
                  <PrimaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    ButtonValue="Sign Out"
                  ></PrimaryButton>
                </Link>
                <p className=" font-bold ">Signed in as {session.user?.name}</p>
              </div>
            ) : (
              <div>
                <p>Not signed in</p>
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
