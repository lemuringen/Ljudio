import React, {useState, useEffect} from 'react'
import {Link, useHistory} from "react-router-dom";
import {isLoggedIn} from "../Authenticator";
import * as AiIcons from "react-icons/ai";
import {SidebarData} from "../components/SidebarData";

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
    async function getPlaylists() {
        let response = await fetch("api/playlists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"name": "My first playlist", "trackIds": ["id42312431", "id523454321423", "id534321234"]})
        });
        try {
            response = await response.json()
        } catch {
            console.log('Unsuccessful registration');
        }
    }
    return (
        <div>
            <h1>Playlist Page</h1>
            <ul className='button-list'>
                <li key="x" className="nav-text-logout" id="logout" >
                    <span>Playlist</span>
                </li>
            </ul>
        </div>
    )
}

export default PlaylistPage
