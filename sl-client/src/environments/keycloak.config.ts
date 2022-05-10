import {KeycloakConfig} from "keycloak-js";

const KeycloakConfig: KeycloakConfig = {
  url:'localhost:8081/auth',
  realm: 'SeakLasagne',
  clientId: 'Angular',
};

export default KeycloakConfig;
