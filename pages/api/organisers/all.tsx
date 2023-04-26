import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const foundOrganisers = await prisma.tournamentOrganiser.findMany({})
        return res.status(200).json(foundOrganisers)
    } else {
        res.status(404).json("could not find organisers")
    }
}