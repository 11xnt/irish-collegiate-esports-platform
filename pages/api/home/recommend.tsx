import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import NextCors from 'nextjs-cors';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // await NextCors(req, res, {
    //     // Options
    //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //     origin: '*',
    //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //     });
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        if (req.method === 'GET') {

            const foundTours = await prisma.tournament.findMany({
                take: 3,
            })

            const foundTeams = await prisma.team.findMany({
                take: 6,
            })

            return res.status(200).json({foundTours: foundTours, foundTeams: foundTeams})

        } else {
            res.status(404).json("could not find teams or tournaments")
        }
    } else {
        res.status(403).json("Access denied.")
    }
}