import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import NextCors from 'nextjs-cors';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  // const parsed = JSON.parse(req.body)
  if (session) {
    const orgId = req.query.organisers
    // console.log(orgId)
    if (req.method === 'GET') {
      // console.log(id)
      const foundOrg = await prisma.tournamentOrganiser.findUnique({
        where: {
          id: Number(orgId)
        }
      }).then(data => res.status(200).json(data))
      return

    } else {
        return res.status(404).json("not auth")
    }
  } else {
    return res.status(403).json("Access denied.")
  }
}