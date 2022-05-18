package com.github.jayreturns.slserver.shared.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "keycloak")
public record KeycloakProperties(String authServerUrl, String realm) {
}
