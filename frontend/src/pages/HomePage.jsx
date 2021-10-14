import React, { useContext, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SearchList from '../components/SearchList'


function HomePage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()
    const [searchFilter, setSearchFilter] = useState("songs")
    const [currentVideoId, setCurrentVideoId] = useState()
    const [context, updateContext] = useContext(PlayerContext)


    async function searchSong(e) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/' + searchFilter + '/' + e.target.value)
        let result = await response.json()
        console.log(result.content)
        setSongs(result.content)
    }

    function songClick(song) {
        updateContext({
            currentSong: song
        })
    }

    function setSearchArtists() {
        setSearchFilter("artists")
    }
    function setSearchSongs() {
        setSearchFilter("songs")
    }

    return (
        <div className="home-holder">
            <div>
                <div className="search-input-box">
                    <input
                        className="input-bar"
                        type="text"
                        placeholder=" Search.. "
                        onChange={searchSong}
                    />
                </div>

                <div class="container">
                    <div class="switch">
                        <input type="radio"
                            class="switch-input"
                            name="view"
                            value="songs"
                            id="songs"
                            checked={searchFilter === "songs"}
                            onChange={setSearchSongs}
                        />
                        <label for="songs" class="switch-label switch-label-off">Songs</label>

                        <input type="radio"
                            class="switch-input"
                            name="view"
                            value="artists"
                            id="artists"
                            checked={searchFilter === "artists"}
                            onChange={setSearchArtists}
                        />
                        <label for="artists" class="switch-label switch-label-on">Artists</label>

                        <span class="switch-selection"></span>
                    </div>
                </div>

                <div>
                    {songs && songs !== undefined ? <SearchList props={songs} type={searchFilter} /> : ""}
                </div>
            </div>
        </div>
    )
}

export default HomePage
