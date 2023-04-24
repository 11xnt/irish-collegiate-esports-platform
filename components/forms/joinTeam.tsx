import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from "next-auth/react"
import useSWR	from 'swr';

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function JoinTeamForm({user}) {
  const { data, error } = useSWR(`/api/users/${user}/teams`, fetcher);
  const [name, setName] = React.useState("")
	const [formSuc, setFormSuc] = React.useState(false)
	const [value, setValue] = React.useState("b");

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
					email: user,
      }
			const dataJSON = JSON.stringify(data)

			fetch(e.target.action,
					{
							headers: {
									"Content-Type": "application/json",
							},
							body: dataJSON,
							method: 'POST'
					}).then(() => setFormSuc(true))
	}

	const handleChange = (e: React.ChangeEvent<any>) => {
			// const inputName = e.target.name
			const inputVal = e.target.value
			console.log(inputVal)
			setName(inputVal)

	}

	if(!data) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>

	// if (typeof window !== "undefined" && status !== "authenticated") return null;

	if(data) {
		const getTeams = (data: any) => {
			return data.map((e) => {
				return <option value={e.name}>{e.name}</option>
			});
		}
    return (
        <div className={styles.teamCard}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/tournaments/create`} method="POST" onSubmit={handleSubmit} key={"player"}>
                <label htmlFor="name">Select Team: </label>
                <select onChange={handleChange}>
									<option value="b">Select Team...</option>
									{getTeams(data.foundUserTeams.teams)}
								</select>
                <br/>
                <button type="submit">Join Tournament</button>
                <br/>
            </form>
						}
        </div>
    )
	}

}