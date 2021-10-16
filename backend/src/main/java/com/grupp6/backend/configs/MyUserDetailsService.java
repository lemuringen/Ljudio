package com.grupp6.backend.configs;


import com.grupp6.backend.DAO.UserDAO;
import com.grupp6.backend.models.DTO.UserDTO;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class MyUserDetailsService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final UserDAO userDAO;

    public MyUserDetailsService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public BCryptPasswordEncoder getEncoder() {
        return encoder;
    }



    @PostConstruct
    private void createDefaultUsers() {
        if (userDAO.findByEmail("email") == null) {

            UserDTO userDTO = new UserDTO();
            userDTO.setEmail("dolor@velit.com");
            userDTO.setPassword("password");
            userDTO.setFirstName("firstName");
            userDTO.setLastName("lastName");
            addUser(userDTO);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDTO user = userDAO.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found by username: " + username);
        }
        return toUserDetails(user);
    }

    public UserDTO addUser(UserDTO userDTO) {
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        try {
            return userDAO.save(userDTO);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private UserDetails toUserDetails(UserDTO user) {
        // If you have a User entity you have to
        // use the userdetails User for this to work
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER").build();
    }
}