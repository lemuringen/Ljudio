package com.grupp6.backend.repositories;

import com.grupp6.backend.models.DTO.PlaylistDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<PlaylistDTO, Long> {
    List<PlaylistDTO> findAllByUserId(Long userId);
}
