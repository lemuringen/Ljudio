package com.grupp6.backend.services;

import com.grupp6.backend.DAO.UserDAO;
import com.grupp6.backend.configs.MyUserDetailsService;
import com.grupp6.backend.models.DTO.UserDTO;
import com.grupp6.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final MyUserDetailsService myUserDetailsService;
    private final UserDAO userDAO;
    @Autowired
    public UserService(MyUserDetailsService myUserDetailsService, UserDAO userDAO) {
        this.myUserDetailsService = myUserDetailsService;
        this.userDAO = userDAO;
    }

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return mapToUser(userDAO.findByEmail(username));
    }

    public User registerUser(User user) {
        UserDTO userDTO = myUserDetailsService.addUser(mapFromUser(user));
        return mapToUser(userDTO);
    }
//    public User login(User user){
////        myUserDetailsService.
//    }

    public UserDTO mapFromUser(User user) {
        return new UserDTO(user.getId(), user.getEmail(),user.getPassword(), user.getFirstName(), user.getLastName());
    }
    public User mapToUser(UserDTO userDTO){
        return new User(userDTO.getId(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getFirstName(), userDTO.getLastName());
    }
}