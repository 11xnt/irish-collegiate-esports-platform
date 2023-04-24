import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        if (req.method === 'GET') {

            const foundTours = await prisma.tournament.findMany({
                take: 3,
                include: {
                    organiser: true
                }
            })

            const foundTeams = await prisma.team.findMany({
                take: 6,
                include: {
                    players: true
                }
            })

            return res.status(200).json({foundTours, foundTeams})

        } else {
            res.status(404).json("could not find teams or tournaments")
        }
    } else {
        res.status(403).json("Access denied.")
    }
}