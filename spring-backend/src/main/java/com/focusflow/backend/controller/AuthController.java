package com.focusflow.backend.controller;

import com.focusflow.backend.dto.LoginRequest;
import com.focusflow.backend.dto.RegisterRequest;
import com.focusflow.backend.security.BruteForceProtectionService;
import com.focusflow.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final BruteForceProtectionService bruteForceService;

    public AuthController(AuthService authService, BruteForceProtectionService bruteForceService) {
        this.authService = authService;
        this.bruteForceService = bruteForceService;
    }

    /**
     * POST /api/auth/register
     * Register a new user. Returns JWT + user object.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        if (!bruteForceService.isAllowed(ip)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many attempts from this IP. Connectivity throttled."));
        }
        try {
            Map<String, Object> result = authService.register(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * POST /api/auth/login
     * Authenticate user. Returns JWT + user object.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        if (!bruteForceService.isAllowed(ip)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many login attempts. Access temporarily restricted."));
        }
        try {
            Map<String, Object> result = authService.login(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    /**
     * GET /api/auth/me
     * Get the currently authenticated user's profile.
     */
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            // Return mock/offline user (matching Node backend fallback)
            return ResponseEntity.ok(Map.of(
                    "id", "mock-123",
                    "email", "demo@focusflow.ai",
                    "name", "Neural Pilot",
                    "currentStreak", 5,
                    "longestStreak", 12
            ));
        }

        String userId = (String) authentication.getPrincipal();
        Map<String, Object> profile = authService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }
}
