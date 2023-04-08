import React from "react"
import { InferGetServerSidePropsType } from "next"
import { getGlobalCommands } from "services/discord"
//createGlobalCommand
export const getServerSideProps = async () => {
    // await createGlobalCommand({
    //     name: "randompic",
    //     description: "Get a random picture",
    //     options: [
    //         {
    //             name: "type",
    //             description: "What type of picture would you like?",
    //             type: 3,
    //             required: true,
    //             choices: [
    //                 {name: "cat", value: "cat"},
    //                 {name: "dog", value: "dog"},
    //                 {name: "generic", value: "picsum"},
    //             ],
    //         },
    //     ],
    //     type: "C:/Users/allen/WebstormProjects/fypdemo/fypdemo/node_modules/discord-api-types/payloads/v8/_interactions/applicationCommands".ChatInput,
    //     version: ""
    // })
    //
    // @ts-ignore
    await createGlobalCommand({
        name: "verify",
        description: "Finds a user in the database that is linked to your discord account",
        // @ts-ignore
        type: "C:/Users/allen/WebstormProjects/fyp/node_modules/discord-api-types/payloads/v8/_interactions/applicationCommands".ChatInput,
        version: ""
    })
    try {
        const { data } = await getGlobalCommands()
        return { props: { data } }
    } catch (err) {
        console.error(err)
        return { props: { data: null } }
    }
}



const IndexPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <h1>Dashboard</h1>
            {data && data.length > 0 ? (
                <div>
                    <h3>All commands</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>description</th>
                            <th>default permission</th>
                            <th>options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((command) => (
                            <tr key={command.id}>
                                <td>{command.id} </td>
                                <td>{command.name} </td>
                                <td>{command.description} </td>
                                <td>{String(command.default_permission)}</td>
                                <td>{command.options ? <div>{JSON.stringify(command.options[0])}</div> : "No options"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                "No commands found"
            )}
        </div>
    )
}

export default IndexPage