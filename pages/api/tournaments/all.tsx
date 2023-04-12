import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const foundTours = await prisma.tournament.findMany({})
        return res.status(200).json(foundTours)
    } else {
        res.status(404).json("could not find tours")
    }
}