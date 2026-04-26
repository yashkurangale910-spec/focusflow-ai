package com.focusflow.backend.service;

import com.focusflow.backend.annotation.AuditAction;
import com.focusflow.backend.domain.Memory;
import com.focusflow.backend.dto.ChatResponse;
import com.focusflow.backend.repository.MemoryRepository;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    private final WebClient webClient;
    private final MemoryRepository memoryRepository;

    @Value("${ai.groq.api-key:}")
    private String groqApiKey;

    @Value("${ai.groq.base-url}")
    private String groqBaseUrl;

    @Value("${ai.groq.model}")
    private String groqModel;

    @Value("${ai.openai.api-key:}")
    private String openaiApiKey;

    @Value("${ai.openai.base-url}")
    private String openaiBaseUrl;

    @Value("${ai.openai.model}")
    private String openaiModel;

    private final Cache<String, Bucket> rateLimitCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterAccess(Duration.ofMinutes(10))
            .build();

    private final Map<String, String> responseCache = Collections.synchronizedMap(new HashMap<>());

    private static final Map<String, List<String>> OFFLINE_RESPONSES = Map.of(
        "focus", List.of(
            "Focus follows environment. Try the **'Phone Jail'** rule: Put your phone in another room. 📱💨",
            "Neuroscience tip: Your brain can't multitask. Stick to ONE thing! 🧠"
        ),
        "stuck", List.of(
            "Starting is the hardest part. Commit to JUST 2 minutes. ⏱️",
            "If you're stuck, use the **🎲 Swiss Cheese** method: Poke a tiny hole in the task."
        ),
        "overwhelm", List.of(
            "Overwhelm is just a lack of clarity. 🧩",
            "Try the **1-3-5 Rule**: Pick 1 Big thing, 3 Medium things, and 5 Small things. Forget everything else."
        ),
        "planning", List.of(
            "Let's align your day with 🔋 **Energy Levels**.",
            "Try **Time Boxing**: Give yourself a strict 60-minute window for this task. 📦"
        ),
        "greeting", List.of(
            "Neural Link Established. I am your **Neural Coach**. 🧠",
            "Hello, Pioneer! I'm here for the mental heavy lifting."
        )
    );

    public AIService(WebClient webClient, MemoryRepository memoryRepository) {
        this.webClient = webClient;
        this.memoryRepository = memoryRepository;
    }

    public boolean isRateLimited(String userId) {
        Bucket bucket = rateLimitCache.get(userId, k ->
            Bucket.builder()
                .addLimit(Bandwidth.builder().capacity(10).refillGreedy(10, Duration.ofMinutes(1)).build())
                .build()
        );
        return !bucket.tryConsume(1);
    }

    @AuditAction("AI Chat Request")
    @CircuitBreaker(name = "aiService", fallbackMethod = "fallbackChat")
    @Retry(name = "aiService")
    public ChatResponse chat(String userId, List<Map<String, String>> messages) {
        String cacheKey = userId + "_" + Objects.hash(messages.get(messages.size()-1));
        if (responseCache.containsKey(cacheKey)) return new ChatResponse(responseCache.get(cacheKey));

        String context = getArchiveContext(userId);
        List<Map<String, String>> apiMessages = new ArrayList<>();
        apiMessages.add(Map.of("role", "system", "content", "You are the Neural Coach. Actionable solutions only. " + context));
        apiMessages.addAll(messages);

        String result = null;
        if (groqApiKey != null && !groqApiKey.isBlank()) result = callAiApi(groqBaseUrl, groqApiKey, groqModel, apiMessages);
        if (result == null && openaiApiKey != null && !openaiApiKey.isBlank()) result = callAiApi(openaiBaseUrl, openaiApiKey, openaiModel, apiMessages);

        if (result == null) throw new RuntimeException("AI Providers unavailable");
        responseCache.put(cacheKey, result);
        return new ChatResponse(result);
    }

    public ChatResponse fallbackChat(String userId, List<Map<String, String>> messages, Throwable t) {
        String lastUserMsg = messages.stream().filter(m -> "user".equals(m.get("role"))).reduce((a, b) -> b).map(m -> m.get("content")).orElse("");
        return new ChatResponse(getMockResponse(lastUserMsg));
    }

    @AuditAction("Save Insight Memory")
    public Memory saveMemory(String userId, String context, Map<String, Object> metadata) {
        return memoryRepository.save(new Memory(userId, context, metadata));
    }

    private String getArchiveContext(String userId) {
        try {
            List<Memory> recent = memoryRepository.findTop5ByUserIdOrderByTimestampDesc(userId);
            if (recent.isEmpty()) return "";
            StringBuilder sb = new StringBuilder("\n\n[ARCHIVE]:\n");
            recent.forEach(m -> sb.append("- ").append(m.getContext()).append("\n"));
            return sb.toString();
        } catch (Exception e) { return ""; }
    }

    @SuppressWarnings("unchecked")
    private String callAiApi(String baseUrl, String apiKey, String model, List<Map<String, String>> messages) {
        try {
            Map<String, Object> response = webClient.post()
                    .uri(baseUrl + "/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(Map.of("model", model, "messages", messages))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block(Duration.ofSeconds(15));
            if (response != null && response.get("choices") instanceof List choices && !choices.isEmpty()) {
                return (String) ((Map<String, Object>) ((Map<String, Object>) choices.get(0)).get("message")).get("content");
            }
        } catch (Exception e) { log.error("API Error: {}", e.getMessage()); }
        return null;
    }

    private String getMockResponse(String message) {
        String msg = message.toLowerCase();
        String c = "greeting";
        if (msg.contains("focus")) c = "focus";
        else if (msg.contains("stuck")) c = "stuck";
        else if (msg.contains("overwhelm")) c = "overwhelm";
        else if (msg.contains("plan")) c = "planning";
        List<String> pool = OFFLINE_RESPONSES.getOrDefault(c, OFFLINE_RESPONSES.get("greeting"));
        return pool.get(ThreadLocalRandom.current().nextInt(pool.size()));
    }
}
