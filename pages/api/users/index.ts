import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type Data = {}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = await prisma.user.findMany();
  res.json(users);
}
