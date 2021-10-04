package com.grupp6.backend.DAO;

import com.grupp6.backend.models.DTO.UserDTO;
import com.grupp6.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

    private final UserRepository userRepository;

    @Autowired
    public UserDAO(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDTO save(UserDTO userDTO) {
        return userRepository.save(userDTO);
    }
}
