import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const router = useRouter();
  return (
    <section
      className=" bg-clrBlack mt-10 h-60 absolute w-full m-auto max-w-[450px] inline-block
    "
    >
      <div className="">
        <div className="flex flex-col items-center gap-4 ">
          <div className="w-full px-4 py-2 justify-between items-center flex gap-4 bg-clrHeader text-clrWhite">
            <h1 className="bold text-xl uppercase">Profile Page</h1>
            <FontAwesomeIcon
              className="text-clrWhite p-2 text-[18px] cursor-pointer hover:text-clrWhite"
              onClick={() => router.back()}
              icon={faX}
            />
          </div>
          <div>
            <form className="flex gap-3" action="submit">
              <label className="text-clrWhite" htmlFor="username">
                UserName
              </label>
              <input type="text" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
