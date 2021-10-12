import React, { useContext, useState } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

function HomePage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()
    const [currentVideoId, setCurrentVideoId] = useState()
    const [context, updateContext] = useContext(PlayerContext)

    async function searchSong() {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + input)
        let result = await response.json()
        console.log(result.content)
        setSongs(result.content)
    }

    function songClick(song) {
        updateContext({
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
                        onChange={e => setInput(e.target.value)}
                    />



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
                </div>
            </div>
        </div>
    )
}

export default HomePage
