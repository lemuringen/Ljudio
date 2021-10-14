import React, {useContext, useState, useEffect} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {SearchContext} from "../contexts/SearchContext";
import {BsThreeDotsVertical} from 'react-icons/bs'
import SearchList from "../components/SearchList";

function ArtistList() {

    const [playerContext, updatePlayerContext] = useContext(PlayerContext)
    const [searchContext, updateSearchContext] = useContext(SearchContext)
    const [artists, setArtists] = useState();
    const [doRender, setDoRender] = useState(false)

    useEffect(() => {
        if (searchContext.list.length === 0 || searchContext.type !== "artists") {
            setDoRender(false)
            return
        }
        setArtists(searchContext.list)
        setDoRender(true)
    }, [searchContext])

    return (
        <div>
            {doRender && artists.map(artist => (
                <div className="search-list-item" key={artist.browseId}>
                    <div className="search-list-item-img-container"><img src={artist.thumbnails[0].url}/></div>
                    <div className="search-list-item-text-container">
                        <span className="search-list-item-artist-row"> Artist: {artist.name}</span>
                    </div>
                    <div className="kebab-menu-container">
                            <BsThreeDotsVertical/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ArtistList