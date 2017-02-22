package org.devnexus.tv.server.beans;

import java.util.HashMap;
import java.util.Optional;
import javax.enterprise.context.ApplicationScoped;
import org.devnexus.tv.server.service.AnonymousMonitorConnect;
import org.devnexus.tv.api.create_session.AnonymousSession;

/**
 * Holds the temporary sessions sent to {@link AnonymousMonitorConnect}
 * @author secondsun
 */
@ApplicationScoped
public class TempSessionHolder {

    HashMap<String, AnonymousSession> sessions = new HashMap<>();

    
    public AnonymousSession put(AnonymousSession session) {
        sessions.put(session.getIdToken(), session);
        return session;
    }
    
    public Optional<AnonymousSession> get(String idToken) {
        return Optional.<AnonymousSession>ofNullable(sessions.get(idToken));
    }
    
    public void list() {
        sessions.keySet().forEach(System.out::println);
    }
    
}
