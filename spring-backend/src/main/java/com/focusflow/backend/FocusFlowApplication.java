package com.focusflow.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@SpringBootApplication
public class FocusFlowApplication {

    public static void main(String[] args) {
        SpringApplication.run(FocusFlowApplication.class, args);
        System.out.println("✅ FocusFlow API running on http://localhost:5000");
    }

    /**
     * Health check endpoint — matches GET /api/health from the Node backend.
     */
    @RestController
    static class HealthController {
        @GetMapping("/api/health")
        public ResponseEntity<Map<String, String>> health() {
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "FocusFlow API is running"
            ));
        }
    }
}
