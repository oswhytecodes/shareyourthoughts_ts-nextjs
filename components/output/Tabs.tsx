import clsx from "clsx";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/AppContext";

export const Tabs = () => {
  const { theme } = useContext(ThemeContext);
  const [toggleTab, setToggleTab] = useState(1);
  // filter tab
  const handleTab = (n: number) => {
    setToggleTab(n);
  };
  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 bg-white border-b-2 border-clrHeader">
        <button
          onClick={() => setToggleTab(1)}
          className={clsx(
            "p-2 border-r border-r-1 border-clrHeader",
            toggleTab === 1
              ? theme === "light"
                ? "bg-clrHeader text-clrWhite"
                : "bg-clrBlack text-clrWhite"
              : "bg-white text-clrBlack"
          )}
        >
          Messages
        </button>
        <button
          className={clsx(
            "p-2  border-r border-r-1 border-clrHeader",
            toggleTab === 2
              ? theme === "light"
                ? "bg-clrHeader text-clrWhite"
                : "bg-clrBlack text-clrWhite"
              : "bg-white"
          )}
          onClick={() => setToggleTab(2)}
        >
          Favorites
        </button>
        <button
          className={clsx(
            "p-2 ",
            toggleTab === 3
              ? theme === "light"
                ? "bg-clrHeader text-clrWhite"
                : "bg-clrBlack text-clrWhite"
              : "bg-white text-clrBlack"
          )}
          onClick={() => setToggleTab(3)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
