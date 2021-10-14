import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import PlayerContextProvider from './contexts/PlayerContext'
import SearchContextProvider from "./contexts/SearchContext";

ReactDOM.render(
    <React.StrictMode>
        <PlayerContextProvider>

                <SearchContextProvider>
                <App/>
                </SearchContextProvider>
        </PlayerContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
