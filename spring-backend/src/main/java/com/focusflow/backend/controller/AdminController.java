package com.focusflow.backend.controller;

import com.focusflow.backend.service.AdminService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * GET /api/admin/users
     * Paginated user list with optional search. Admin only.
     */
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "") String search) {

        // Spring Pageable is 0-indexed; frontend sends 1-indexed
        Pageable pageable = PageRequest.of(
                Math.max(0, page - 1), limit, Sort.by(Sort.Direction.DESC, "createdAt"));

        Map<String, Object> result = adminService.getUsers(search, pageable);
        return ResponseEntity.ok(result);
    }

    /**
     * DELETE /api/admin/users/{id}
     * Delete a user by ID. Admin only. Cannot delete yourself.
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id, Authentication authentication) {
        String requestingUserId = (String) authentication.getPrincipal();
        try {
            boolean deleted = adminService.deleteUser(id, requestingUserId);
            if (!deleted) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * GET /api/admin/stats
     * System-wide statistics. Admin only.
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }
}
