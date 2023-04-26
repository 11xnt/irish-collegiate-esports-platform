import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        if (req.method === 'POST') {
            const data = req.body
            const foundUser = await prisma.user.findUnique({
                where: {
                    email: data.user
                }
            });

            const foundPlayer = await prisma.player.findUnique({
                where: {
                    userId: foundUser.id
                }
            });

            const newTeam = await prisma.team.create({
                data: {
                    name: data.name,

                    captain: {
                        connect: {
                            id: foundPlayer.id
                        }
                    },
                    players: {
                        connect: [{ id: foundPlayer.id}]
                    }
                },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create team")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}