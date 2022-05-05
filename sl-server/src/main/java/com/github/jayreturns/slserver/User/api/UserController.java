package com.github.jayreturns.slserver.User.api;

import com.github.jayreturns.slserver.User.domain.User;
import com.github.jayreturns.slserver.User.repository.UserRepository;
import com.github.jayreturns.slserver.User.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserRepository userRepository;
    private UserService userService;

    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }
    @GetMapping("")
    public List<User> index(){

        return userService.Get_all();
    }
}
