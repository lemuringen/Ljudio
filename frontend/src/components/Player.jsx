import React from 'react'

function player() {
    return (
        <footer id="footer">
            <div class="player-nav">
                <div>
                    <button>Previous</button>
                </div>

                <div>
                    <button>Play</button>
                </div>

                <div>
                    <button>Next</button>
                </div>
            </div>
            <div class="time-nav">
                <div id="current-time">00:00</div>
                <div id="total-time">00:00</div>
            </div>
            <div class="progressbar-nav">
                <div id="progressbar"></div>
            </div>
        </footer>
    )
}

export default player