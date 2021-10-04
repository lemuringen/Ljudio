package com.grupp6.backend.controllers;

import com.grupp6.backend.models.DTO.UserDTO;
import com.grupp6.backend.models.User;
import com.grupp6.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login") // prefix for all mappings in this controller
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring";
    }

    // get logged in user
    @GetMapping("/whoami")
    public User whoAmI() {
        return userService.findCurrentUser();
    }

    // register new user
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

}