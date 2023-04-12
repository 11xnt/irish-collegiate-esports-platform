import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const parsed = JSON.parse(req.body)
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        const userId = req.query.users
        if (req.method === 'GET') {
            if(req.query.users.length === 1) {
                const foundUser = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    }
            }).then(data => res.status(200).json(data))
            return
            } else if(req.query.users[1] === "orgs") {
                const foundOrgs = await prisma.user.findUnique({
                    where: {
                        id: userId[0]
                    },
                    include: {
                        ownerOf: true
                    },
            }).then(data => res.status(200).json(data))
            return
        } return

        } else {
            return res.status(404).json("not auth")
        }
    } else {
        return res.status(403).json("Access denied.")
    }
}