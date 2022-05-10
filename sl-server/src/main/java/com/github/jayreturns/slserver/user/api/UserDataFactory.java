package com.github.jayreturns.slserver.user.api;

import com.github.jayreturns.slserver.user.domain.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDataFactory {

    /**
     * Converts {@link User} to {@link UserData}
     * @param user The User to convert
     * @return The converted {@link UserData}
     */
    public UserData from(User user) {
        UserData userData = new UserData();

        userData.setId(user.getId());
        userData.setFriendlyName(user.getFriendlyName());
        userData.setCurrentAmount(user.getCurrentAmount());

        return userData;
    }

    /**
     * Convert a list of {@link User} to a list of {@link UserData}
     * @param users The list to convert
     * @return The converted List of {@link UserData}
     */
    public List<UserData> from(List<User> users) {
        return users.stream()
                .map(this::from)
                .toList();
    }

}
