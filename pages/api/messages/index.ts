import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const {userId, message, favorite } = req.body;
      const result = await prisma.messages.create({
        data: {
          userMessage: message,
          favorite: favorite,
          user: {
            connect: {
              id: userId
            }
          },
        },
      });
      res.json(result);
    } catch (error) {
      // res.status(500).json(error);
      console.log(error);
    }
  } else if (req.method === "GET") {
    try {
      const messages = await prisma.messages.findMany();
      res.json(messages);
    } catch (error) {
      // res.status(500).json(error);
      console.log(error);
    }
  }
}

// // Optional fields in body: content
// export default async function handle(req, res) {
//   const { title, content } = req.body;

//   const session = await getSession({ req });
//   const result = await prisma.post.create({
//     data: {
//       title: title,
//       content: content,
//       author: { connect: { email: session?.user?.email } },
//     },
//   });
//   res.json(result);
// }
