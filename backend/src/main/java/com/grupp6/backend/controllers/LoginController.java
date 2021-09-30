package com.grupp6.backend.controllers;

import com.grupp6.backend.models.DTO.UserDTO;
import com.grupp6.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // prefix for all mappings in this controller
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring";
    }

    // get logged in user
    @GetMapping("/whoami")
    public UserDTO whoAmI() {
        return userService.findCurrentUser();
    }

    // register new user
    @PostMapping("/register")
    public UserDTO register(@RequestBody UserDTO user) {
        return userService.registerUser(user);
    }

}