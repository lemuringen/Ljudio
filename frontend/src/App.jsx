import React from 'react'
import './App.css'
import './Navigation.css'
import Navigation from './components/Navigation'
import Player from './components/player'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'

function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />
      </Router>

      <main>

        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/PlaylistPage" exact component={PlaylistPage} />
        </Router>

      </main>


      <Player />

    </div >
  )
}

export default App

