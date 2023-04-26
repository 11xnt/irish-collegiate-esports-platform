import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
        if (req.method === 'POST') {
            const data = req.body

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
}