import React, { useContext, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SearchList from '../components/SearchList'
import Popup from '../components/Popup'



function HomePage() {
    const [context, updateContext] = useContext(PlayerContext)
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()
    const [searchFilter, setSearchFilter] = useState("songs")
    const [currentVideoId, setCurrentVideoId] = useState()


    async function searchSong(e) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/' + searchFilter + '/' + e.target.value)
        if((e.target.value).length === 0) return
        let result = await response.json()
        console.log(result.content)
        setSongs(result.content)
    }

    async function fetchAlbum(e) {
        if((e.target.value).length === 0) return
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/album/browseId' + e.target.value)
        let result = await response.json()
        console.log(result.content)
        setSongs(result.content)
    }
    function songClick(song) {
        updateContext({
            queue: songs,
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
                <Popup trigger={false}>
                    <ul className='nav-menu-items'>
                        <li className='popup-text'>
                            <a href="#">Add to playlist</a>
                        </li>
                        <li className='popup-text'>
                            <a href="#">Artist Page</a>
                        </li>
                    </ul>
                </Popup>
            </div>
        </div>
    )
}

export default HomePage
