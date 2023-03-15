import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'

export default function TournamentForm() {

  const [name, setTourName] = React.useState("")
  const [organiser, setOrganiser] = React.useState("")
  const [prizePool, setPrizePool] = React.useState()
  const [maxTeams, setMaxTeams] = React.useState()
  const [gameName, setEliGame] = React.useState("")

	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
          organiser: organiser,
          prizePool: prizePool,
          maxTeams: maxTeams,
          createdAt: new Date(),
          gameName: gameName,
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
					setTourName(inputVal)
			}
			else if (inputName === "organiser") {
					setOrganiser(inputVal)
			}
			else if (inputName==="prizePool") {
					setPrizePool(inputVal)
			}
      else if (inputName==="maxTeams") {
        setMaxTeams(inputVal)
    }
      else if (inputName==="gameName") {
        setEliGame(inputVal)
    }
	}

    // const router = useRouter()
    // const currentRoute = router.pathname
    // console.log(currentRoute)

    return (
        <div className={styles.card}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/tournaments/create`} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">Tournament Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <br/>

                <label htmlFor="organiser">Organiser Name:</label>
                <input type="text" id="organiser" name="organiser" value={organiser} onChange={handleChange}/>
                <br/>

                <label htmlFor="prizePool">Prize Pool:</label>
                <input type="number" id="prizePool" name="prizePool" value={prizePool} onChange={handleChange}/>
                <br/>

                <label htmlFor="maxTeams">Max Teams:</label>
                <input type="number" id="maxTeams" name="maxTeams" value={maxTeams} onChange={handleChange}/>
                <br/>

                <label htmlFor="gameName">Eligible Game:</label>
                <input type="text" id="gameName" name="gameName" value={gameName} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
						}
        </div>
    )
}