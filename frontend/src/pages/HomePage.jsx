import React, {useContext, useState} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'

function HomePage() {
    const [context, updateContext] = useContext(PlayerContext)
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()

    async function searchSong(e) {
        if((e.target.value).length === 0) return
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + e.target.value)
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
                <div>
                    {songs && songs.map(song => (
                        <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                            <div className="search-list-item-img-container"><img src={song.thumbnails[0].url}/></div>
                            <div className="search-list-item-text-container">
                                <span className="search-list-item-song-row"> Song: {song.name}</span>
                                <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                            </div>
                            <div className="kebab-menu-container">
                                <BsThreeDotsVertical onClick={() => 0}
                                />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
