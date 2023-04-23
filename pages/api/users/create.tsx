import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    // const parsed = JSON.parse(req.body)
    // if (session) {
        if (req.method === 'POST') {
            const data = req.body
            console.log(data)

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(data.password, salt)

            const newUser = await prisma.user.create({
                data: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                passwordSalt: salt,
                role: "user",
                },
            }).then(data => res.status(200).json(data));
            return
        } else {
            return res.status(404).json("could not create user")
        }
    // } else {
    //     return res.status(403).json("Access denied.")
    // }
}