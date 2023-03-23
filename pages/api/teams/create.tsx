import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        if (req.method === 'POST') {
            const data = req.body
            console.log(data)
            const newTeam = await prisma.team.create({
                data: {
                    name: data.name,
                    captain : data.captain,
                },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create team")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}