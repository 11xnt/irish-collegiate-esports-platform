import React from 'react'
import styles from '../../styles/Home.module.css'

export default function UserForm() {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

	const [formSuc, setFormSuc] = React.useState(false)

	const handleSubmit = (e: React.ChangeEvent<any>) => {
			e.preventDefault()
			const data = {
          name: name,
          email: email,
          password: password,
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
			} else if (inputName === "email") {
          setEmail(inputVal)
      } else if (inputName === "password") {
          setPassword(inputVal)
      }
	}

    return (
      <div className={styles.card}>
			  {formSuc ? <h1>Success</h1> :
				  <form action={`/api/users/create`} method="POST" onSubmit={handleSubmit}>
                <label htmlFor="name">User Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange}/>
                <br/>

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={email} onChange={handleChange}/>
                <br/>

                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" value={password} onChange={handleChange}/>
                <br/>

                <button type="submit">Submit</button>
                <br/>
          </form>
			  }
        </div>
    )
}