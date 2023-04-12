import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'
import useSWR	from 'swr';

const gamesFetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())
const orgsFetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function TournamentForm({user}) {

  const { data: games, error: gamesError } = useSWR('/api/games/all', gamesFetcher);
  const { data: orgs, error: orgsError } = useSWR(`/api/users/${user}/orgs`, orgsFetcher);

  const [name, setTourName] = React.useState("")
  const [organiser, setOrganiser] = React.useState("")
  const [prizePool, setPrizePool] = React.useState()
  const [maxTeams, setMaxTeams] = React.useState()
  const [gameName, setEliGame] = React.useState("")
  const [minTeamSize, setMinTeamSize] = React.useState()
  const [maxTeamSize, setMaxTeamSize] = React.useState()

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
          minTeamSize: minTeamSize,
          maxTeamSize: maxTeamSize,
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
      else if (inputName==="maxTeamSize") {
        setMaxTeamSize(inputVal)
      }
      else if (inputName==="minTeamSize") {
        setMinTeamSize(inputVal)
      }
	}

  if(!games || !orgs) return <h1>Loading...</h1>
	if(gamesError || orgsError) return <h1>Error</h1>

  if(games && orgs) {
    // console.log(games);
    // console.log(orgs.ownerOf);
    const getGames = (games: any) => {
      return games.map((e) => {
        return <option value={e.name}>{e.name}</option>
      });
    }

    const getOrgs = (orgs: any) => {
      return orgs.ownerOf.map((e) => {
        return <option value={e.name}>{e.name}</option>
      });
    }
    return (
        <div className={styles.card}>
            {formSuc ? <h1>Success</h1> :
            <form action={`/api/tournaments/create`} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">Tournament Name:</label>
                <input type="text" id="name" required name="name" value={name} onChange={handleChange}/>
                <br/>

                {/* select from range of created orgs where the player is owner */}
                <label htmlFor="organiser">Organiser Name:</label>
                <select id="organiser" name="organiser" onChange={handleChange}>
									<option value="b">Select Tournament Organiser...</option>
									{getOrgs(orgs)}
								</select>
                <br/>

                <label htmlFor="prizePool">Prize Pool:</label>
                <input type="number" id="prizePool" required name="prizePool" value={prizePool} onChange={handleChange}/>
                <br/>

                <label htmlFor="maxTeams">Max Teams:</label>
                <input type="number" id="maxTeams" name="maxTeams" value={maxTeams} onChange={handleChange}/>
                <br/>

                <label htmlFor="gameName">Eligible Game:</label>
                <select id="gameName" name="gameName" onChange={handleChange}>
									<option value="b">Select Game...</option>
									{getGames(games)}
								</select>
                <br/>

                <label htmlFor="minTeamSize">Minimum Team Size:</label>
                <input type="number" id="minTeamSize" required name="minTeamSize" value={minTeamSize} onChange={handleChange}/>
                <br/>

                <label htmlFor="maxTeamSize">Maximum Team Size:</label>
                <input type="number" id="maxTeamSize" name="maxTeamSize" value={maxTeamSize} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
            }
        </div>
    )
  }
}