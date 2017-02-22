package org.devnexus.tv.server.service;

import org.devnexus.tv.api.create_session.AnonymousSession;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.devnexus.tv.server.beans.TempSessionHolder;
import org.devnexus.tv.server.vo.Monitor;

/**
 *
 * This class provides services for Monitors to register themselves with the
 * system.
 *
 * @author summers
 */
@ApplicationScoped
@Path("/secure/monitor")
@Api(value = "/", tags = "monitor")
public class MonitorSessionEndpoint {
    
    @Inject
    private TempSessionHolder holder;

    @PersistenceContext(unitName = "monitor_db")
    private EntityManager em;

    @POST
    @Produces("application/json")
    @ApiOperation(value = "Connects a monitor to the admin",
            response = AnonymousSession.class
    )
    @Transactional
    public AnonymousSession promoteToManaged(AnonymousSession request) {
        
        holder.list();
        
        AnonymousSession session = holder.get(request.getIdToken()).orElseThrow(() -> {
            return new IllegalArgumentException(request.getIdToken() + " not found in pending sessions");
        });

        
        try {
            Monitor m = new Monitor();
            m.setFcmToken(session.getFcmToken());
            m.setName(session.getIdToken());
            m.setScreen("loaded");
            
            em.persist(m);
            em.flush();
            
            return session;
        } finally {
        }
    }

}
