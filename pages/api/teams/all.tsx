import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const foundTeams = await prisma.team.findMany({
            include: {
                players: true,
            }
        })
        return res.status(200).json(foundTeams)
    } else {
        res.status(404).json("could not find teams")
    }
}