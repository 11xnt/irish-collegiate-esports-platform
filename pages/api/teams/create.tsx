import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        if (req.method === 'POST') {
            const data = req.body
            console.log(data)

            // find player by email and connect to team
            // const foundPlayer = await prisma.player.findUnique({
            //     where: {
            //         user: {
            //             email: data.user
            //         },
            //     },
            //     include: {
            //         user: true
            //     }
            // });
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
                            // Player
                        }
                    },
                    players: {
                        connect: [{ id: foundPlayer.id}]
                        // Player
                    }
                },
                // data: {
                //     // name: data.institute,
                //     // captain : data.user,
                //     // players: [data.user]
                //     user: {
                //         connect: {
                //             email: data.email
                //         },
                //     },
                //     institute: {
                //         connect: {
                //             name: data.name
                //         },
                //     },
                // },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create team")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}

// team name + set captain to user + add user to players