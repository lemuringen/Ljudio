import React, {createContext, useState} from 'react'
import { PlayerContext } from './contexts/PlayerContext'
import{ProgressbarContext} from "./contexts/ProgressbarContext";

import './App.css'
import './Navigation.css'


import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import Navigation from './components/Navigation'
import Player from './components/Player'

function App() {


    return (
        <div className="App">
            <Router>
                <Navigation/>
                <Route path="/" exact component={HomePage}/>
                <Route path="/PlaylistPage" exact component={PlaylistPage}/>
            </Router>

            <main>


            </main>
            {/* update current song whenever the videoId changes */}
            <Player />

        </div>
    )
}

export default App

