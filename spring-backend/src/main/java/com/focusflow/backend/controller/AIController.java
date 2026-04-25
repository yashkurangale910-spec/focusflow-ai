package com.focusflow.backend.controller;

import com.focusflow.backend.domain.Memory;
import com.focusflow.backend.dto.ChatRequest;
import com.focusflow.backend.dto.ChatResponse;
import com.focusflow.backend.service.AIService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    /**
     * POST /api/ai/chat
     * Proxy AI chat requests to Groq (primary) → OpenAI (fallback) → local mock.
     * Rate limited to 10 requests/minute per user via Bucket4j.
     */
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(Authentication authentication,
                                             @Valid @RequestBody ChatRequest request) {
        String userId = authentication != null
                ? (String) authentication.getPrincipal()
                : "mock-123";

        // Rate limiting check
        if (aiService.isRateLimited(userId)) {
            // We can't return ChatResponse here easily if we want to return 429
            // But let's stay consistent
            return ResponseEntity.status(429).body(new ChatResponse("Neural link capacity reached. Please wait to cool down."));
        }

        ChatResponse result = aiService.chat(userId, request.getMessages());
        return ResponseEntity.ok(result);
    }

    /**
     * POST /api/ai/memory
     * Save an insight to the user's long-term cognitive archive.
     */
    @SuppressWarnings("unchecked")
    @PostMapping("/memory")
    public ResponseEntity<?> saveMemory(Authentication authentication,
                                        @RequestBody Map<String, Object> body) {
        String userId = (authentication != null) ? (String) authentication.getPrincipal() : "mock-123";
        String context = (String) body.get("context");
        Map<String, Object> metadata = (Map<String, Object>) body.getOrDefault("metadata", Map.of());

        if (context == null || context.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Context is required"));
        }

        aiService.saveMemory(userId, context, metadata);
        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Insight archived to long-term memory"
        ));
    }
}
