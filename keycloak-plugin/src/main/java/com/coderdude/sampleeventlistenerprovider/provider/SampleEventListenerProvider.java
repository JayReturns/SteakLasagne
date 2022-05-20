package com.coderdude.sampleeventlistenerprovider.provider;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;

import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;

import java.util.*;


import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import javax.json.Json;


public class SampleEventListenerProvider implements EventListenerProvider {

    private final String accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6MGg3c3d4aElwcHFqdFh0XzdtVWlvR2JoeUdfUkUyVVFXT3RKampYdW5rIn0.eyJleHAiOjE2NTMwNzcxMDUsImlhdCI6MTY1MzA0MTEwNSwianRpIjoiOTVjNjMwYzMtZGZiNi00ZTkxLWI4NWItYTdmMzAwMjI0ZjRmIiwiaXNzIjoiaHR0cDovL3NlY3VyZXN0ZWFrLmRkbnMubmV0OjgwNjkvYXV0aC9yZWFsbXMvU3RlYWtMYXNhZ25lIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjYyNzUwMjZlLTkzODYtNGE1My1iNmQ2LTFjM2NkYzA2M2RkNiIsInR5cCI6IkJlYXJlciIsImF6cCI6InN0ZWFrLWxhc2FnbmUtZnJvbnRlbmQiLCJzZXNzaW9uX3N0YXRlIjoiOGJmOTgzNWUtYzlkZC00ZTg3LWIwNDYtNTc1NjY4YmUzYzdlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjQyMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc3RlYWtsYXNhZ25lIiwibWFuYWdlLXVzZXJzIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI4YmY5ODM1ZS1jOWRkLTRlODctYjA0Ni01NzU2NjhiZTNjN2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJQaGlsaXAgUmV4cm90aCIsInByZWZlcnJlZF91c2VybmFtZSI6InBoaWxpcCIsImdpdmVuX25hbWUiOiJQaGlsaXAiLCJmYW1pbHlfbmFtZSI6IlJleHJvdGgiLCJlbWFpbCI6InBoaWxpcHJleHJvdGhAZ21haWwuY29tIn0.MOBe49dkABPfEnsp71wC9mEBMVvYiUyF23SYQgYgkGL2k6O2XXxhiLpCkLd2q-9S_vl5qIj809kSThcBCLxq_PL6XrL4mOZwsCF3VPfXW3a36-Jco9vaBeLM4JTWwLg1fXGj6B-ewtrAWwCxHU7hx7BgRlOzE7HGbgHKeuvoafFh7bYUb17al__2ue5T_Zufmyu7KpUnTq9x7Qh9UKqEfBM3d87L8opc-xfEm_k_Lcz3lGeZI86vFgo0dKh72uDVhciXx4fTbzNN0-CrPC8xT0Lu7gfI6YbOOqW1V2sjq-YmsBawlfEYWRjrd6ys1b5I3Pky8_qlRzS6jSSmv1MJuA";
    private final CloseableHttpClient httpClient = HttpClients.createDefault();
    private final String authorizationString = "Bearer " + accessToken;

    public SampleEventListenerProvider() {
    }

    @Override
    public void onEvent(Event event) {

        System.out.println(" LOL a Event Occurred:" + toString(event));

        System.out.println("Username:" + event.getDetails().get("username"));
        if (event.getType() == EventType.REGISTER){
            try {
                createnewUser(event);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void onEvent(AdminEvent adminEvent, boolean b) {

        System.out.println("Admin Event Occurred:" + toString(adminEvent));
    }

    @Override
    public void close() {

    }

    private void createnewUser(Event event) throws Exception {

        //Post new User with Keycloak UserID to MariaDB

        String payload = Json.createObjectBuilder()
                .add("id", event.getUserId())
                .add("friendlyName", event.getDetails().get("username"))
                .add("currentAmount", 0)
                .build()
                .toString();

        System.out.println(payload);

        System.out.println(payload);

        StringEntity entity = new StringEntity(payload,
                ContentType.APPLICATION_FORM_URLENCODED);

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost("http://localhost:8080/api/v1/user/");
        request.setEntity(entity);
        request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        request.setHeader(HttpHeaders.AUTHORIZATION, authorizationString);

        HttpResponse response = httpClient.execute(request);
        System.out.println(response.getStatusLine().getStatusCode());
    }

    private String toString(Event event) {

        StringBuilder sb = new StringBuilder();


        sb.append("type=");

        sb.append(event.getType());

        sb.append(", realmId=");

        sb.append(event.getRealmId());

        sb.append(", clientId=");

        sb.append(event.getClientId());

        sb.append(", userId=");

        sb.append(event.getUserId());

        sb.append(", ipAddress=");

        sb.append(event.getIpAddress());


        if (event.getError() != null) {

            sb.append(", error=");

            sb.append(event.getError());

        }


        if (event.getDetails() != null) {

            for (Map.Entry<String, String> e : event.getDetails().entrySet()) {

                sb.append(", ");

                sb.append(e.getKey());

                if (e.getValue() == null || e.getValue().indexOf(' ') == -1) {

                    sb.append("=");

                    sb.append(e.getValue());

                } else {

                    sb.append("='");

                    sb.append(e.getValue());

                    sb.append("'");

                }

            }

        }


        return sb.toString();

    }


    private String toString(AdminEvent adminEvent) {

        StringBuilder sb = new StringBuilder();


        sb.append("operationType=");

        sb.append(adminEvent.getOperationType());

        sb.append(", realmId=");

        sb.append(adminEvent.getAuthDetails().getRealmId());

        sb.append(", clientId=");

        sb.append(adminEvent.getAuthDetails().getClientId());

        sb.append(", userId=");

        sb.append(adminEvent.getAuthDetails().getUserId());

        sb.append(", ipAddress=");

        sb.append(adminEvent.getAuthDetails().getIpAddress());

        sb.append(", resourcePath=");

        sb.append(adminEvent.getResourcePath());


        if (adminEvent.getError() != null) {

            sb.append(", error=");

            sb.append(adminEvent.getError());

        }


        return sb.toString();

    }
}
