package com.focusflow.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
        // Register the endpoint "/ws-neural-grid" that the frontend will use to connect
        registry.addEndpoint("/ws-neural-grid")
                .setAllowedOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry registry) {
        // Use "/topic" for broadcast messages (pub/sub)
        registry.enableSimpleBroker("/topic");
        
        // Application-side messages start with "/app"
        registry.setApplicationDestinationPrefixes("/app");
    }
}
