import React, {useContext, useEffect, useState} from 'react'
import {SearchContext} from "../contexts/SearchContext";
import SongList from "../components/SongList";
import ArtistList from "../components/ArtistList";
import {isLoggedIn} from "../Authenticator"
import {useHistory} from "react-router-dom";

function HomePage() {


const [searchResults, setSearchResults] = useState()
const [searchFilter, setSearchFilter] = useState("songs")
const [searchContext, updateSearchContext] = useContext(SearchContext)
const [searchWord, setSearchWord] = useState("")

/*
Search for input given by user with search filter applied
 */
async function search(searchWord) {
    let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/' + searchFilter + '/' + searchWord)
    let result = await response.json()
    setSearchResults(result.content)
}

function updateSearchWord(e) {
    setSearchWord(e.target.value)
}

/*
    Calls search function whenever a new searchfilter or searchfield input is given
 */
useEffect(() => {
    if (searchWord === "") return
    search(searchWord)
}, [searchFilter, searchWord])
/*
    Updates SearchContext whenever new songs are loaded in the songs-useState.
    This should be triggered by search function.
    When this is triggered a UseEffect in SongList will be triggered and show searchresults
 */
useEffect(() => {
    if (!searchResults) return
    updateSearchContext({
        type: searchFilter,
        list: searchResults
    })
}, [searchResults])

function setSearchArtists() {
    setSearchFilter("artists")
}

function setSearchSongs() {
    setSearchFilter("songs")
}
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
    <div className="home-holder">

        <div>
            <div className="search-input-box">
                <input
                    className="input-bar"
                    type="text"

                    placeholder="Search songs"
                    onChange={updateSearchWord}
                />
            </div>
            <div className="container">
                <div className="switch">
                    <input type="radio"
                           className="switch-input"
                           name="view"
                           value="songs"
                           id="songs"
                           checked={searchFilter === "songs"}
                           onChange={setSearchSongs}
                    />
                    <label htmlFor="songs" className="switch-label switch-label-off">Songs</label>
                    <input type="radio"
                           className="switch-input"
                           name="view"
                           value="artists"
                           id="artists"
                           checked={searchFilter === "artists"}
                           onChange={setSearchArtists}
                    />
                    <label htmlFor="artists" className="switch-label switch-label-on">Artists</label>
                    <span className="switch-selection"></span>
                </div>
            </div>
            <div className="box-box">

                <SongList/>
                <ArtistList/>


            </div>
        </div>
    </div>
)
}

export default HomePage
