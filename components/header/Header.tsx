import Link from "next/link";
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
  const theme = useContext(ThemeContext);
  // dark mode toggle
  const [toggle, setToggle] = useState(true);
  const handleClick = () => {
    theme?.setTheme((prev: string) => (prev === "light" ? "dark" : "light"));
    setToggle((prev: boolean) => !prev);
  };
  // session
  const { status } = useSession();
  return (
    <header
      className={`
      ${theme?.theme === "light" ? "bg-clrHeader" : "bg-clrBlack"}

      text-clrWhite
      `}
    >
      <nav className="flex justify-between p-4 m-auto max-w-[800px]">
        <span className="uppercase font-bold">Share Your Thoughts</span>
        <div>
          <ul className="flex gap-6">
            <li className="cursor-pointer">
              <Link href="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className="cursor-pointer">
              <Link href="/user">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li onClick={handleClick} className="cursor-pointer">
              {theme.theme === "light" ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </li>
            <div>
              {status === "authenticated" ? (
                <li className="uppercase font-bold">Sign Out</li>
              ) : (
                <li className="uppercase font-bold">Sign In</li>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}
