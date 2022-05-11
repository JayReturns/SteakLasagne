package com.github.jayreturns.slserver.user.api;

import com.github.jayreturns.slserver.transaction.api.TransactionData;
import com.github.jayreturns.slserver.user.domain.User;
import com.github.jayreturns.slserver.user.domain.UserFactory;
import com.github.jayreturns.slserver.user.repository.UserRepository;
import com.github.jayreturns.slserver.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final UserDataFactory userDataFactory;
    private final UserFactory userFactory;

    public UserController(UserRepository userRepository, UserService userService, UserDataFactory userDataFactory, UserFactory userFactory) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.userDataFactory = userDataFactory;
        this.userFactory = userFactory;
    }

    @GetMapping("/all")
    public List<User> index(){
        return userService.Get_all();
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserData> createUser(@RequestBody @Valid UserData userData) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userDataFactory.from(userService.createUser(userFactory.from(userData))));
    }

    @GetMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserData getUser(@PathVariable(name = "id") String uuid) {
        return userDataFactory.from(userService.getUser(uuid));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserData> updateUser(@Valid @RequestBody UserData userData) {
        return ResponseEntity
                .ok(userDataFactory.from(userService.updateUser(userFactory.from(userData))));
    }

    @DeleteMapping(path = "{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
