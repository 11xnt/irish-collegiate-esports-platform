
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInForm() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    async function handleSubmit(e: React.ChangeEvent<any>) {
        e.preventDefault()
        const result = await signIn('credentials', { email, password})
        if (result.error) {
            console.log(result.error)
        }
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
        <label htmlFor="email">Email: </label>
        <input type="email" required id="email" name="email" value={email} onChange={handleChange}/>
        <br/>

        <label htmlFor="password">Password: </label>
        <input type="password" required id="password" name="password" value={password} onChange={handleChange}/>
        <br/>

        <button id="submit" type="submit">Submit</button>
        <br/>
    </form>
)}
