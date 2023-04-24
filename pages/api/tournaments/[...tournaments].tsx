import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
      if (req.method === 'GET') {
        const tourId = req.query.tournaments
        const foundTour = await prisma.tournament.findUnique({
          where: {
            id: Number(tourId[0])
          },
          include: {
            partTeams: {
              include: {
                players: true
              }
            },
            organiser: true
          }
        }).then(data => res.status(200).json(data))
        return
      }

      if (req.method === 'POST') {
        const data = req.body
        if (req.query.tournaments.length === 1) {
          console.log(data)
          const newTour = await prisma.tournament.upsert({
              create: {
                name: data.tourName,
                organiser: data.organiser,
                prizePool: data.prizePool,
                maxTeams: data.maxTeams,
                eliGame: data.eliGame,
              },
              update: {},
              where: { name: data.tourName },
          }).then(data => res.status(200).json(data));
          return

        } else if(req.query.tournaments[1] === "join") {
          console.log(data)
          console.log(req.query.tournaments[0])
          const tourId = req.query.tournaments[0]
          const foundTour = await prisma.tournament.update({
            where: {
              id: Number(tourId)
            },
            data: {
              partTeams: {
                connect: {
                  name: data.teamName
                }
              }
            }
          }).then(data => res.status(200).json(data));
          return
        }
      }
    } else {
      return res.status(403).json("Access denied.")
    }
}