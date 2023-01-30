import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID } = req.query;
  const { id, message } = req.body;
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      try {
        const results = await prisma.user
          .findUnique({
            where: {
              id: session.userId,
            },
          })
          .messages({
            orderBy: {
              date: "desc",
            },
          });
        res.json(results);
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.method === "DELETE") {
      try {
        const results = await prisma.messages.delete({
          where: {
            id: id,
          },
        });
        res.json(results);
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.method === "PUT") {
      try {
        const results = await prisma.messages.update({
          where: {
            id: id,
          },
          data: {
            userMessage: message,
            // date: new Date()
          },
        });
        res.json(results);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}
