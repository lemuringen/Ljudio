import React, {useContext, useEffect, useState} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {SearchContext} from "../contexts/SearchContext";
import {BsThreeDotsVertical} from 'react-icons/bs'
import SearchList from "../components/SearchList";
import SongList from "../components/SongList";
import ArtistList from "../components/ArtistList";


function HomePage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()
    const [searchFilter, setSearchFilter] = useState("songs")
    const [currentVideoId, setCurrentVideoId] = useState()
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [searchWord, setSearchWord] = useState("")

    async function searchSong(searchWord) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/' + searchFilter + '/' + searchWord)
        let result = await response.json()
        setSongs(result.content)
    }

    function updateSearchWord(e) {
        setSearchWord(e.target.value)
    }


    useEffect(() => {
        if (searchWord === "") return
        searchSong(searchWord)
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
            </div>
        </div>
    )
}

export default HomePage
