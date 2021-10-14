import React, {useContext, useState, useEffect} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {SearchContext} from "../contexts/SearchContext";
import {BsThreeDotsVertical} from 'react-icons/bs'
import SearchList from "../components/SearchList";
import Popup from '../components/Popup'

function SongList() {
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [songs, setSongs] = useState();
    const [doRender, setDoRender] = useState(false)
    useEffect(() => {
        if (searchContext.list.length === 0 || searchContext.type !== "songs") {
            setDoRender(false)
            return
        }
        setSongs(searchContext.list)
        setDoRender(true)
    }, [searchContext])

    function songClick(song) {
        updatePlayerContext({
            currentSong: song
        })
    }

    const [buttonPopup, setButtonPopup] = useState(false)

    return (
        <div>
            {doRender && songs.map(song => (
                <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                    <div className="search-list-item-img-container"><img src={song.thumbnails[0].url}/></div>
                    <div className="search-list-item-text-container">
                        <span className="search-list-item-song-row"> Song: {song.name}</span>
                        <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                    </div>
                    <div className="kebab-menu-container" onClick={() => setButtonPopup(true)}>
                        <BsThreeDotsVertical />
                    </div>
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
            ))}


        </div>)
}

export default SongList
