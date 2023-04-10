import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from "next-auth/react"
import useSWR	from 'swr';

const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

function add(theForm: any, key: any, value: any, institutes: any) {
	console.log(institutes.foundInstitutes);
	// Create a hidden input element, and append it to the form:
	var br = document.createElement('br');
	br.id = 'br2';


	var label = document.createElement('label');
	label.htmlFor = key;
	label.innerHTML = "Institute: ";
	label.id = "Institute2";
	var input = document.createElement('select');
	// input.type = 'hidden';
	input.name = key; // 'the key/name of the attribute/field that is sent to the server
	input.value = value;
	input.id = key;

	// institutes.map((institute: any) => {
	//   var option = document.createElement('option');
	//   option.value = institute.name;
	//   option.innerHTML = institute.name;
	//   input.appendChild(option);
	// })

	for(let i = 0; i < institutes.foundInstitutes.length; i++) {
		var option = document.createElement('option');
		option.value = institutes.foundInstitutes[i].name;
		option.innerHTML = institutes.foundInstitutes[i].name;
		input.options.add(option);
	}
}

export default function PlayerForm({user}) {

  // const [institutes, setInstitutes] = React.useState([])

  const { data, error } = useSWR('/api/institute/all', fetcher);

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
		function getInstitutes(data: any) {
			// console.log(data[0])
			return data.map((e) => {
				return <option value={e.name}>{e.name}</option>
			});
			// for(let i = 0; i < data.length; i++) {
			// 	return <option value={data[i.name]}>{data[i].name}</option>
			// }
		}
    return (
        <div className={styles.teamCard}>
						{formSuc ? <h1>Success</h1> :
						<form action={`/api/players/create`} method="POST" onSubmit={handleSubmit} key={"player"}>
                <label htmlFor="name">Select Institute: </label>

                <select
								onChange={handleChange}
									>
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