package org.devnexus.tv.server.service;

import java.util.UUID;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.devnexus.tv.api.create_session.CreateMonitorSessionRequest;
import org.devnexus.tv.api.create_session.CreateMonitorSessionResponse;

/**
 *
 * This class provides services for Monitors to register themselves with the
 * system.
 *
 * @author summers
 */
@Path("/monitor")
public class MonitorSessionEndpoint {

    @POST
    @Produces("application/json")
    public CreateMonitorSessionResponse createSession(CreateMonitorSessionRequest request) {
        System.out.println("Hello world 2");
        return new CreateMonitorSessionResponse(UUID.randomUUID().toString());
    }

    
    
}
