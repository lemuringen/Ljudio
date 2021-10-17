import React, {createContext, useState} from 'react'
import './css/App.css'
import './css/Navigation.css'
import './css/Login.css'
import './css/SwitchStyle.css'
import './css/Popup.css'
import './css/ArtistPage.css'

import {
    BrowserRouter as Router,
    Route,
    Link, Redirect, useHistory
} from 'react-router-dom'


import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import Navigation from './components/Navigation'
import Player from './components/Player'
import Login from './pages/Login'
import ArtistPage from "./pages/ArtistPage";


function App() {

    let history = useHistory();

    function requireAuth(){
        console.log("hej")
        if(isLoggedIn()){
            history.push("/");
        }else{
            history.push("/Login");
        }
    }

    return (
        <div className="App">

            <Router>
                <Navigation/>
                <Route exact path="/" component={HomePage} />
                <Route path="/PlaylistPage" exact component={PlaylistPage} />
                <Route path="/Login" exact component={Login}/>
                <Route path="/Register" exact component={RegisterPage}/>
                <Route path="/artist/:id" component={ArtistPage}/>
            </Router>
            <main>
            </main>
            {/* update current song whenever the videoId changes */}
            <Player/>
        </div>
    )

}

export default App

