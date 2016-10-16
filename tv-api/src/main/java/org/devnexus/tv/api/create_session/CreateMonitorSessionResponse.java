
package org.devnexus.tv.api.create_session;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.Objects;

public final class CreateMonitorSessionResponse implements Serializable {
    
    private final String sessionId;
      
    @JsonCreator
    public CreateMonitorSessionResponse(@JsonProperty("sessionId") String sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 37 * hash + Objects.hashCode(this.sessionId);
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
        final CreateMonitorSessionResponse other = (CreateMonitorSessionResponse) obj;
        if (!Objects.equals(this.sessionId, other.sessionId)) {
            return false;
        }
        return true;
    }
    
    
    
}
