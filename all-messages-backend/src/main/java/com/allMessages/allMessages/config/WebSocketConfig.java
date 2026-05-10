package com.allMessages.allMessages.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Define que mensagens enviadas pelo servidor começam com /topic
        config.enableSimpleBroker("/topic");
        // Define que mensagens vindas do cliente (React) começam com /app
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // O endereço que o React vai usar para conectar: ws://localhost:8080/ws-allmessages
        registry.addEndpoint("/ws-allmessages")
                .setAllowedOrigins("http://localhost:5173") // Porta padrão do Vite/React
                .withSockJS();
    }
}
