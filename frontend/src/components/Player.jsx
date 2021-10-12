import React, {useState, useEffect, useContext} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
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
    const [isPlaying, setPlaying] = useState(false)
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
                setPlaying(false)
                break;
        }
    }

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

    function startSong() {
        if (!context.currentSong) return
        player.loadVideoById(context.currentSong.videoId);
    }

    function playSong() {
        player.playVideo()
    }

    function pauseSong() {
        player.pauseVideo();
    }

    const [currentlyPlayingField, setCurrentlyPlayingField] = useState("");
    useEffect(() => {
        if (!context.currentSong) return
        setCurrentlyPlayingField(context.currentSong.artist.name + " - " + context.currentSong.name)
    }, [context.currentSong])

    // run this every time videoId changes
    useEffect(() => {
        if (player && context.currentSong) {
            startSong()
        }
    }, [context])
    return (
        <footer id="footer">
            <div class="player-nav">
                <div id="yt-player"></div>
                <div className="pre-btn-container">
                    <img className="pre-btn" src="../src/img/next_btn.png"
                         alt="previous" onClick={previousSong}/>
                </div>
                <div className="play-pause-btn-container">
                    <img className={"play-btn"}
                         src={isPlaying ? "../src/img/pause_btn.png" : "../src/img/play_btn.png"}
                         alt="play/pause" onClick={isPlaying ? pauseSong : playSong}/>
                </div>
                <div className="next-btn-container">
                    <img className="next-btn" src="../src/img/next_btn.png"
                         alt="next" onClick={nextSong}/>
                </div>

            </div>

            <span className="progressbar-container">
                <Progressbar/>
            </span>
            <span className="currently-playing-field">
                <p5>{currentlyPlayingField}</p5>
            </span>

        </footer>
    )
}

export default Player