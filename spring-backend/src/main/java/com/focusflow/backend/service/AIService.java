package com.focusflow.backend.service;

import com.focusflow.backend.domain.Memory;
import com.focusflow.backend.repository.MemoryRepository;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

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

    // Rate limiter: per-user Bucket4j buckets cached via Caffeine
    private final Cache<String, Bucket> rateLimitCache = Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterAccess(Duration.ofMinutes(10))
            .build();

    // Backup intelligence responses (migrated from ai.js)
    private static final Map<String, List<String>> OFFLINE_RESPONSES = Map.of(
        "focus", List.of(
            "Focus follows environment. Try the **'Phone Jail'** rule: Put your phone in another room. Physical distance = mental focus! 📱💨",
            "Try a **🌊 Neural Reset**: 1. Deep breath. 2. Close all tabs. 3. Set a 25-min timer. 4. One task only. Ready?",
            "Neuroscience tip: Your brain can't multitask. It just context-switches, costing you 20% of your cognitive energy. Stick to ONE thing! 🧠",
            "Try **Binaural Beats (40Hz)**. It syncs your brainwaves for deep cognitive work. Want to try a focus session with soundscapes?"
        ),
        "stuck", List.of(
            "Starting is the hardest part. Commit to JUST 2 minutes. The goal isn't the task; it's just the 2 minutes. ⏱️",
            "If you're stuck, use the **🎲 Swiss Cheese** method: Poke a tiny hole in the task by doing one small thing (like renaming a file).",
            "Activation energy is high right now. Let's lower it. What's the smallest, easiest sub-task you see?",
            "Momentum is built, not found. Do the absolute easiest thing on your list first to get the dopamine flowing! 🚀"
        ),
        "overwhelm", List.of(
            "Overwhelm is just a lack of clarity. Let's deconstruct! What's the 'big' thing causing the stress? 🧩",
            "Try the **1-3-5 Rule**: Pick 1 Big thing, 3 Medium things, and 5 Small things. Forget everything else for now.",
            "Your brain is in 'threat mode'. Let's dump everything on your mind onto a list. Offloading mental RAM instantly lowers anxiety. 🧠💨",
            "Complexity is the enemy of execution. Let's pick ONE micro-step and ignore the rest of the mountain."
        ),
        "planning", List.of(
            "Let's align your day with 🔋 **Energy Levels**: Do your hardest work during your peak (usually 2-4 hours after waking).",
            "Try **Time Boxing**: Give yourself a strict 60-minute window for this task. Constraints breed creativity! 📦",
            "The **Ivy Lee Method**: Write down the 6 most important tasks for tomorrow. Number them by priority. Start with #1. Simple.",
            "Don't manage time, manage energy. What's your top 'Must-Do' while you still have brain power? ⚡"
        ),
        "greeting", List.of(
            "Neural Link Established. I am your **Neural Coach**. How can I help you optimize your performance today? 🧠",
            "Systems Active. Ready to crush some tasks? Tell me what's on your mind and we'll optimize it. 🚀",
            "Hello, Pioneer! I'm here to handle the mental heavy lifting. What are we focusing on right now?"
        )
    );

    public AIService(WebClient webClient, MemoryRepository memoryRepository) {
        this.webClient = webClient;
        this.memoryRepository = memoryRepository;
    }

    /**
     * Check per-user rate limit: 10 requests per minute.
     */
    public boolean isRateLimited(String userId) {
        Bucket bucket = rateLimitCache.get(userId, k ->
            Bucket.builder()
                .addLimit(Bandwidth.classic(10, Refill.greedy(10, Duration.ofMinutes(1))))
                .build()
        );
        return !bucket.tryConsume(1);
    }

    /**
     * Process an AI chat request.
     * 1. Try Groq API
     * 2. If Groq fails, try OpenAI
     * 3. If both fail, return a mock response
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> chat(String userId, List<Map<String, String>> messages) {
        // Retrieve cognitive archive (recent memories)
        String archivedContext = "";
        try {
            List<Memory> recentMemories = memoryRepository.findTop5ByUserIdOrderByTimestampDesc(userId);
            if (!recentMemories.isEmpty()) {
                StringBuilder sb = new StringBuilder("\n\n[COGNITIVE_ARCHIVE_RETRIEVED]:\n");
                for (Memory m : recentMemories) {
                    sb.append("- ").append(m.getContext()).append("\n");
                }
                archivedContext = sb.toString();
            }
        } catch (Exception e) {
            log.error("Memory retrieval failed: {}", e.getMessage());
        }

        // Build system prompt (matches Node backend)
        String systemContent = """
            You are the "Neural Coach", a specialized AI performance assistant for FocusFlow AI.
            %s
            
            PROBLEM-SOLVING FRAMEWORK (DECONSTRUCT & SOLVE):
            1. **Understand Intent**: The user may use vague words. Always interpret through the lens of ADHD challenges (Starting, Focusing, Overwhelm).
            2. **Validate**: Briefly acknowledge why it's hard.
            3. **Solve via Deconstruction**: Never give vague advice. Convert every problem into 3 tiny, actionable steps with time estimates.
            4. **Iterate**: If the user is confused, ask "What's the very first obstacle you see?"
            
            CONVERSATIONAL GUIDELINES (CRITICAL):
            1. **Direct Solution First**: Answer the user's need immediately.
            2. **No Repetition**: Do not use robotic greetings. Start naturally.
            3. **NEVER give the same answer twice**. Vary your phrasing, examples, and techniques.
            4. **Use diverse productivity frameworks**: Pomodoro, GTD, Eisenhower Matrix, Time Blocking, Eat the Frog, SMART goals, etc.
            """.formatted(archivedContext);

        Map<String, String> systemMessage = Map.of("role", "system", "content", systemContent);

        List<Map<String, String>> apiMessages = new ArrayList<>();
        apiMessages.add(systemMessage);
        apiMessages.addAll(messages);

        // Try Groq first
        if (groqApiKey != null && !groqApiKey.isBlank()) {
            try {
                Map<String, Object> result = callAiApi(groqBaseUrl, groqApiKey, groqModel, apiMessages);
                if (result != null) return result;
            } catch (Exception e) {
                log.warn("Groq API failed: {}", e.getMessage());
            }
        }

        // Fallback to OpenAI
        if (openaiApiKey != null && !openaiApiKey.isBlank()) {
            try {
                Map<String, Object> result = callAiApi(openaiBaseUrl, openaiApiKey, openaiModel, apiMessages);
                if (result != null) return result;
            } catch (Exception e) {
                log.warn("OpenAI API failed: {}", e.getMessage());
            }
        }

        // Final fallback — mock response
        String lastUserMessage = messages.stream()
                .filter(m -> "user".equals(m.get("role")))
                .reduce((first, second) -> second)
                .map(m -> m.get("content"))
                .orElse("");

        return Map.of("message", getMockResponse(lastUserMessage));
    }

    /**
     * Save a memory to the cognitive archive.
     */
    public Memory saveMemory(String userId, String context, Map<String, Object> metadata) {
        Memory memory = new Memory(userId, context, metadata);
        return memoryRepository.save(memory);
    }

    // ---- Private helpers ----

    @SuppressWarnings("unchecked")
    private Map<String, Object> callAiApi(String baseUrl, String apiKey,
                                           String model, List<Map<String, String>> messages) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.8);
        requestBody.put("max_tokens", 800);

        try {
            Map<String, Object> response = webClient.post()
                    .uri(baseUrl + "/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block(Duration.ofSeconds(30));

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> firstChoice = choices.get(0);
                    Map<String, Object> msg = (Map<String, Object>) firstChoice.get("message");
                    if (msg != null && msg.containsKey("content")) {
                        return Map.of("message", msg.get("content"));
                    }
                }
            }
        } catch (WebClientResponseException e) {
            log.error("AI API HTTP error {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("AI API call failed: {}", e.getMessage());
        }
        return null;
    }

    private String getMockResponse(String message) {
        String msg = message.toLowerCase();
        String category = "greeting";

        if (msg.contains("focus") || msg.contains("concentrate") || msg.contains("distract")) {
            category = "focus";
        } else if (msg.contains("start") || msg.contains("stuck") || msg.contains("procrastinat")) {
            category = "stuck";
        } else if (msg.contains("big") || msg.contains("overwhelm") || msg.contains("task")) {
            category = "overwhelm";
        } else if (msg.contains("plan") || msg.contains("prioritize") || msg.contains("today")) {
            category = "planning";
        }

        List<String> pool = OFFLINE_RESPONSES.getOrDefault(category, OFFLINE_RESPONSES.get("greeting"));
        return pool.get(ThreadLocalRandom.current().nextInt(pool.size()));
    }
}
