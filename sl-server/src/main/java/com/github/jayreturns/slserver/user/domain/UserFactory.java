package com.github.jayreturns.slserver.user.domain;

import com.github.jayreturns.slserver.user.api.UserData;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {

    /**
     * Converts {@link UserData} to {@link User}
     * @param userData The TransactionData to convert
     * @return The converted {@link User}
     */
    public User from(UserData userData) {
        User user = new User();

        user.setId(userData.getId());
        user.setFriendlyName(userData.getFriendlyName());
        user.setCurrentAmount((long) (userData.getCurrentAmount()*100));

        return user;
    }

}
