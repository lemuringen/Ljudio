package com.grupp6.backend.controllers;


import com.grupp6.backend.models.Playlist;
import com.grupp6.backend.services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistsController {
    private PlaylistService playlistService;

    @Autowired
    public PlaylistsController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }
    @PostMapping("/add-playlist")
    public Playlist addPlayList(@RequestBody Playlist playlist){
        return playlistService.addPlaylist(playlist);
    }
}
