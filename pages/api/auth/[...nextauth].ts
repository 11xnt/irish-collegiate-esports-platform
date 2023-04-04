import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "../../../lib/prisma"

// const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
        }) as any

        if (!user) {
          throw new Error("Can't find email or password")
        }


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
    DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 5 * 60 * 1000,
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   // if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // // Allows callback URLs on the same origin
    //   // else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },

    session: async ({ session, token }) => {
      const customSession = session;
      const getUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          accounts: {
            select: {
              provider: true,
              providerAccountId: true,
            },
          },
        },
      });

      customSession.user.discord = getUser.accounts.filter((account) => {
        return account.provider === "discord";
      })[0]?.providerAccountId;

      token.user = customSession.user;

      return customSession
    },
  //   jwt: ({token, user}) => {
  //     if(user){
  //       token.discord = user.discord;
  //       }
  //     return Promise.resolve(token)
  // },
  },

  // database: process.env.DATABASE_URL,
  // session: {
  //   jwt: true
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET
  // }
}

export default NextAuth(authOptions)