import React, { useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { SearchContext } from "../contexts/SearchContext";
import { BsThreeDotsVertical } from 'react-icons/bs'
import Popup from '../components/Popup'
import { Link } from "react-router-dom";

function SongList() {
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [songs, setSongs] = useState();
    const [doRender, setDoRender] = useState(false)
    const [artistId, setArtistId] = useState("")
    const [buttonPopup, setButtonPopup] = useState(false)
    const  [active, setActive] = useState("")

    useEffect(() => {
        if (searchContext.list.length === 0 || searchContext.type !== "songs") {
            setDoRender(false)
            return
        }
        setSongs(searchContext.list)
        setDoRender(true)
    }, [searchContext])

    function songClick(song) {
        if (buttonPopup) return
        updatePlayerContext({
            currentSong: song,
            queue: songs
        })
    }

    function openKebabContextMenu(id) {
        setArtistId("/artist/" + id)
        setButtonPopup(true)
    }

    return (
        <div>
            {doRender && songs.map(song => (
                <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                    <div className="search-list-item-img-container"><img src={song.thumbnails[0]?song.thumbnails[0].url:song.thumbnails.url} /></div>
                    <div className="search-list-item-text-container">
                        <span className="search-list-item-song-row"> Song: {song.name}</span>
                        <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                    </div>
                    <div className="kebab-menu-container" onClick={() => openKebabContextMenu(song.artist.browseId)}>
                        <BsThreeDotsVertical />
                    </div>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <ul className='nav-menu-items'>
                            <li className='popup-text'>
                                <a href="#">Add to playlist</a>
                            </li>
                            <li className='popup-text'>
                                <Link to={artistId}>Artist Page</Link>
                            </li>
                        </ul>
                    </Popup>

                </div>
            ))}
        </div>)
}

export default SongList
