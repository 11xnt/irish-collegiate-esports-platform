import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const foundTours = await prisma.tournament.findMany({
            include: {
                organiser: true
                }
        })
        return res.status(200).json(foundTours)
    } else {
        res.status(404).json("could not find tours")
    }
}