import React, {useState, useContext, useEffect} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {ProgressbarContext} from "../contexts/ProgressbarContext";

function Progressbar() {
    const [context, updateContext] = useContext(PlayerContext)
    const [progressbarContext, updateProgressbarContext] = useContext(ProgressbarContext)
    const [progress, setProgress] = useState(0)

    const [pauseUpdate, setPauseUpdate] = useState(false)

    const [time, setTime] = useState("00:00")
    const [duration, setDuration] = useState("00:00")

    const [counter, setCounter] = useState(0);

    let settingHandle = false;
    // useEffect(() => {
    //     if (!context.player && !context.currentSong) return;
    //     setInterval(() => {
    //
    //         let currentTime = context.player.getCurrentTime()
    //         let duration = context.player.getDuration()
    //         let playedPercent = (currentTime / duration) * 100
    //         setTime(formatTimeFromSeconds(currentTime, duration));
    //         setDuration(formatTimeFromSeconds(duration));
    //
    //
    //         // TODO: don't update when user is moving the slider
    //         setProgress(playedPercent)
    //
    //     }, 100)
    //   //  return clearInterval;
    // })
    useEffect(() => {
        if (!context.player && !context.currentSong) return;
        const intervalId = setInterval(() => {
            if(settingHandle) return;
            let currentTime = context.player.getCurrentTime()
            let duration = context.player.getDuration()
            let playedPercent = (currentTime / duration) * 100
            // let increment = duration / (100 * 10)
            setTime(formatTimeFromSeconds(currentTime, duration));
            setDuration(formatTimeFromSeconds(duration));

            // setProgress((p) => p + increment);
            setProgress(() => playedPercent);

        }, 100);
        return () => {
            return clearInterval(intervalId);
        };

    });


    function formatTimeFromSeconds(time, maxTime) {
        let maxTimeAboveHour = 1 < (maxTime / 3600);
        let maxTimeAboveMinute = 1 < (maxTime / 60);
        let h = time / (3600);
        time = time % (3600);
        let m = time / 60;
        time = time % 60;
        let s = time;
        h = parseInt(h);
        h = (h > 0 || maxTimeAboveHour ? (h < 10 ? "0" + h : h) + ":" : "")
        m = parseInt(m);
        m = (m > 0 || maxTimeAboveMinute ? (m < 10 ? "0" + m : m) + ":" : "")
        s = parseInt(s)
        s = s < 10 ? "0" + s : s;
        return "" + h + m + s;
    }

    function changeSongPosition(e) {
        settingHandle  = true;
        setTimeout(()=>{
            settingHandle = false;
        }, 2000);
        setProgress(e.target.value)

        let newPosition = context.player.getDuration() / Number(e.target.value)

        // change position in song
        context.player.seekTo(newPosition, true)
    }
    // function changeSongPosition(e) {
    //     setProgress(e.target.value)
    //
    // }
    //
    // function mouseUp() {
    //     updateProgressbarContext({
    //         isHandleHeld: false
    //     })
    //     let newPosition = context.player.getDuration() / progress
    //     // change position in song
    //     context.player.seekTo(newPosition, true)
    // }
    //
    // function mouseDown() {
    //     updateProgressbarContext({
    //         isHandleHeld: true
    //     })
    // }

    return (
        <div>

            <div className="time-nav">
                <div id="current-time">{time ? time : "00:00"}</div>
                <div id="total-time">{duration ? duration : "00:00"}</div>
            </div>
            <div className="progressbar-nav">

                <input
                    className="slider"
                    value={progress}
                    onChange={changeSongPosition}
                    type="range"
                    style={{width: '100%'}}
                />

            </div>
        </div>
    )
}

export default Progressbar
