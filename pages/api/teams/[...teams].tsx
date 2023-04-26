import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  // const parsed = JSON.parse(req.body)
  if (session) {
    const teamId = req.query.teams
    if (req.method === 'GET') {
      if(teamId.length === 1) {
        const foundTeam = await prisma.team.findUnique({
          where: {
            id: Number(teamId[0])
          },

          include: {
            players: {
              include: {
                user: {
                  include: {
                    playerID : {
                      include: {
                        institute: true
                      },
                    },
                  },
                },
              },
            },
            partTour: true,
            captain: {
              include: {
                user: true
              }
            },
        },

        }).then(data => res.status(200).json(data))
        return
    } else {
        return res.status(404).json("not auth")
    }
  } else if (req.method === 'POST') {
    if(teamId[1] === "join") {

      const foundUser = await prisma.user.findUnique({
        where: {
            id: teamId[2]
        }, include: {
          playerID: true,
        }
      })

      const joinTeam = await prisma.team.update({
        where: {
          id: Number(teamId[0])
        },
        data: {
          players: {
            connect: {
              id: foundUser.playerID.id
            }
          }
        }
      }).then(data => res.status(200).json(data))
      return
    } else {
      return res.status(404).json("not auth")
    }
  } else {
    return res.status(404).json("not auth")
  }
}
}