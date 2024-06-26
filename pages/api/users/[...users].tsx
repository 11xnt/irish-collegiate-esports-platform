import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
        const userId = req.query.users
        if (req.method === 'GET') {
            if(req.query.users.length === 1) {
                const foundUser = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    },
                    include: {
                        playerID: true,
                    }
                }).then(data => res.status(200).json(data))
                return

            } else if(req.query.users[1] === "orgs") {
                const foundOrgs = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    },
                    include: {
                        ownerOf: true
                    },
                }).then(data => res.status(200).json(data))
                return
            } else if(req.query.users[1] === "teams") {
                const foundUser = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    }
                })

                const foundUserTeams = await prisma.player.findUnique({
                    where: {
                        userId: foundUser.id
                    },
                    include: {
                        teams: {
                            include: {
                                players: true,
                            },
                        },
                        institute: true
                    }
                })

                return res.status(200).json({foundUserTeams, foundUser})
            } return
        } else {
            return res.status(404).json("user not found")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}