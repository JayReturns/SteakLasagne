package com.github.jayreturns.slserver.user.service;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.user.domain.User;
import com.github.jayreturns.slserver.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> Get_all(){
        return userRepository.findAll();
    }

    /**
     * Create a new {@link User}
     * @param user The user to create. UUID can be null
     * @return The create {@link User}
     */
    public User createUser(User user) {
        user.setId(UUID.randomUUID().toString());

        return userRepository.save(user);
    }

    /**
     * Returns the {@link User} with {@code ID}
     * @param id UUID to get
     * @return Transaction with corresponding {@code ID}
     */
    public User getUser(String id) {
        return userRepository.findById(id).orElseThrow();
    }
}
