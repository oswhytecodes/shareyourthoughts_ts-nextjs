import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID } = req.query;
  const session = await getSession({ req });
  if (session) {
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
  }
}
