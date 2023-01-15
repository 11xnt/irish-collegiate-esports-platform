import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const parsed = JSON.parse(req.body)
    if (req.method === 'POST') {
        res.status(200).json("auth")
    } else {
        res.status(404).json("not auth")
    }
}