import React, {useContext, useEffect, useState} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {SearchContext} from "../contexts/SearchContext";
import {BsThreeDotsVertical} from 'react-icons/bs'
import SearchList from "../components/SearchList";
import SongList from "../components/SongList";
import ArtistList from "../components/ArtistList";
import Popup from '../components/Popup'

function HomePage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()
    const [searchFilter, setSearchFilter] = useState("songs")
    const [currentVideoId, setCurrentVideoId] = useState()
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [searchWord, setSearchWord] = useState("")

    async function search (searchWord) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/' + searchFilter + '/' + searchWord)
        let result = await response.json()
        setSongs(result.content)
    }

    function updateSearchWord(e) {
        setSearchWord(e.target.value)
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


    useEffect(() => {
        if (searchWord === "") return
        search (searchWord)
    }, [searchFilter, searchWord])

    useEffect(() => {
        if (!songs || songs === undefined) return

        updateSearchContext({
            type: searchFilter,
            list: songs
        },)
    }, [songs])

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

                        placeholder="Search songs"
                        onChange={updateSearchWord}
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

                    <SongList/>
                    <ArtistList/>


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
