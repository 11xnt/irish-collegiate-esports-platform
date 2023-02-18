import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body
        console.log(data)
        const newUser = await prisma.user.create({
            data: {
              name: data.name,
              email: data.email,
              password: data.password
            },
        }).then(data => res.status(200).json(data));
    } else {
        res.status(404).json("could not create user")
    }
}