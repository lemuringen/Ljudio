package com.grupp6.backend.DAO;

import com.grupp6.backend.models.DTO.PlaylistDTO;
import com.grupp6.backend.models.Playlist;
import com.grupp6.backend.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PlaylistDAO {
    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistDAO(PlaylistRepository playlistRepository) {
       this.playlistRepository = playlistRepository;
    }

    public PlaylistDTO addPlaylist(PlaylistDTO playlistDTO) {
        return playlistRepository.save(playlistDTO);
    }

    public List<PlaylistDTO> getPlaylists(Long userId) {
       return playlistRepository.findAllByUserId(userId);
    }

    /* Unimplemented
    public void deletePlaylist(Long playlistId) {

    }
    */

/* Unimplemented
    public Optional<PlaylistDTO> findPlaylistById(Long id) {
        return null;
    }
*/
}
