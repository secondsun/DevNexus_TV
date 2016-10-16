package org.devnexus.tv.server.configure;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

@Provider
public class JacksonMapperProvider implements ContextResolver<ObjectMapper>{

    private static final ObjectMapper DEFAULT_OBJECT_MAPPER;
    
    static {
        System.out.println("Creating Object Mapper");
        DEFAULT_OBJECT_MAPPER = new ObjectMapper();
        
        DEFAULT_OBJECT_MAPPER.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        
    }
    

    @Override
    public ObjectMapper getContext(Class<?> type) {
        System.out.println("Getting Object Mapper 2");
        return DEFAULT_OBJECT_MAPPER;
    }
    
}
