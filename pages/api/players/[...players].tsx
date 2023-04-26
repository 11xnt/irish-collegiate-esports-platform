import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        const userId = req.query.players
        if (req.method === 'GET') {
            if(userId.length === 1) {
                const foundUser = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    }
            }).then(data => res.status(200).json(data))
            return
            } else if(userId[1] === "teams") {
                const foundPlayer = await prisma.player.findUnique({
                    where: {
                        id: parseInt(userId[0])
                    },
                    include: {
                        teams: {
                            include: {
                                players: true,
                            },
                        },
                        user: true,
                        institute: true,
                    },
                })
                return res.status(200).json(foundPlayer)
            }
            return

        } else {
            return res.status(404).json("not auth")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}