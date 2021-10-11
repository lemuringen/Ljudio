import React, {useState, useEffect, useContext} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import Progressbar from "./Progressbar";

function Player() {
    // load player when this component mounts
    useEffect(() => {
        loadPlayer()
    }, [])


    const [player, setPlayer] = useState()
    const [context, updateContext] = useContext(PlayerContext)

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
const [isPlaying,setPlaying] = useState(false)
    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        //USTARTED, ENDED, PLAYING, PAUSED, BUFFERING, VIDEO CUED
        switch (event.data){
            case YT.PlayerState.PLAYING:
                setPlaying(true)
                break;
            case YT.PlayerState.ENDED:
                break;
            case YT.PlayerState.PAUSED:
                setPlaying(false)
                break;
            default:
                setPlaying(false)
        }
    }
    const [time,setTime] = useState(getCurrentTime)
function getCurrentTime(){
        if(!context.currentSong) return "00:00"
        return player.getCurrentTime();
}
function getDuration(){
        if(!context.currentSong) return "00:00";
        return player.getDuration();
}
    function startSong() {
        if(!context.currentSong) return
        player.loadVideoById(context.currentSong.videoId);
    }
    function playSong() {
        player.playVideo()
    }
    function pauseSong() {
        player.pauseVideo();
    }
    // run this every time videoId changes
    useEffect(() => {
      if(player && context.currentSong) {
        startSong()
      }
    }, [context])
    return (
        <footer id="footer">
            <div class="player-nav">
                <div id="yt-player"></div>
                <div className="pre-btn-container">
                    <img className="pre-btn" src="../src/img/next_btn.png" alt="previous"/>
                </div>
                <div className="play-pause-btn-container">
                   <img className={"play-btn"}
                        src={isPlaying?"../src/img/pause_btn.png":"../src/img/play_btn.png"}
                        alt="play/pause" onClick={isPlaying?pauseSong:playSong}/>
                </div>
                <div className="next-btn-container">
                    <img className="next-btn" src="../src/img/next_btn.png" alt="next"/>
                </div>
            </div>
<Progressbar/>
        </footer>
    )
}

export default Player