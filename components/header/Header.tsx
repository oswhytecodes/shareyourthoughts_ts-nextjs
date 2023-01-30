import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import Router, { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeContext } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  // dark mode toggle
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
    setToggle((prev: boolean) => !prev);
  };
  // session
  const { data: session, status } = useSession();

  const router = useRouter();
  const { userID } = router.query;
  return (
    <header
      className={clsx(
        theme === "light" ? "bg-clrHeader" : "bg-clrBlack",
        " text-clrWhite"
      )}
    >
      <nav className="flex justify-between items-center p-4 m-auto max-w-[800px]">
        <Link href="/">
          <span 
          title="Home Page"
          className="uppercase font-bold hidden md:flex">
            Share Your Thoughts
          </span>
          <Image
            className="sm:flex md:hidden"
            src="/favicon.png"
            width="40"
            height="40"
            alt="logo"
          ></Image>
        </Link>
        <div>
          <ul className="flex gap-6">
            <li className="cursor-pointer">
              {
                <Link href={`/${userID}`}>
                  <FontAwesomeIcon 
                  // title="Messages"
                  icon={faHome} />
                </Link>
              }
            </li>
            <li className="cursor-pointer">
              <Link href={session ? `/${userID}/profile` : `/`}>
                <FontAwesomeIcon
                // title="User Profile"
                icon={faUser} />
              </Link>
            </li>
            <li onClick={handleClick} className="cursor-pointer">
              {theme === "light" ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </li>
            <div>
              {status === "authenticated" ? (
                <Link href="/api/auth/signout" className="uppercase font-bold">
                  Sign Out
                </Link>
              ) : (
                <Link href="api/auth/signin" className="uppercase font-bold">
                  Sign In
                </Link>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
