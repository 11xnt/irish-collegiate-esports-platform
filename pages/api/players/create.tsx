import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        if (req.method === 'POST') {
            const data = req.body
            const newPlayer = await prisma.player.create({
                data: {
                    user: {
                        connect: {
                            email: data.email
                        },
                    },
                    institute: {
                        connect: {
                            name: data.name
                        },
                    },
                },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create player")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}