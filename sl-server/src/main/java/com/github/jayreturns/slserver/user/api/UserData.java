package com.github.jayreturns.slserver.user.api;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * DTO for {@link com.github.jayreturns.slserver.user.domain.User}
 */
@Data
public class UserData {

    private String Id;

    @NotBlank
    private String FriendlyName;

    private Double CurrentAmount;
}
