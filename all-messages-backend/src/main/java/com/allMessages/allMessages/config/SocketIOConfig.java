package com.allMessages.allMessages.config;


import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.Bean;
import com.corundumstudio.socketio.Configuration;

@org.springframework.context.annotation.Configuration
public class SocketIOConfig {

    @Bean
    public SocketIOServer socketIOServer(){
        Configuration config = new Configuration();
        config.setHostname("0.0.0.0");
        config.setPort(8085);
        config.setOrigin("http://localhost:5173");


        final SocketIOServer socketIOServer = new SocketIOServer(config);
        return socketIOServer;
    }
}
