import { useContext, useState } from "react";
import { SecondaryButton } from "../button/Button";
import { ThemeContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import { CreateMessageProps } from "../../types/types";
import clsx from "clsx";

const Input = ({ createMessage }: CreateMessageProps) => {
  const { theme } = useContext(ThemeContext);
  const { data: session, status } = useSession();

  // nextjs will not accept:  // const id = session?.user.userId;
  const id = session?.userId;

  // error on input
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length < 3 && session) {
      setError("Message is too short");
    } else if (!session) {
      setError("You are not signed in.");
      setMessage("")
    } else {
      setMessage("");
      setError("");
      createMessage(id, message);
    }
  };
  return (
    <section
      className={clsx(
        theme === "light"
          ? "bg-clrWhite text-clrBlack"
          : "bg-clrGrey text-clrWhite",
        "bg-clrGrey col-span-2 md:row-span-6 row-span-2 drop-shadow-md md:h-full "
      )}
    >
      {/* form */}
      <form
        className="py-2 flex flex-col items-center text-slate-900 "
        onSubmit={handleSubmit}
        action="submit"
      >
        <textarea
          className="p-2 h-40 border border-1 border-clrBlack bg-transparent shadow-xl rounded-md"
          placeholder="Add Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message || ""}
        />
        <div>
          <p className="text-red-600">{error}</p>
        </div>
        <div className="mt-4 inline-block">
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
