import React from 'react'


function Login() {
    return (
        <div>
            <input className="input-bar" type="text" placeholder="Username" />
            <br />
            <input className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" class="register-link">Register here</a>
            <a href="#" class="confirm-btn">Login</a>
        </div >
    )
}

export default Login
