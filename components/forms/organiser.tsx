import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from "next-auth/react"

export default function OrganiserForm({user}) {

  const [name, setName] = React.useState("")
	const [desc, setDesc] = React.useState("")
	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
					desc: desc,
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
			} else if( inputName === "desc") {
					setDesc(inputVal)
			}
	}

    return (
        <div className={styles.orgCard}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/organisers/create`} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">Organiser Name: </label>
                <input type="text" id="name" required name="name" value={name} onChange={handleChange}/>
                <br/><br/>
								<label htmlFor="name">Description: </label>
                <textarea type="text" rows={4} cols={50} id="desc" name="desc" value={desc} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
						}
        </div>
    )
}