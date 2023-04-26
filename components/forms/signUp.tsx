
import React from 'react'

export default function SignUpForm() {

    const [username, setUsername] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [formSuc, setFormSuc] = React.useState(false)

    const handleSubmit = (e: React.ChangeEvent<any>) => {
      e.preventDefault()
      const data = {
        username: username,
        firstName: firstName,
        lastName: lastName,
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

    if (inputName === "username") {
        setUsername(inputVal)
    } else if (inputName === "email") {
        setEmail(inputVal)
    } else if (inputName === "password") {
        setPassword(inputVal)
    } else if (inputName === "firstName") {
        setFirstName(inputVal)
    } else if (inputName === "lastName") {
        setLastName(inputVal)
    }
  }

return (
  <div>
  {formSuc ?
    
      <h1>Success</h1>:
      <form action={`/api/users/create`} method="POST" onSubmit={handleSubmit} key={"signUp"}>
                <label htmlFor="username">Username: </label>
                <input type="text" required id="username" name="username" value={username} onChange={handleChange}/>
                <br/>

                <label htmlFor="firstName">First Name: </label>
                <input type="text" required id="firstName" name="firstName" value={firstName} onChange={handleChange}/>
                <br/>

                <label htmlFor="lastName">Last Name: </label>
                <input type="text" required id="lastName" name="lastName" value={lastName} onChange={handleChange}/>
                <br/>


                <label htmlFor="email">Email: </label>
                <input type="email" required id="email" name="email" value={email} onChange={handleChange}/>
                <br/>

                <label htmlFor="password">Password: </label>
                <input type="password" required id="password" name="password" value={password} onChange={handleChange}/>
                <br/>

                <label htmlFor="cPassword">Confirm Password: </label>
                <input type="password" required id="cPassword" name="cPassword"/>
                <br/>

                <button id="submit" type="submit">Submit</button>
                <br/>
              </form>

          }
          </div>
)}