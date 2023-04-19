import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { customAlphabet } from "nanoid"
import { APIApplicationCommandInteraction, APIEmbed, APIInteractionResponse } from "discord-api-types/v10"
import withDiscordInteraction from '../../middlewares/discord-interactions'
import withErrorHandler from "../../middlewares/error-handler"
import { PrismaClient } from "@prisma/client"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../lib/prisma"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz-", 16)
// const prisma = PrismaAdapter(prisma);


const BASE_RESPONSE = { type: 4 }
const INVALID_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "Oops! I don't recognize this command." } }

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
    api: {
        bodyParser: false,
    },
}

const handler = async (
    _: NextApiRequest,
    res: NextApiResponse<APIInteractionResponse>,
    interaction: APIApplicationCommandInteraction
) => {
    const {
        // @ts-ignore
        data: { name, options },
    } = interaction

    let discordId = interaction.member.user.id.toString()

    switch (name) {
        case "verify" : {
            const foundAccount = await prisma.account.findUniqueOrThrow({
                where: {
                    provider_providerAccountId: {
                        providerAccountId: discordId,
                        provider: 'discord'
                    }
                }
            })
            console.log(foundAccount)

            const foundUser = await prisma.user.findUnique({
                where: {
                    id: foundAccount.userId
                }
            })
            console.log(foundUser)

            if(foundAccount !== null || foundUser !== null) {
                // @ts-ignore
                return res.status(200).json({ ...BASE_RESPONSE, data: { content: JSON.stringify(foundUser.username) } })
            } else {
                // @ts-ignore
                return res.status(200).json({ ...BASE_RESPONSE, data: {
                    content: "User not found. Please sign up at: https://irish-collegiate-esports.azurewebsites.net and connect your Discord account." }
                })
            }
        }
        case "ping": {
            // @ts-ignore
            return res.status(200).json({ ...BASE_RESPONSE, data: { content: "Pong"} })
        }

        default:
            return res.status(200).json(INVALID_COMMAND_RESPONSE)
    }
}

export default withErrorHandler(withDiscordInteraction(handler))
