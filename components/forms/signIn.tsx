
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInForm() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    // const [player, setPlayer] = React.useState(false)
    const [formSuc, setFormSuc] = React.useState(false)
    
    async function handleSubmit(e: React.ChangeEvent<any>) {
        e.preventDefault()
//         const data = {
//       email: email,
//       password: password,
//   }
    console.log(email, password);
    const result = await signIn('credentials', { email, password})
    if (result.error) {
        console.log(result.error)
    }
        // const dataJSON = JSON.stringify(data)
        // // const data2 = JSON.parse(data)*/
        // fetch(e.target.action,
        //         {
        //                 headers: {
        //                         "Content-Type": "application/json",
        //                 },
        //                 body: dataJSON,
        //                 method: 'POST'
        //         }).then(() => setFormSuc(true))
}

const handleChange = (e: React.ChangeEvent<any>) => {
    const inputName = e.target.name
    const inputVal = e.target.value

    if (inputName === "email") {
        setEmail(inputVal)
    } else if (inputName === "password") {
        setPassword(inputVal)
    }
  }

return (
    <form action={`/api/auth/callback/credentials`} method="POST" onSubmit={handleSubmit} key={"signIn"}>
        <label htmlFor="email">Email3: </label>
        <input type="email" id="email" name="email" value={email} onChange={handleChange}/>
        <br/>

        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" value={password} onChange={handleChange}/>
        <br/>

        <button id="submit" type="submit">Submit</button>
        <br/>
    </form>
)}
