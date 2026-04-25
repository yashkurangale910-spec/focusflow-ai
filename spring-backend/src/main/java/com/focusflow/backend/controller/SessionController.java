package com.focusflow.backend.controller;

import com.focusflow.backend.dto.SessionRequest;
import com.focusflow.backend.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    /**
     * GET /api/sessions
     * Return all focus sessions for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<?> getSessions(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(sessionService.getSessionsByUserId(userId));
    }

    /**
     * POST /api/sessions
     * Create a new focus session and recalculate streak.
     */
    @PostMapping
    public ResponseEntity<?> createSession(Authentication authentication,
                                           @Valid @RequestBody SessionRequest request) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.status(201).body(sessionService.createSession(userId, request));
    }

    /**
     * GET /api/sessions/analytics
     * Return analytics: totalMinutes, avgQuality, sessionCount, weeklyBreakdown.
     */
    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(sessionService.getAnalytics(userId));
    }
}
