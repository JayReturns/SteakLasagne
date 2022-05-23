package com.coderdude.sampleeventlistenerprovider.provider;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.*;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import org.json.JSONObject;
import org.json.simple.parser.ParseException;

import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;

import javax.json.Json;


public class SampleEventListenerProvider implements EventListenerProvider {

    private final String client_id = "get from Keycloak^^";
    private final String client_secret = "again, get from Keycloak^^";
    private final String keycloak_uri = "ask @AlexSchmitz";
    private final String backend_uri = "ask @AlexSchmitz";
    public SampleEventListenerProvider() {
    }

    @Override
    public void onEvent(Event event) {

        System.out.println(" LOL a Event Occurred:" + toString(event));
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

    private String getAccestoken() {

        String accestoken;

        HttpPost post = new HttpPost(keycloak_uri + "/auth/realms/SteakLasagne/protocol/openid-connect/token");
        List <NameValuePair> nvps = new ArrayList <>();
        nvps.add(new BasicNameValuePair("client_id", client_id));
        nvps.add(new BasicNameValuePair("client_secret", client_secret));
        nvps.add(new BasicNameValuePair("grant_type", "client_credentials"));
        nvps.add(new BasicNameValuePair("scpope","email"));

        try {
            post.setEntity(new UrlEncodedFormEntity(nvps));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        DefaultHttpClient httpClient = new DefaultHttpClient();

        try {
            HttpResponse response = httpClient.execute(post);

            System.out.println(response.getEntity().toString());
            HttpEntity test = response.getEntity();
            System.out.println(test.getContent().toString());

            String retSrc = EntityUtils.toString(response.getEntity());
            JSONObject result = new JSONObject(retSrc);

            return result.getString("access_token");

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void createnewUser(Event event) throws Exception {

        String authorizationString = "Bearer " + getAccestoken();

        //Post new User with Keycloak UserID to MariaDB

        String payload = Json.createObjectBuilder()
                .add("id", event.getUserId())
                .add("friendlyName", event.getDetails().get("username"))
                .add("currentAmount", 0)
                .build()
                .toString();

        StringEntity entity = new StringEntity(payload,
                ContentType.APPLICATION_FORM_URLENCODED);

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(backend_uri+"/api/v1/user/");
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
