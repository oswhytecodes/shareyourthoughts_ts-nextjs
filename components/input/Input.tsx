import { useState, useContext } from "react";
import { SecondaryButton } from "../button/Button";
import { ThemeContext } from "../../context/AppContext";
import { Session } from "inspector";

type UserDataType = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};
const Input = () => {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <section
      className={`
      ${
        theme === "light"
          ? "bg-clrWhite text-clrBlack"
          : "bg-clrGrey text-clrWhite"
      } 
      bg-clrGrey p-4 col-span-2 drop-shadow-md
    `}
    >
      {/* form */}
      <form
        className="m-2 flex flex-col items-center text-slate-900 "
        onSubmit={handleSubmit}
        action="submit"
      >
        <textarea
          className="p-2 h-40 border border-1 border-clrBlack bg-transparent shadow-xl rounded-md"
          placeholder="Add Message..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <div className="m-4 inline-block">
          <SecondaryButton
            onClick={() => {
              console.log("button click");
            }}
            ButtonValue="Submit"
          ></SecondaryButton>
        </div>
      </form>
    </section>
  );
};

export default Input;
