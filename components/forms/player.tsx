import React from 'react'
import styles from '../../styles/Home.module.css'
import useSWR	from 'swr';

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

export default function PlayerForm({user}) {

  const { data, error } = useSWR('/api/institute/all', fetcher);

  const [name, setName] = React.useState("")
	const [formSuc, setFormSuc] = React.useState(false)

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
			setName(inputVal)

	}

	if(!data) return <h1>Loading...</h1>
	if(error) return <h1>Error</h1>

	// if (typeof window !== "undefined" && status !== "authenticated") return null;

	if(data) {
		const getInstitutes = (data: any) => {
			return data.map((e) => {
				return <option value={e.name}>{e.name}</option>
			});
		}
    return (
        <div className={styles.teamCard}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/players/create`} method="POST" onSubmit={handleSubmit} key={"player"}>
                <label htmlFor="name">Select Institute: </label>
                <select onChange={handleChange}>
									<option value="b">Select Institute...</option>
									{getInstitutes(data)}
								</select>
                <br/>
                <button type="submit">Submit</button>
                <br/>
            </form>
						}
        </div>
    )
	}

}