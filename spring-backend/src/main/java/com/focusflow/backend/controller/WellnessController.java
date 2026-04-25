package com.focusflow.backend.controller;

import com.focusflow.backend.service.SessionService;
import com.focusflow.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Dedicated wellness & analytics endpoint used by the frontend
 * Wellness dashboard page. Aggregates session analytics, task stats,
 * and streak data into a single cohesive response.
 */
@RestController
@RequestMapping("/api/wellness")
public class WellnessController {

    private final SessionService sessionService;
    private final TaskService taskService;

    public WellnessController(SessionService sessionService, TaskService taskService) {
        this.sessionService = sessionService;
        this.taskService = taskService;
    }

    /**
     * GET /api/wellness/dashboard
     * One-stop aggregation of all wellness metrics for the authenticated user.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();

        Map<String, Object> sessionAnalytics = sessionService.getAnalytics(userId);
        Map<String, Object> taskStats = taskService.getTaskStats(userId);

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("focus", sessionAnalytics);
        dashboard.put("tasks", taskStats);

        return ResponseEntity.ok(dashboard);
    }
}
