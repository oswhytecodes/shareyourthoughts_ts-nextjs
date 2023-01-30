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
      const { id, bio, username } = req.body;
      const result = await prisma.profile.create({
        data: {
          userId: id,
          bio: bio,
          username: username,
        },
      });
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
