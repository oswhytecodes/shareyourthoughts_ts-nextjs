import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { useSession, getSession, signIn } from "next-auth/react";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const session = getSession();
  const id = session?.userId;

  const results = await prisma?.messages.findMany({
    where: {
      userId: id,
    },
  });
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    }, // will be passed to the page component as props
  };
}
const Testing = ({
      results,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const messages = results.map((item) => {
    return <p key={item.id}>{item.userMessage}</p>;
  });
  return (
    <div className="p-6">
      <h1>Messages</h1>
      {messages}
    </div>
  );
};

export default Testing;
