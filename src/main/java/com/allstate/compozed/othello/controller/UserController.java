package com.allstate.compozed.othello.controller;

import com.allstate.compozed.othello.domain.User;
import com.allstate.compozed.othello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by localadmin on 4/3/17.
 */

@RestController
@RequestMapping("/user")
public class UserController {

    UserRepository userRepository;

    @Autowired
    public UserController (UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @PostMapping("/")
    public User registerUser(@RequestBody User user) {


        return userRepository.save(user);


    }
}
