import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from "next-auth/react"

export default function TeamForm({user}) {

  const [name, setName] = React.useState("")
	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
					user: user
      }
			const dataJSON = JSON.stringify(data)
			// const data2 = JSON.parse(data)*/
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
			const inputName = e.target.name
			const inputVal = e.target.value

			if (inputName === "name") {
					setName(inputVal)
			}
	}

    return (
        <div className={styles.teamCard}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/teams/create`} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">Team Name: </label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
						}
        </div>
    )
}