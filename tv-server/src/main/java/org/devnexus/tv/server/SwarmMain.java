package org.devnexus.tv.server;

import org.wildfly.swarm.Swarm;
import org.wildfly.swarm.config.undertow.Server;
import org.wildfly.swarm.config.undertow.BufferCache;
import org.wildfly.swarm.config.undertow.FilterConfiguration;
import org.wildfly.swarm.config.undertow.HandlerConfiguration;
import org.wildfly.swarm.config.undertow.ServletContainer;
import org.wildfly.swarm.config.undertow.configuration.ResponseHeader;
import org.wildfly.swarm.config.undertow.server.Host;
import org.wildfly.swarm.config.undertow.servlet_container.JSPSetting;
import org.wildfly.swarm.config.undertow.servlet_container.WebsocketsSetting;
import org.wildfly.swarm.datasources.DatasourcesFraction;
import org.wildfly.swarm.spi.api.SocketBinding;
import org.wildfly.swarm.undertow.UndertowFraction;

public class SwarmMain {

    public static void main(String args[]) throws Exception {

        Swarm swarm = new Swarm();

        swarm.fraction(new UndertowFraction()
                .server(new Server("default-server")
                        .httpListener("default", (listener) -> {
                            listener.socketBinding("http")
                                    .redirectSocket("proxy-https")
                                    .proxyAddressForwarding(true);

                        })
                        .host(new Host("default-host")
                                .filterRef("server-header")
                                .filterRef("x-powered-by-header")
                                .filterRef("Access-Control-Allow-Origin")
                                .filterRef("Access-Control-Allow-Methods")
                                .filterRef("Access-Control-Allow-Headers")
                                .filterRef("Access-Control-Allow-Credentials")
                                .filterRef("Access-Control-Max-Age")
                        ))
                .bufferCache(new BufferCache("default"))
                .servletContainer(new ServletContainer("default")
                        .websocketsSetting(new WebsocketsSetting())
                        .jspSetting(new JSPSetting()))
                .handlerConfiguration(new HandlerConfiguration())
                .filterConfiguration(new FilterConfiguration()
                        .responseHeader(new ResponseHeader("server-header").headerName("Server").headerValue("DevNexus TV Monitor"))
                        .responseHeader(new ResponseHeader("x-powered-by-header").headerValue("WildFly-Swarm " + Swarm.VERSION).headerName("X-Powered-By"))
                        .responseHeader(new ResponseHeader("Access-Control-Allow-Origin").headerName("Access-Control-Allow-Origin").headerValue("*"))
                        .responseHeader(new ResponseHeader("Access-Control-Allow-Methods").headerName("Access-Control-Allow-Methods").headerValue("OPTIONS, GET, POST, PUT, DELETE"))
                        .responseHeader(new ResponseHeader("Access-Control-Allow-Headers").headerName("Access-Control-Allow-Headers").headerValue("accept, authorization, content-type, x-requested-with"))
                        .responseHeader(new ResponseHeader("Access-Control-Allow-Credentials").headerName("Access-Control-Allow-Credentials").headerValue("true"))
                        .responseHeader(new ResponseHeader("Access-Control-Max-Age").headerName("Access-Control-Max-Age").headerValue("60"))
                )
        );

        
        swarm.fraction(new DatasourcesFraction()
                .jdbcDriver("org.postgresql", (d) -> {
                    d.driverClassName("org.postgresql.Driver");
                    d.xaDatasourceClass("org.postgresql.xa.PGXADataSource");
                    d.driverModuleName("org.postgresql");
                })
                .dataSource("monitorDS", (ds) -> {
                    ds.driverName("org.postgresql");
                    ds.connectionUrl("");
                    ds.userName("");
                    ds.password("");
                })
        );
        
        swarm.socketBinding("standard-sockets", new SocketBinding("proxy-https").port(443));

        swarm.start();
        swarm.deploy();
    }
}
