package com.grupp6.backend.repositories;

import com.grupp6.backend.models.DTO.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
// todo temporary fix, should handle User instead of UserDTO
public interface UserRepository extends JpaRepository<UserDTO, Long> {
    UserDTO findByEmail(String user);
}
