package com.grupp6.backend.repositories;

import com.grupp6.backend.models.DTO.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDTO, Long> {
    UserDTO findByEmail(String user);
}
