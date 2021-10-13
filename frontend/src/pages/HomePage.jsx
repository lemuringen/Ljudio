import React, { useContext, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { BsThreeDotsVertical } from 'react-icons/bs'


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
                        placeholder="Search songs"
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

                    {songs && songs.map(song => (
                        <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                            <div className="search-list-item-img-container"><img src={song.thumbnails[0].url} /></div>
                            <div className="search-list-item-text-container">
                                <span className="search-list-item-song-row"> Song: {song.name}</span>
                                <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                            </div>
                            <div className="kebab-menu-container">
                                <BsThreeDotsVertical />
                            </div>

                        </div>
                    ))}
                    {/* *** Artist search ***
                    {songs && songs.map(song => (
                        <div className="search-list-item" onClick={() => songClick(song)} key={song.browseId}>
                            <div className="search-list-item-img-container"><img src={song.thumbnails[0].url} /></div>
                            <div className="search-list-item-text-container">
                                <span className="search-list-item-artist-row"> Artist: {song.name}</span>
                            </div>
                            <div className="kebab-menu-container">
                                <BsThreeDotsVertical />
                            </div>

                        </div>
                    ))}
                    */}
                </div>
            </div>
        </div>
    )
}

export default HomePage
