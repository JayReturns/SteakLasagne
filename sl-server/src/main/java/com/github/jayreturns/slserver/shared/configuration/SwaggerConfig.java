package com.github.jayreturns.slserver.shared.configuration;

import com.github.jayreturns.slserver.shared.properties.KeycloakProperties;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition
public class SwaggerConfig {

    private static final String OAUTH_SCHEME_NAME = "oAuth";
    private static final String PROTOCOL_URL_FORMAT = "%s/realms/%s/protocol/openid-connect";

    @Bean
    public OpenAPI customOpenApi(KeycloakProperties keycloakProperties) {
        return new OpenAPI()
                .info(getInfo())
                .components(new Components()
                        .addSecuritySchemes(OAUTH_SCHEME_NAME, createOAuthScheme(keycloakProperties)))
                .addSecurityItem(new SecurityRequirement().addList(OAUTH_SCHEME_NAME));
    }

    private SecurityScheme createOAuthScheme(KeycloakProperties keycloakProperties) {
        OAuthFlows flows  = createOAuthFlows(keycloakProperties);

        return new SecurityScheme()
                .type(SecurityScheme.Type.OAUTH2)
                .flows(flows);
    }

    private OAuthFlows createOAuthFlows(KeycloakProperties keycloakProperties) {
        OAuthFlow flow = createAuthorizationCodeFlow(keycloakProperties);

        return new OAuthFlows()
                .authorizationCode(flow);
    }

    private OAuthFlow createAuthorizationCodeFlow(KeycloakProperties keycloakProperties) {
        var protocolUrl = PROTOCOL_URL_FORMAT.formatted(keycloakProperties.authServerUrl(), keycloakProperties.realm());

        return new OAuthFlow()
                .authorizationUrl(protocolUrl + "/auth")
                .tokenUrl(protocolUrl + "/token")
                .scopes(new Scopes().addString("openid", ""));
    }

    private Info getInfo() {
        return new Info()
                .title("SteakLasagne")
                .description("Expense Tracker for Anwendungsprojekt")
                .version("v1")
                .contact(getContact())
                .license(getLicense());
    }

    private Contact getContact() {
        return new Contact()
                .url("https://github.com/JayReturns/SteakLasagne")
                .name("Jan-Luca")
                .email("jan-luca-wolf@web.de");
    }

    private License getLicense() {
        return new License()
                .url("https://www.gnu.de/documents/gpl-3.0.en.html")
                .name("GNU General Public License v3.0");
    }

}
