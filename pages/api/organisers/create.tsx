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
            // const parsed = JSON.parse(data.name)
            console.log(data)
            const newOrg = await prisma.tournamentOrganiser.create({
                data: {
                    // name: data.institute,
                    // captain : data.user,
                    // players: [data.user]
                    name: data.name,
                    description: data.desc? data.desc : "",
                    owner: {
                        connect: {
                            email: data.user
                        },
                    },
                    admins: {
                        connect: [{ email: data.user}]
                    },
                },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create org.")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}