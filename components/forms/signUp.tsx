
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import useSWR	from 'swr';

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
  
    var submit = document.getElementById("submit");
    theForm.insertBefore(input, submit);
    theForm.insertBefore(label, input);
    theForm.insertBefore(br, submit);
  }
  
  function remove(theForm: any, key: any) {
    var input = document.getElementById(key);
    var label = document.getElementById("Institute2");
    var br = document.getElementById("br2");
    theForm.removeChild(input);
    theForm.removeChild(label);
    theForm.removeChild(br);
  }
  
  const fetcher = (...args: [any, any]) => fetch(...args).then((res) => res.json())

  
export default function SignUpForm() {

    // const { data, error } = useSWR('/api/users/new', fetcher);
    // setInstitutes(data);
    // console.log(data);
    const [username, setUsername] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    // const [player, setPlayer] = React.useState(false)
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
    // } else if (inputName === "player") {
    //   var foo = document.getElementById("player") as HTMLInputElement;
    //     if(foo.checked) {
    //       add(e.target.form, "institute", "institute", data)
    //     } else {
    //       remove(e.target.form, "institute")
    //     }
    // }
  }

return (
  <div>
  {formSuc ?
      <h1>Success</h1>:
      <form action={`/api/users/create`} method="POST" onSubmit={handleSubmit} key={"signUp"}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={username} onChange={handleChange}/>
                <br/>

                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange}/>
                <br/>

                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange}/>
                <br/>


                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange}/>
                <br/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={handleChange}/>
                <br/>

                <label htmlFor="cPassword">Confirm Password: </label>
                <input type="password" id="cPassword" name="cPassword"/>
                <br/>

                {/* <label htmlFor="player">Are you a player?: </label>
                <input type="checkbox" id="player" name="player" onChange={handleChange}/>
                <br/> */}
                <button id="submit" type="submit">Submit</button>
                <br/>
              </form>

          }
          </div>
)}