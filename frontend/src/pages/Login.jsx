import React from 'react'


function Login() {

    async function customLogin() {
        const credentials = {
            username: 'user',
            password: 'password'
        }

        let response = await fetch("/auth/login", {
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
    }

    return (
        <div>
            <input id="user" name="user" className="input-bar" type="text" placeholder="Username" />
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" class="register-link">Register here</a>
            <a href="#" onClick={customLogin} class="confirm-btn">Login</a>
        </div >
    )
}

export default Login
