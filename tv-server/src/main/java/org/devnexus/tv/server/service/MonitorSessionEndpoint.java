package org.devnexus.tv.server.service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.UUID;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
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
@ApplicationScoped
@Path("/monitor")
@Api(value = "/", tags = "monitor")
public class MonitorSessionEndpoint {

    @POST
    @Produces("application/json")
    @ApiOperation(value = "Connects a monitor to the admin",
            notes = "This consumes a key and a GCM push id (fetch from the monitor's setup screen, and returns a server ID for the monitor.  As a side effect it will also push the server ID to the monitor and begin two way communicaiton it it.",
            response = String.class
    )
    public CreateMonitorSessionResponse createSession(CreateMonitorSessionRequest request) {
        return new CreateMonitorSessionResponse(UUID.randomUUID().toString());
    }

    @GET
    @Produces("application/json")
    @ApiOperation(value = "Connects a monitor to the admin",
            notes = "This consumes a key and a GCM push id (fetch from the monitor's setup screen, and returns a server ID for the monitor.  As a side effect it will also push the server ID to the monitor and begin two way communicaiton it it.",
            response = String.class
    )
    public String testAuth() {
        return "{\"successful\":true}";
    }
    
}
