import React from "react";
import {useState} from "react";

function SearchList({props, type}) {

    const [songs, setSongs] = useState(props)
    const [type2, setType2] = useState(type)
    console.log(songs)

    if (type === "songs") {
        return (
            <div>{props[0].name}</div>
        )
    } else {
        return ""
    }
    /*
        if (type === "songs") {
            return
            (<div></div>
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
        )
/*
        } else if (type === "artists") {
            return
            (
                songs && songs.map(song => (
                    <div className="search-list-item" onClick={() => songClick(song)} key={song.browseId}>
                        <div className="search-list-item-img-container"><img src={song.thumbnails[0].url} /></div>
                        <div className="search-list-item-text-container">
                            <span className="search-list-item-artist-row"> Artist: {song.name}</span>
                        </div>
                        <div className="kebab-menu-container">
                            <BsThreeDotsVertical />
                        </div>
                    </div>
                ))
            )

        }else{
            return ("")
        }
    }*/
}

export default SearchList