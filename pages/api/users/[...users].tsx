import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const parsed = JSON.parse(req.body)
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    if (session) {
        if (req.method === 'POST') {
            res.status(200).json("auth")
        } else {
            res.status(404).json("not auth")
        }
    } else {
        res.status(403).json("Access denied.")
    }
}