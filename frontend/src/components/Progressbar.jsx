import React, {useState, useContext, useEffect} from 'react'
import {PlayerContext} from '../contexts/PlayerContext'
import {ProgressbarContext} from "../contexts/ProgressbarContext";

function Progressbar() {
    const [context, updateContext] = useContext(PlayerContext)
    const [progress, setProgress] = useState(0)

    const [time, setTime] = useState("00:00")
    const [duration, setDuration] = useState("00:00")

    const [update, setUpdate] = useState({
        pending: false,
        package: null
    });

    useEffect(() => {
        if (!context.player && !context.currentSong) return;
        const intervalId = setInterval(() => {
            let currentTime = context.player.getCurrentTime()
            let duration = context.player.getDuration()
            let playedPercent = (currentTime / duration) * 100
            setTime(formatTimeFromSeconds(currentTime, duration));
            setDuration(formatTimeFromSeconds(duration));
            if (update.pending) {
                setUpdate({
                    pending: false,
                    package: null
                })
            } else {
                setProgress(playedPercent)
            }
        }, 200);
        return () => {
            return clearInterval(intervalId);
        };

    }, [context.player, update]);


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
      //  m = (m > 0 || maxTimeAboveMinute ? (m < 10 ? "0" + m : m) + ":" : "")
        m = (m < 10 ? "0" + m : m) + ":"
        s = parseInt(s)
        s = s < 10 ? "0" + s : s;
        return "" + h + m + s;
    }

    function changeSongPosition(e) {
        setUpdate({
            pending: false,
            package: Number(e.target.value)
        })
        setProgress(Number(e.target.value))
    }


    function mouseUp() {
        let newPosition = context.player.getDuration() * (Number(update.package) / 100)
        context.player.seekTo(newPosition, true)
        setUpdate({
            ...update,
            pending: true
        })
    }
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
                    onMouseUp={mouseUp}
                    type="range"
                    style={{width: '100%'}}
                />

            </div>
        </div>
    )
}

export default Progressbar
