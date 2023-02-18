import React from 'react'
import styles from '../../styles/Home.module.css'

export default function GameForm() {

  const [name, setName] = React.useState("")
  const [abbrev, setAbbrev] = React.useState("")

	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
          abbrev: abbrev,
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
			} else if (inputName === "abbrev") {
          setAbbrev(inputVal)
      }
	}

    return (
        <div className={styles.card}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/games/create`} method="POST" onSubmit={handleSubmit}>

                <label htmlFor="name">Game Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <br/>

                <label htmlFor="abbrev">Game Abbreviation:</label>
                <input type="text" id="abbrev" name="abbrev" value={abbrev} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
						}
        </div>
    )
}