import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prisma from '../../../lib/prisma'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  // const parsed = JSON.parse(req.body)
  if (session) {
    if (req.method === 'POST') {
        const data = req.body
        console.log(data)
        const newTour = await prisma.tournament.create({
            data: {
              name: data.name,
              prizePool: Number(data.prizePool),
              maxTeams: Number(data.maxTeams),
              createdAt: data.createdAt,
              minTeamSize: Number(data.minTeamSize),
              maxTeamSize: Number(data.maxTeamSize),
              eliGame: {
                connect: {
                  name: data.gameName,
                },
              },
              organiser: {
                connect: {
                  name: data.organiser,
                },
              },
            },
        }).then(data => res.status(200).json(data));
        return
    } else {
        return res.status(404).json("could not create tournament")
    }
  } else {
    return res.status(403).json("Access denied.")
  }
}