/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.devnexus.tv.api.create_session;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Objects;

/**
 *
 * @author secondsun
 */
public class AnonymousSession {
    
    @JsonProperty(value = "fcm_token")
    private final String fcmToken;
    
    @JsonProperty(value = "id_token")
    private final String idToken;

    @JsonCreator
    public AnonymousSession(@JsonProperty("fcm_token") String fcm_token, @JsonProperty("id_token") String id_token) {
        this.fcmToken = fcm_token.trim();
        this.idToken = id_token.trim();
    }

    @JsonProperty(value = "fcm_token")
    @com.fasterxml.jackson.annotation.JsonIgnore
    public String getFcmToken() {
        return fcmToken;
    }

    @JsonProperty(value = "id_token")
    @com.fasterxml.jackson.annotation.JsonIgnore
    public String getIdToken() {
        return idToken;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.fcmToken);
        hash = 29 * hash + Objects.hashCode(this.idToken);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AnonymousSession other = (AnonymousSession) obj;
        if (!Objects.equals(this.fcmToken, other.fcmToken)) {
            return false;
        }
        if (!Objects.equals(this.idToken, other.idToken)) {
            return false;
        }
        return true;
    }
    
    
    
}
