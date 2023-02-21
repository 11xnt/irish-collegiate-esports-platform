import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body
        console.log(data)
        const newTour = await prisma.tournament.create({
            data: {
              name: data.name,
              organiser: data.organiser,
              prizePool: parseInt(data.prizePool),
              maxTeams: parseInt(data.maxTeams),
              createdAt: data.createdAt,
            //   gameName: data.gameName,
              // gameName: data.eliGame,
              // partTeams: {
              //   create: {
              //     name: "SETU Val",
              //   },
              // }
            },
        }).then(data => res.status(200).json(data));
        return
    } else {
        return res.status(404).json("could not create tournament")
    }
}