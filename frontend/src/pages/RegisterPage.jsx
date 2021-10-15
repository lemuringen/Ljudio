import React from 'react'

function RegisterPage() {
    async function register() {
        const credentials = {
            email: 'user1',
            password: 'password1',
            firstName: 'firstName1',
            lastName: 'lastName1'
        }

        let response = await fetch("api/login/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        try {
            response = await response.json()
            console.log(response);
        } catch {
            console.log('Wrong username/password');
        }

        // let response = await fetch("/api/login/hello")
        // let message = await response.text()
        // console.log(message);

    }

    return (
        <div className="home-holder">
            <input id="firstName" name="firstName" className="input-bar" type="text" placeholder="First name" />
            <br />
            <input id="lastName" name="lastName" className="input-bar" type="text" placeholder="Last name" />
            <br />
            <input id="mail" name="mail" className="input-bar" type="text" placeholder="E-mail" />
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" onClick={register} className="confirm-btn">Register</a>
        </div>
    )
}

export default RegisterPage
