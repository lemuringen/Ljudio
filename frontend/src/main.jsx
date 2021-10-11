import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import PlayerContextProvider from './contexts/PlayerContext'
import ProgressbarContextProvider from "./contexts/ProgressbarContext";

ReactDOM.render(
    <React.StrictMode>
        <PlayerContextProvider>
            <ProgressbarContextProvider>
                <App/>
            </ProgressbarContextProvider>
        </PlayerContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
