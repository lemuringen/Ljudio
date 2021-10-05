package com.grupp6.backend.repositories;

import com.grupp6.backend.models.DTO.PlaylistDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<PlaylistDTO, Long> {
}
