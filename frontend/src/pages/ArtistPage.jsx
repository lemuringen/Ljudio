import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useParams } from "react-router-dom";

function ArtistPage() {
    let { id } = useParams();
    const [albums, setAlbums] = useState()
    const [artist, setArtist] = useState()
    const [artistImageSrc, setArtistImageSrc] = useState("")
    const [artistDescription, setArtisDescription] = useState("")

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
            setArtisDescription(artist.description)

        }, [artist, artistImageSrc])


    async function searchAlbums() {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/albums/' + artist.name)
        let result = await response.json()
        setAlbums(result.content)
        console.log(albums)
    }


    return (
        <div className="artist-page-container home-holder">
            <section className="artist-details">
                <div>
                    <h1 className="artist-name"></h1>
                </div>
                <div className="artist-image">
                    <img src={artistImageSrc} />
                </div>
                <div className="artist-description">{artistDescription}</div>

            </section>
            <section className="albums">
                <h1>Album</h1>
                <div className={"album-grid"}>
                    {albums && albums.map(album => (
                        <div className="album-container" key={album.browseId}>

                            <img src={album.thumbnails[0].url} />
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