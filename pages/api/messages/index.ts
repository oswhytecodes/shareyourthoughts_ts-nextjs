import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const { id, message, favorite } = req.body;
      const result = await prisma.messages.create({
        data: {
          userMessage: message,
          favorite: favorite,
          user: {
            connect: {
              id: id,
            },
          },
        },
      });
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if(req.method === "PUT") {
    try {
      
    } catch (error) {
      
    }
  }
}
