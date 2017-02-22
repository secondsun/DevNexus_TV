package org.devnexus.tv.server.service;

import org.devnexus.tv.api.create_session.AnonymousSession;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.devnexus.tv.server.beans.TempSessionHolder;

/**
 * Before a monitor can be administered, it must connect.  It does this by sending fcm_token and a id_key to this service
 * @author secondsun
 */
@ApplicationScoped
@Path("/public/monitor")
@Api(value = "/", tags = "monitor")
public class AnonymousMonitorConnect {
    
    @Inject
    private TempSessionHolder holder;
    
    @POST
    @Produces("application/json")
    @ApiOperation(value = "Provides credentials to add monitor to admin",
            notes = "",
            response = AnonymousSession.class
    )
    public AnonymousSession setup(AnonymousSession session) {
        
        return holder.put(session);
    }
    
    
}
