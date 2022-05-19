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
        if (user.getId().isEmpty()){user.setId(UUID.randomUUID().toString());}

        return userRepository.save(user);
    }

    /**
     * Returns the {@link User} with {@code ID}
     * @param id UUID to get
     * @return Transaction with corresponding {@code ID}
     */
    public User getUser(String id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setCurrentAmount(user.getCurrentAmount()/100);

        return user;

    }

    /**
     * The User with {@code id} of {@code newUser} will be overwritten
     * @param newUser The new User object
     * @return The updated {@link User}
     */
    public User updateUser(User newUser) {
        User user = userRepository.findById(newUser.getId()).orElseThrow();

        user.setId(newUser.getId());
        user.setFriendlyName(newUser.getFriendlyName());
        user.setCurrentAmount(newUser.getCurrentAmount()*100);

        return userRepository.save(user);
    }

    /**
     * Delete the user with {@code id}
     * @param id UUID of User
     */
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
