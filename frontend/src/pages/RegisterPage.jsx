import React from 'react'

function RegisterPage() {
    return (
        <div>
            <input id="firstName" name="firstName" className="input-bar" type="text" placeholder="First name" />
            <br />
            <input id="lastName" name="lastName" className="input-bar" type="text" placeholder="Last name" />
            <br />
            <input id="mail" name="mail" className="input-bar" type="text" placeholder="E-mail" />
            <br />
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password" />
            <br />
            <a href="#" class="confirm-btn">Register</a>
        </div>
    )
}

export default RegisterPage
