import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";

function RegisterPage() {
    const history = useHistory();
    const [message, setMessage] = useState("")
    const [successfulRegistration, setSuccessfulRegistration] = useState(false)
    useEffect(() => {
        if (successfulRegistration) {
            history.push("/")
        }
    }, [successfulRegistration])


    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    function updateUserCredentials(userCredentialsUpdate) {
        setUserCredentials({
            ...userCredentials,
            ...userCredentialsUpdate
        })
    }

    async function register() {
        let response = await fetch("api/login/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userCredentials)
        });
        try {
            response = await response.json()
            console.log(response);
        } catch {
            console.log('Unsuccessful registration');
        }
        if (response.url.includes('error')) {
            setMessage("Unsuccessful registration. All fields need to be filled out. ")
        } else {
            setSuccessfulRegistration(true)
        }
    }

    return (
        <div className="home-holder padding-box ">
            <input onChange={(e) => updateUserCredentials({ firstName: e.target.value })}
                id="firstName" name="firstName" className="input-bar" type="text"
                placeholder="First name" />
            <br />
            <input id="lastName" name="lastName" className="input-bar" type="text" placeholder="Last name"
                onChange={(e) => updateUserCredentials({ lastName: e.target.value })} />
            <br />
            <input id="mail" name="mail" className="input-bar" type="text" placeholder="E-mail"
                onChange={(e) => updateUserCredentials({ email: e.target.value })} />
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password"
                onChange={(e) => updateUserCredentials({ password: e.target.value })} />
            <br />
            <div className="login-bar">
                <Link className="register-link" to={"/Login"}> Already have an account? Login here.</Link>
                <a href="#" onClick={register} className="confirm-btn">Register</a>
            </div>
            <span><p className="message">{message}</p></span>
        </div>
    )
}

export default RegisterPage
