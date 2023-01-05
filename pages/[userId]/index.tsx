import Input from "../../components/input/Input";
import Output from "../../components/output/Output";
import { ThemeContext } from "../../context/AppContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function User(props) {
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState("");
  // router
  const router = useRouter();
  const { userId } = router.query;

  // swr
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR("/api/users", fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  // data
  // const user: string = data.id;
  const user: string = data.map((user) => user.id);

  const createMessage = async (userId?: string, message?: string) => {
    try {
      const body = { userId, message, favorite: 0 };
      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    createMessage(user[0], message);
    console.log(user[0], message);
  };
  return (
    <section
      className={`
      ${theme === "light" ? "bg-white" : "bg-clrWhite"} 
      h-screen flex m-auto w-[calc(100%-20px)] max-w-[800px] 
      `}
    >
      <div className="w-full grid md:grid-cols-6 grid-cols-1">
        <Input
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
        />
        <Output 
          user={user}
        />
      </div>
    </section>
  );
}

// type UserDataType = {
//   name?: string | null | undefined;
//   email?: string | null | undefined;
//   image?: string | null | undefined;
// };


      {
        /* <div className="w-full p-6">
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={message || ""}
            className="p-3 mb-5"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="py-3 px-4 bg-red-300" type="submit">
            submit
          </button>
        </form>
      </div> */
      }
