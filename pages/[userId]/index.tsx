import Input from "../../components/input/Input";
import Output from "../../components/output/Output";
import { ThemeContext } from "../../context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

export default function User(props: any) {
  const theme = useContext(ThemeContext);

  const { data: session } = useSession();
  // router
  const router = useRouter();
  const { userID } = router.query;
  const { mutate } = useSWRConfig();

  const createMessage = async (id?: string, message?: string) => {
    if (session) {
      {
        try {
          const body = { id, message, favorite: 0 };
          const response = await fetch(`/api/messages`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          mutate(`/api/messages/${userID}`);
        } catch (error) {
          return error;
        }
      }
    }
  };

  return (
    <section
      className={`
      ${theme === "light" ? "bg-white" : "bg-clrWhite"} 
      h-screen flex m-auto w-[calc(100%-20px)] max-w-[800px] 
      `}
    >
      <div className="w-full grid md:grid-cols-6 grid-cols-1">
        <Input createMessage={createMessage} />
        <Output />
      </div>
    </section>
  );
}
