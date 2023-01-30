import Link from "next/link";
import { PrimaryButton } from "./Button";
import { signIn } from "next-auth/react";

export const NotSignedIn = () => {
  return (
    <div className="w-full h-full col-span-4 p-6 items-start">
      <div className="flex flex-col justify-start items-start">
        <p className="font-bold mb-2">Sign in to get started.</p>

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
