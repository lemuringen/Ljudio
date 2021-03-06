import React, {useContext, useEffect, useState} from 'react'
import {FaFacebook, FaTwitter, FaReddit} from 'react-icons/fa';
import {useHistory, useParams} from "react-router-dom";

import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton

} from "react-share";
import {PlayerContext} from "../contexts/PlayerContext";
import {isLoggedIn} from "../Authenticator"; // https://github.com/nygardk/react-share/
function ArtistPage() {


    let {id} = useParams();
    const [albums, setAlbums] = useState()
    const [artist, setArtist] = useState()
    const [artistImageSrc, setArtistImageSrc] = useState("")
    const [artistDescription, setArtisDescription] = useState("")
    const [playerContext, updatePlayerContext] = useContext(PlayerContext)

    useEffect
    (() => {
        searchArtist()
    }, [id])


    async function searchArtist() {
        let response = await fetch("https://yt-music-api.herokuapp.com/api/yt/artist/" + id)
        let result = await response.json()
        setArtist(result)
    }

    useEffect
    (() => {
        if (!artist || artist === undefined) return
        searchAlbums()
        setArtistImageSrc(artist.thumbnails[0].url)
        setArtisDescription(artist.description === "" ? "No description available" : artist.description)

    }, [artist, artistImageSrc])

    async function searchAlbums() {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/albums/' + artist.name)
        let result = await response.json()
        setAlbums(result.content)
    }

    async function fetchAlbum(album) {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/album/' + album.browseId)
        let result = await response.json()

        updatePlayerContext({
                queue: result.tracks,
                currentSong: result.tracks[0]
            }
        )
    }
    /*
            AUTHENTICATION>>>
     */
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false)
    if (!authenticated) {
        requireAuthentication()
    }

    async function requireAuthentication() {
        if (await isLoggedIn()) {
            setAuthenticated(true)
        } else {
            history.push("/Login")
        }
    }

    if (!authenticated) {
        return (<div></div>)
    }
    /*
        <<<AUTHENTICATION
    */
    return (
        <div className="artist-page-container home-holder">
            <section className="artist-details">
                <div>
                    <h1 className="artist-name"></h1>
                </div>
                <div className="artist-image">
                    <img src={artistImageSrc}/>
                </div>

                <div className="artist-description">{artistDescription}</div>
                <div className="social-media-bar">
                    <FacebookShareButton
                        url={window.location.href}
                        hashtag="#wanderlust">
                        <FaFacebook/>
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        hashtag="#k??mpaP??">
                        <FaTwitter/>
                    </TwitterShareButton>
                    <RedditShareButton
                        url={window.location.href}
                        hashtag="#carpeDiem">
                        <FaReddit/>
                    </RedditShareButton>
                </div>
            </section>
            <section className="albums">
                <h1>Album</h1>
                <div className={"album-grid"}>
                    {albums && albums.map(album => (
                        <div className="album-container" key={album.browseId} onClick={() => fetchAlbum(album)}>
                            <img src={album.thumbnails[2].url}/>
                            <span>
                                <p>{album.name}</p>
                                <p>Realeased: {album.year}</p>
                            </span>
                        </div>
                    ))
                    }
                </div>
            </section>
        </div>
    );
}

export default ArtistPage