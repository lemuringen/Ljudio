package com.grupp6.backend.services;


import com.grupp6.backend.DAO.PlaylistDAO;
import com.grupp6.backend.models.DTO.PlaylistDTO;
import com.grupp6.backend.models.Playlist;
import com.grupp6.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaylistService {
    private final PlaylistDAO playlistDAO;
    private final UserService userService;

    @Autowired
    public PlaylistService(PlaylistDAO playlistDAO, UserService userService) {
        this.playlistDAO = playlistDAO;
        this.userService = userService;
    }

    public Playlist mapToPlaylist(PlaylistDTO playlistDTO) {
        return new Playlist(playlistDTO.getId(),
                playlistDTO.getUserId(),
                playlistDTO.getName(),
                playlistDTO.getTrackIds()); //enough to copy reference?
    }

    public PlaylistDTO mapFromPlaylist(Playlist playlist) {
        return new PlaylistDTO(playlist.getId(),
                playlist.getUserId(),
                playlist.getName(),
                playlist.getTrackIds());
    }

    public Playlist addPlaylist(Playlist playlist) {
        playlist.setUserId(userService.findCurrentUser().getId());
        PlaylistDTO playlistDTO = playlistDAO.addPlaylist(mapFromPlaylist(playlist));
        return mapToPlaylist(playlistDTO);
    }

    public List<Playlist> getPlaylists() {
        List<PlaylistDTO> playlistDTOS = playlistDAO.getPlaylists(userService.findCurrentUser().getId());
        return playlistDTOS.stream().map(playlistDTO -> mapToPlaylist(playlistDTO)).collect(Collectors.toList());
    }
}
