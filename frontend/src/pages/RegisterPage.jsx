import React, {useState} from 'react'

function RegisterPage() {
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
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userCredentials)
        });
        try {
            response = await response.json()
            console.log(response);
        } catch {
            console.log('Wrong username/password');
        }
    }

    return (
        <div className="home-holder">
            <input onChange={(e) => updateUserCredentials({firstName: e.target.value})}
                   id="firstName" name="firstName" className="input-bar" type="text"
                   placeholder="First name"/>
            <br/>
            <input id="lastName" name="lastName" className="input-bar" type="text" placeholder="Last name"
                   onChange={(e) => updateUserCredentials({lastName: e.target.value})}/>
            <br/>
            <input id="mail" name="mail" className="input-bar" type="text" placeholder="E-mail"
                   onChange={(e) => updateUserCredentials({email: e.target.value})}/>
            <br/>
            <input id="password" name="password" className="input-bar" type="text" placeholder="Password"
                   onChange={(e) => updateUserCredentials({password: e.target.value})}/>
            <br/>
            <a href="#" onClick={register} className="confirm-btn">Register</a>
        </div>
    )
}

export default RegisterPage
