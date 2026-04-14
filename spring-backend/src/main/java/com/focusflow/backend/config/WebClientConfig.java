package com.focusflow.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Configures WebClient beans for external AI API calls (Groq, OpenAI).
 */
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(2 * 1024 * 1024))  // 2 MB buffer for large AI responses
                .build();
    }
}
