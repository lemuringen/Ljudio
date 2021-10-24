package com.grupp6.backend.services;


import com.grupp6.backend.DAO.PlaylistDAO;
import com.grupp6.backend.models.DTO.PlaylistDTO;
import com.grupp6.backend.models.Playlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {
    private final PlaylistDAO playlistDAO;

    @Autowired
    public PlaylistService(PlaylistDAO playlistDAO) {
        this.playlistDAO = playlistDAO;
    }
    public Playlist mapToPlaylist(PlaylistDTO playlistDTO){
        return new Playlist(playlistDTO.getId(),
                playlistDTO.getName(),
                playlistDTO.getTrackIds()); //enough to copy reference?
    }
    public PlaylistDTO mapFromPlaylist(Playlist playlist){
        return new PlaylistDTO(playlist.getId(),
                playlist.getName(),
                playlist.getTrackIds());
    }

    public Playlist addPlaylist(Playlist playlist) {
        PlaylistDTO playlistDTO = playlistDAO.addPlaylist(mapFromPlaylist(playlist));
        return mapToPlaylist(playlistDTO);
    }
}
