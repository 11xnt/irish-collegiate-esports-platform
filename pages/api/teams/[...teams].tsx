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

  // await NextCors(req, res, {
  //   // Options
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  //   origin: '*',
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //   });
    // const parsed = JSON.parse(req.body)
    const teamId = req.url
    console.log(teamId)
    const id = teamId?.slice(11)
    if (req.method === 'GET') {
      // console.log(id)
      const foundTeam = await prisma.team.findUnique({
        where: {
          id: Number(id)
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