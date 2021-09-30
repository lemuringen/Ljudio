package com.grupp6.backend.services;

import com.grupp6.backend.configs.MyUserDetailsService;
import com.grupp6.backend.models.DTO.UserDTO;
import com.grupp6.backend.models.User;
import com.grupp6.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    public UserDTO findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(username);
    }

    public UserDTO registerUser(UserDTO user) {
        return myUserDetailsService.addUser(user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName()); }
}