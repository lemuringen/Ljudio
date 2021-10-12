import React, {useContext, useState} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {BsThreeDotsVertical} from 'react-icons/bs'

function HomePage() {
    const [context, updateContext] = useContext(PlayerContext)
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()


    async function searchSong(e) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + e.target.value)
        let result = await response.json()
        setSongs(result.content)
    }

    function songClick(song) {
        updateContext({
            queue: songs,
            currentSong: song
        })
    }

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <input
                    type="text"
                    placeholder="search songs"
                    onChange={searchSong}
                />
                <hr/>
                <div>
                    {songs && songs.map(song => (
                        <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                            <div className="search-list-item-img-container"><img src={song.thumbnails[0].url}/></div>
                            <div className="search-list-item-text-container">
                                <span className="search-list-item-song-row"> Song: {song.name}</span>
                                <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                            </div>
                            <div className="kebab-menu-container">
                                <BsThreeDotsVertical/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
