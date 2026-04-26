package com.focusflow.backend.controller;

import com.focusflow.backend.dto.ChangePasswordRequest;
import com.focusflow.backend.dto.LoginRequest;
import com.focusflow.backend.dto.ProfileUpdateRequest;
import com.focusflow.backend.dto.RegisterRequest;
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

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        Map<String, Object> result = authService.register(request, ip);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        String ip = httpRequest.getRemoteAddr();
        Map<String, Object> result = authService.login(request, ip);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userId = (String) authentication.getPrincipal();
        Map<String, Object> profile = authService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication authentication,
                                            @Valid @RequestBody ProfileUpdateRequest request) {
        String userId = (String) authentication.getPrincipal();
        Map<String, Object> profile = authService.updateProfile(userId, request);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(Authentication authentication,
                                             @Valid @RequestBody ChangePasswordRequest request) {
        String userId = (String) authentication.getPrincipal();
        authService.changePassword(userId, request);
        return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
    }
}
