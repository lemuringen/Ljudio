package com.grupp6.backend.controllers;


import com.grupp6.backend.models.Playlist;
import com.grupp6.backend.services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistsController {
    private PlaylistService playlistService;

    @Autowired
    public PlaylistsController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping()
    public Playlist addPlayList(@RequestBody Playlist playlist) {
        return playlistService.addPlaylist(playlist);
    }

    @GetMapping()
    public List<Playlist> getAllPlaylistsByUser() {
        return playlistService.getPlaylists();
    }
}
