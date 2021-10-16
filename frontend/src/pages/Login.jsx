import React, {useState} from 'react'


function Login() {
const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
})

    function updateLoginCredentials(loginCredentialsUpdate) {
        setLoginCredentials({
            ...loginCredentials,
            ...loginCredentialsUpdate
        })
    }
    async function login() {

        const credentials = 'username=' +
            encodeURIComponent(loginCredentials.email)
            + '&password=' +
            encodeURIComponent(loginCredentials.password)

        let response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: credentials
        });

        if (response.url.includes('error')) {
            console.log('Wrong username/password');
        }
    }
    async function whoAmI() {
        let loggedInUser = null
        let response = await fetch('/api/login/whoami')
        try {
            loggedInUser = await response.json()
        } catch {
            console.log('Not logged in');
        }
        console.log(loggedInUser);
    }

    return (
        <div className="home-holder">
            <input id="user" name="user"  className="input-bar" type="text" placeholder="Username"
                   onChange={(e)=>updateLoginCredentials({email: e.target.value})}/>
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password"
                   onChange={(e)=>updateLoginCredentials({password: e.target.value})}/>
            <br />
            <a href="#" className="register-link" onClick={whoAmI}>Register here</a>
            <a href="#" onClick={login} className="confirm-btn">Login</a>
        </div >
    )
}

export default Login
