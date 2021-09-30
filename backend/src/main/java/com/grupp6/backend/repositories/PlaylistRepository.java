package com.grupp6.backend.repositories;

import com.grupp6.backend.entities.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
