import React from 'react'

function RegisterPage() {
    return (
        <div>
            <input className="input-bar" type="text" placeholder="First name" />
            <br />
            <input className="input-bar" type="text" placeholder="Last name" />
            <br />
            <input className="input-bar" type="text" placeholder="E-mail" />
            <br />
            <input className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" class="confirm-btn">Register</a>
        </div>
    )
}

export default RegisterPage
