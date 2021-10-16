import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {isLoggedIn} from "../Authenticator";

function PlaylistPage() {
    /*
            AUTHENTICATION>>>
     */
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false)
    if (!authenticated) {
        requireAuthentication()
    }

    async function requireAuthentication() {
        if (await isLoggedIn()) {
            setAuthenticated(true)
        } else {
            history.push("/Login")
        }
    }

    if (!authenticated) {
        return (<div></div>)
    }
    /*
        <<<AUTHENTICATION
    */
    return (
        <div>
            <h1>Playlist Page</h1>
        </div>
    )
}

export default PlaylistPage
