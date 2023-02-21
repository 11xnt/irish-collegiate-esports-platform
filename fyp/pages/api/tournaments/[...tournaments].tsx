import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const parsed = JSON.parse(req.body)
    if (req.method === 'GET') {
      const tourId = req.url
      console.log(tourId)
      const id = tourId?.slice(17)
      // console.log(id)
      const foundTour = await prisma.tournament.findUnique({
        where: {
          id: Number(id)
        }
      }).then(data => res.status(200).json(data))
      return
    }

    if (req.method === 'POST') {
        const data = req.body
        console.log(data)
        const newTour = await prisma.tournament.upsert({
            create: {
              name: data.tourName,
              organiser: data.organiser,
              prizePool: data.prizePool,
              maxTeams: data.maxTeams,
              eliGame: data.eliGame,
              // partTeams: {
              //   create: {
              //     name: "SETU Val",
              //   },
              // }
            },
            update: {},
            where: { name: data.tourName },
        }).then(data => res.status(200).json(data));
        return
    }

    else {
        return res.status(404).json("not auth")
    }
}