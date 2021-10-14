import React, { useState, useEffect, useContext } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import Progressbar from "./Progressbar";

function Player() {
    const [context, updateContext] = useContext(PlayerContext)
    const [player, setPlayer] = useState()

    // load player when this component mounts
    useEffect(() => {
        loadPlayer()
    }, [])

    function loadPlayer() {
        let ytPlayer = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        setPlayer(ytPlayer)
        // set player in the context
        updateContext({
            player: ytPlayer
        })
    }

    const [newSongPending, setNewSongPending] = useState(false)
    const [previousSongPending, setPreviousSongPending] = useState(false)

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        //USTARTED, ENDED, PLAYING, PAUSED, BUFFERING, VIDEO CUED
        switch (event.data) {
            case YT.PlayerState.PLAYING:
                setPlaying(true)
                break;
            case YT.PlayerState.ENDED:
                setNewSongPending(true);
                break;
            case YT.PlayerState.PAUSED:
                setPlaying(false)
                break;
            default:
                // setPlaying(false)
                break;
        }
    }


    function startSong() {
        if (!context.currentSong) return
        player.loadVideoById(context.currentSong.videoId);
    }

    // run this every time videoId changes
    useEffect(() => {
        if (player && context.currentSong) {
            startSong()
        }
    }, [context])

    const [isPlaying, setPlaying] = useState(false)

    const [currentlyPlayingField, setCurrentlyPlayingField] = useState("");
    useEffect(() => {
        if (!context.currentSong) return
let currentlyPlayingString = (context.currentSong.artist ? context.currentSong.artist.name + " - " : "") + context.currentSong.name
        setCurrentlyPlayingField(currentlyPlayingString)
    }, [context.currentSong])

    /*>>>Buttons>>>*/
    const [playBtnSrc, setPlayBtnSrc] = useState("../src/img/play_btn.png")
    const [nextBtnSrc, setNextBtnSrc] = useState("../src/img/next_btn.png")
    const [previousBtnSrc, setPreviousBtnSrc] = useState("../src/img/next_btn.png")
    const [playBtn, setPlayBtn] = useState({
        hover: false
    }
    )
    const [nextBtn, setNextBtn] = useState({
        hover: false
    }
    )
    const [previousBtn, setPreviousBtn] = useState({
        hover: false
    }
    )
    let buttons = {
        play: {
            standard: "../src/img/play_btn.png",
            hover: "../src/img/play_btn_hover.png"
        },
        pause: {
            standard: "../src/img/pause_btn.png",
            hover: "../src/img/pause_btn_hover.png"
        },
        next: {
            standard: "../src/img/next_btn.png",
            hover: "../src/img/next_btn_hover.png"
        },
        previous: {
            standard: "../src/img/next_btn.png",
            hover: "../src/img/next_btn_hover.png"
        }
    }

    function hoverPlay(isHovering) {
        setPlayBtn({
            hover: isHovering
        })
    }

    function hoverNext(isHovering) {
        setNextBtn({
            hover: isHovering
        })
    }

    function hoverPrevious(isHovering) {
        setPreviousBtn(
            {
                hover: isHovering
            })
    }

    function togglePlay() {
        let willPlay = isPlaying ? false : true
        if (willPlay) {
            player.playVideo();
        } else if (!willPlay) {
            player.pauseVideo();
        }

    }
    useEffect(() => {
        if (!isPlaying) {
            setPlayBtnSrc(playBtn.hover ? buttons.play.hover : buttons.play.standard)
        } else {
            setPlayBtnSrc(playBtn.hover ? buttons.pause.hover : buttons.pause.standard)
        }

    }, [isPlaying, playBtn.hover])

    useEffect(() => {
        setNextBtnSrc(nextBtn.hover ? buttons.next.hover : buttons.next.standard)
    }, [nextBtn])

    useEffect(() => {
        setPreviousBtnSrc(previousBtn.hover ? buttons.previous.hover : buttons.previous.standard)
    }, [previousBtn])
    //todo generalise and combine next/previous
    useEffect(() => {
        if (!previousSongPending) return
        setPreviousSongPending(false)

        let playlist = context.queue
        let currentSong = context.currentSong
        let currentIndex = playlist.indexOf(currentSong)
        updateContext(
            {
                currentSong: currentIndex - 1 < 0 ? playlist[playlist.length - 1] : playlist[currentIndex - 1]
            })
    }, [previousSongPending, context])

    useEffect(() => {
        if (!newSongPending) return
        setNewSongPending(false)
        let playlist = context.queue
        let currentSong = context.currentSong;
        let currentIndex = playlist.indexOf(currentSong);
        updateContext(
            {
                currentSong: currentIndex + 1 === playlist.length ? playlist[0] : playlist[currentIndex + 1]
            })
    }, [newSongPending, context])

    function nextSong() {
        setNewSongPending(true)
    }

    function previousSong() {
        setPreviousSongPending(true)
    }

    /*<<<Buttons<<<*/
    return (
        <footer id="footer">
            <div className="player-nav">
                <div id="yt-player"></div>
                <div className="pre-btn-container">
                    <input type="image"
                        className="pre-btn"
                        src={previousBtnSrc}
                        alt="previous"
                        onClick={previousSong}
                        onMouseOver={() => hoverPrevious(true)}
                        onMouseLeave={() => hoverPrevious(false)}
                    />
                </div>
                <div className="play-pause-btn-container">
                    <input type="image"
                        className={"play-btn"}
                        src={playBtnSrc}
                        alt="play/pause"
                        onClick={togglePlay}
                        onMouseOver={() => hoverPlay(true)}
                        onMouseLeave={() => hoverPlay(false)}
                    />
                </div>
                <div className="next-btn-container">
                    <input type="image"
                        className="next-btn"
                        src={nextBtnSrc}
                        alt="next"
                        onClick={nextSong}
                        onMouseOver={() => hoverNext(true)}
                        onMouseLeave={() => hoverNext(false)}
                    />

                </div>
            </div>

            <span className="progressbar-container">
                <Progressbar />
            </span>
            <span className="currently-playing-field">
                {currentlyPlayingField}
            </span>

        </footer>
    )
}

export default Player