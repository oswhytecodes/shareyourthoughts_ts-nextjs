import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

type Data = {}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  if (session) {
    const results = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });
    res.json(results);
  }
}
