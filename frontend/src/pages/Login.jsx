import React from 'react'


function Login() {

    async function customLogin() {
        let username = 'user1'
        let password = 'password1'

        const credentials = 'username=' +
            encodeURIComponent(username)
            + '&password=' +
            encodeURIComponent(password)

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
        <div>
            <input id="user" name="user" className="input-bar" type="text" placeholder="Username" />
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" className="register-link">Register here</a>
            <a href="#" onClick={customLogin} className="confirm-btn">Login</a>
            <a href="#" onClick={whoAmI} className="confirm-btn">Är jag inloggad?</a>
        </div >
    )
}

export default Login
