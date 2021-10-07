import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

function ArtistPage() {
    let {videoid} = useParams();
    return (
        <div className="artist-page-container">
            <section className="artist-details">
                <div>
                    <h1 className="artist-name">Artist</h1>
                </div>
                <div className="artist-details-inner-container">
                    <div className="artist-image">
                        <img scr={""} alt="Artis picture"/>
                    </div>
                    <div className="social-media-container">
                        <div className="social-media-row">
                            <span className="social-media-icon" id="twitter"><FaTwitter/></span>
                            <span className="social-media-icon" id="facebook"><FaFacebook/></span>
                            <span className="social-media-icon" id="instagram"><FaInstagram/></span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="albums">
                <h1>Album</h1>
                <div className={"album-grid"}>

                </div>
            </section>
        </div>
    );
}

export default ArtistPage