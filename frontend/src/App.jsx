import React, {createContext, useState} from 'react'

import './App.css'
import './Navigation.css'
import './Login.css'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import Navigation from './components/Navigation'
import Player from './components/Player'
import Login from './pages/Login'

function App() {

    return (
        <div className="App">
            <Router>
                <Navigation />
                <Route path="/" exact component={HomePage} />
                <Route path="/PlaylistPage" exact component={PlaylistPage} />
                <Route path="/Login" exact component={Login} />
                <Route path="/Register" exact component={RegisterPage} />
            </Router>
            <main>
            </main>
            {/* update current song whenever the videoId changes */}
            <Player />

      </div>
    )
}

export default App

