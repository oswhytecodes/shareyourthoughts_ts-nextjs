import Link from "next/link";
import { PrimaryButton } from "./Button";
import { signIn } from "next-auth/react";

export const NotSignedIn = () => {
  return (
    <div className="w-full col-span-4 p-6">
      <div className="flex flex-col">
        You are not signed in.
        <Link href="/api/auth/signin">
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            ButtonValue="Sign In"
          />
        </Link>
      </div>
    </div>
  );
};