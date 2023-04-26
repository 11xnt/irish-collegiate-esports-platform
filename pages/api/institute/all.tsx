import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        const foundInstitutes = await prisma.institute.findMany({})
        return res.status(200).json(foundInstitutes)
    } else {
        res.status(404).json("could not find institutes")
    }
}