import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faHeart,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  MessageDataType,
  MessageProps,
  MessageFunctions,
  FavoriteType,
  FavoriteKey,
  FormType,
  FormKey,
  ColorType,
  ColorKey,
} from "../../types/types";

export const List = ({
  messageData,
  deleteMessage,
  updateMessage,
}: MessageProps & MessageFunctions) => {
  const { data: session } = useSession();
  const username = session?.user?.name;
  // icon toggling
  const [toggleFavorite, setToggleFavorite] = useState<FavoriteType>({});
  const [colorFavorite, setColorFavorite] = useState<ColorType>(
    JSON.parse(localStorage.getItem("favorite")!)
  );
  // useEffect(() => {
  //   let color = JSON.parse(localStorage.getItem("favorite")!);
  //   if (color) {
  //     setColorFavorite(color);
  //   }
  // }, []);
  // get the id of the heart being toggled
  const handleFavoriteToggle = (id: FavoriteKey) => {
    setToggleFavorite({
      ...toggleFavorite,
      [id]: !toggleFavorite[id],
    });
    !toggleFavorite[id]
      ? setColorFavorite({
          ...colorFavorite,
          [id]: "text-red-600",
        })
      : setColorFavorite({
          ...colorFavorite,
          [id]: "text-[clrBlue]",
        });
  };
  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(colorFavorite));
  }, [colorFavorite]);

  // toggle update form
  const [toggleUpdate, setToggleUpdate] = useState<FormType>({});
  const handleFormToggle = (id: FormKey) => {
    setToggleUpdate({
      ...toggleUpdate,
      [id]: !toggleUpdate[id],
    });
  };
  // update form data
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    if (updatedMessage.length < 3) {
      setError("Message must be more than 3 characters");
    } else {
      updateMessage(id, updatedMessage);
      setError("");
      setSuccess("Message updated");
      setUpdatedMessage("");
    }
  };
  // message data mapped
  const messages = messageData.map((message: MessageDataType) => {
    return (
      <div key={message.id} className="">
        {/* first row */}
        <div className=" flex justify-between items-center text-clrHeader">
          <div className="flex items-center gap-2 ">
            <span className="h-6 w-6 rounded-xl bg-clrBlue inline-block">
              {session?.user?.image && (
                <Image
                  className="rounded-xl"
                  alt="User profile picture"
                  src={session?.user?.image}
                  height="40"
                  width="40"
                />
              )}
            </span>
            <span className="text-[14px]">{username}</span>
          </div>
          <div className="flex gap-2 border-solid border-2 p-1 cursor-pointer rounded border-slate-500">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => handleFormToggle(message.id)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteMessage(message.id)}
            />

            <FontAwesomeIcon
              icon={faHeart}
              className={` ${colorFavorite[message.id]}`}
              onClick={() => handleFavoriteToggle(message.id)}
            />
          </div>
        </div>
        {/* second row */}
        <div className="mt-4">
          <p className=" font-bold">{message.userMessage}</p>
        </div>

        <div className={clsx(toggleUpdate[message.id] ? "block" : "hidden")}>
          <hr className="m-[.5em] h-[.5px] bg-slate-500" />
          <form onSubmit={(e) => handleUpdate(e, message.id)}>
            <input
              className="p-2 w-full border border-1 border-clrBlack bg-transparent shadow-xl rounded-md"
              onChange={(e) => setUpdatedMessage(e.target.value)}
              type="text"
              value={updatedMessage}
              placeholder="Update Message"
            />
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>

        {/* third row */}
        <div className="mt-6 ">
          <p className="text-[9px]">
            {" "}
            {
              (new Date(message.date).toDateString(),
              new Date(message.date).toLocaleString())
            }
          </p>
        </div>
        <div className="my-6">
          <hr className="mx-[-2px] h-[1px] bg-slate-900" />
        </div>
      </div>
    );
  });
  return <>{messages}</>;
};
