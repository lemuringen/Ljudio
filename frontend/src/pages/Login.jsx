import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';


function Login() {
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [successfulRegistration, setSuccessfulRegistration] = useState(false)
    const history = useHistory();1
    useEffect(() => {
        if (successfulRegistration) {
            history.push("/")
        }
    }, [successfulRegistration])

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
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: credentials
        });

        if (response.url.includes('error')) {
            setMessage("Login failed. Wrong email and/or password. Try again.")
            setSuccessfulRegistration(false)
        } else {
            setSuccessfulRegistration(true)
        }
    }

    return (
        <div className="home-holder">

            <input id="user" name="user" className="input-bar" type="text" placeholder="Email"
                   onChange={(e) => updateLoginCredentials({email: e.target.value})}/>
            <br/>
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password"
                   onChange={(e) => updateLoginCredentials({password: e.target.value})}/>
            <br/>
            <Link className="register-link" to={"/Register"}> Register here</Link>
            <a href="#" onClick={login} className="confirm-btn">Login</a>
            <span><p className="message">{message}</p></span>
        </div>
    )
}

export default Login
