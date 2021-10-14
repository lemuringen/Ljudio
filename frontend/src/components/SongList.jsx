import React, {useContext, useState, useEffect} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {SearchContext} from "../contexts/SearchContext";
import {BsThreeDotsVertical} from 'react-icons/bs'
import SearchList from "../components/SearchList";

function SongList() {
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [songs, setSongs] = useState();
const[doRender, setDoRender] = useState(false)
    useEffect(() => {
        if (searchContext.list.length === 0 || searchContext.type !== "songs"){
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

    return (
        <div>
            {doRender && songs.map(song => (
                <div className="search-list-item" onClick={() => songClick(song)} key={song.videoId}>
                    <div className="search-list-item-img-container"><img src={song.thumbnails[1].url}/></div>
                    <div className="search-list-item-text-container">
                        <span className="search-list-item-song-row"> Song: {song.name}</span>
                        <span className="search-list-item-artist-row"> Artist: {song.artist.name}</span>
                    </div>
                    <div className="kebab-menu-container">
                        <BsThreeDotsVertical/>
                    </div>

                </div>
            ))}
        </div>)
}

export default SongList
