import React, {useState} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'

function HomePage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()

    async function searchSong() {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + input)
        let result = await response.json()
        console.log(result.content)
        setSongs(result.content)
    }

    function songClick(song) {
        console.log(song.name)
        //  setCurrentVideoId(song.videoId)
    }

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <input
                    type="text"
                    placeholder="search songs"
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={searchSong}>Search</button>
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
