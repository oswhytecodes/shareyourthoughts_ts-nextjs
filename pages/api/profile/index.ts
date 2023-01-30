import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  try {
    const results = await prisma.profile.findFirst({
      where: {
        userId: session?.userId,
      },
    });
    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
}
