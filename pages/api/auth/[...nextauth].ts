import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()


export default NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Your authentication logic goes here
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
        }) as any

        if (!user) {
          throw new Error("Can't find email or password")
        }
        
        console.log(credentials.password)
        console.log(user.password)
        // const hash = await bcrypt.hash(credentials.password, 10)


        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordValid) {
          throw new Error('Invalid email or password')
        }

        return { id: user.id, email: user.email}
      }
    }),
  ],
  // database: process.env.DATABASE_URL,
  // session: {
  //   jwt: true
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET
  // }
})

        // const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        // if (!isValidPassword) {
        //   throw new Error('Invalid password');
        // }

        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        // return { ...user, token };
  //     }
  //   }),
  // ],
  // jwt: {},
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl
  //   },
  //   async session({ session, user, token }) {
  //     return session
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.id = profile.id
  //     }
  //     return token
  //   }
  // },
// }),
// })