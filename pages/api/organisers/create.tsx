import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        if (req.method === 'POST') {
            const data = req.body
            const newOrg = await prisma.tournamentOrganiser.create({
                data: {
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