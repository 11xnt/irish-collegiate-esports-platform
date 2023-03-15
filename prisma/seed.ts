import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// async function main() {
//   const nativzSpring = await prisma.tournament.upsert({
//     create: {
//       name: "Nativz Spring",
//       organiser: "Nativz",
//       prizePool: 500,
//       maxTeams: 32,
//       eliGame: {
//         create: {
//           name: "CSGO"
//         }
//       },
//       partTeams: {
//         create: {
//           name: "SETU Val",
//         },
//       }
//     },
//     update: {},
//     where: { name: "Nativz Spring"}
//   })
//   const setuTeam = await prisma.team.upsert({
//     create: {
//       name: "SETU CSGO",
//     },
//     where: {
//       name: "SETU CSGO"
//     },
//     update: {}
//   })

//   console.log({ nativzSpring, setuTeam})
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })