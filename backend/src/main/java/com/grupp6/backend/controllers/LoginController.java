package com.grupp6.backend.controllers;

import com.grupp6.backend.models.User;
import com.grupp6.backend.services.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
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