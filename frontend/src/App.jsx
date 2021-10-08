import React from 'react'
import { useEffect } from 'react'
import './App.css'
import './Navigation.css'
import './Login.css'
import Navigation from './components/Navigation'
import Player from './components/player'


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'


function App() {

  useEffect(() => {
    callSpringboot()
  }, [])

  async function callSpringboot() {
    let response = await fetch('/api/hello')
    let message = await response.text()
    console.log(message);
  }

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


      <Player />

    </div >
  )
}

export default App

