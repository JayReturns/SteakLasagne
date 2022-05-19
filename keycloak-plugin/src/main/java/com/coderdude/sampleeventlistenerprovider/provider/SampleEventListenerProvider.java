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

    private final String accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6MGg3c3d4aElwcHFqdFh0XzdtVWlvR2JoeUdfUkUyVVFXT3RKampYdW5rIn0.eyJleHAiOjE2NTI5NTU0MTUsImlhdCI6MTY1MjkxOTQxNSwianRpIjoiNzM5ODcwYzktNWZiZi00ZjE4LTkzMjMtZDQ5YzcyMzEwMmYwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgxL2F1dGgvcmVhbG1zL1N0ZWFrTGFzYWduZSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiJjYzdhZWI0NC05NTdkLTRjNjUtYmJmZC1iOTQ1NDkyYTQ3NGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzdGVhay1sYXNhbmdlLWJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiMjgzNGMzNjEtN2ZiNS00OWVlLWI2MTgtNzI3NzViMDBjNzRkIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXN0ZWFrbGFzYWduZSIsIm1hbmFnZS11c2VycyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMjgzNGMzNjEtN2ZiNS00OWVlLWI2MTgtNzI3NzViMDBjNzRkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.IitT_55_tesnXTracLbuzzCQuHQKXBU566VhL4ZELj8YRALc1VYcTVevCOn7x4Q7sMNQPJ3KNxLJH8BnIn9TGvOKxk4Q01Jqeaut6YYEOByCKULb8A0OOStymMZO2uv86-bfzv9U8WvWMEPMtsRD2nBR3V2weFtF__ZkIjve9kRGDENboodhEHpNoijF-Ovsty0Z2COwk6_wpC1MCJgV95QBomcdrCXi0wpVI04dnQzzjBG8kPJ1jJZMa29d-BX-uMX_bS06mFLRNhvc1jFNdMsV-bJyqA-gcCbfaVVW0fhDkf2HUoqVPaEdYNmQYz0iP-CagP3d2e25g6mvfQnb1g";
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