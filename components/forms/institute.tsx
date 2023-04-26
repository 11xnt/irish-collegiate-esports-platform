import React from 'react'
import styles from '../../styles/Home.module.css'

export default function InstituteForm() {

  const [name, setName] = React.useState("")
  const [abbrev, setAbbrev] = React.useState("")
  const [domain, setDomain] = React.useState("")

	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
          abbrev: abbrev,
          domain: domain
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
		const inputName = e.target.name
		const inputVal = e.target.value

	    if (inputName === "name") {
			setName(inputVal)
		} else if (inputName === "abbrev") {
          	setAbbrev(inputVal)
        } else if (inputName === "domain") {
			setDomain(inputVal)
        }
	}

    return (
        <div className={styles.card}>
				{formSuc ? <h1>Success</h1> :
				<form action={`/api/institute/create`} method="POST" onSubmit={handleSubmit}>

                <label htmlFor="name">Institute Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <br/>

                <label htmlFor="abbrev">Institute Abbreviation:</label>
                <input type="text" id="abbrev" name="abbrev" value={abbrev} onChange={handleChange}/>
                <br/>

				<label htmlFor="domain">Institute Domain (@example.ie):</label>
                <input type="text" id="domain" name="domain" value={domain} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
            </form>
			}
        </div>
    )
}