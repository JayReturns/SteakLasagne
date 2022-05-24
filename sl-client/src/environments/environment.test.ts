import {KeycloakConfig} from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url:'https://steaklasagne.9o39s4ozwydzwq2z.myfritz.net:8001/auth',
  realm: 'SteakLasagne',
  clientId: 'steak-lasagne-frontend'
}

export const environment = {
  production: false,
  name: 'test',
  baseApiUrl: "https://steaklasagne.9o39s4ozwydzwq2z.myfritz.net:8000/api/v1",
  keycloak: keycloakConfig,
  keycloakRedirectUri: "http://localhost:4200/"
};
