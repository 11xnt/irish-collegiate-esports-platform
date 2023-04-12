// import type { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from "@prisma/client"
// import prisma from '../../../lib/prisma'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../auth/[...nextauth]'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions)
//   // const parsed = JSON.parse(req.body)
//   if (session) {
//     if (req.method === 'GET') {
//         const foundUser = await prisma.user.findUnique({
//             where: {
//                 // email: parsed.email
//             },
//             include: {
//               ownerOf: true,
//             },
//         })
//         return res.status(200).json(foundUser)
//     } else {
//         res.status(404).json("could not find user")
//     }
//   } else {
//     return res.status(403).json("Access denied.")
//   }
// }