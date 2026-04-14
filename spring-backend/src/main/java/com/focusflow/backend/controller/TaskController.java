package com.focusflow.backend.controller;

import com.focusflow.backend.domain.Task;
import com.focusflow.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * GET /api/tasks
     * Return all tasks for the authenticated user.
     */
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }

    /**
     * POST /api/tasks
     * Create a new task for the authenticated user.
     */
    @PostMapping
    public ResponseEntity<Task> createTask(Authentication authentication,
                                           @RequestBody Map<String, Object> body) {
        String userId = (String) authentication.getPrincipal();
        Task task = taskService.createTask(userId, body);
        return ResponseEntity.ok(task);
    }

    /**
     * PUT /api/tasks/{id}
     * Update an existing task. Returns 403 if the task doesn't belong to the user.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable String id,
                                        Authentication authentication,
                                        @RequestBody Map<String, Object> updates) {
        String userId = (String) authentication.getPrincipal();
        Task task = taskService.updateTask(id, userId, updates);

        if (task == null) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Task not found or access denied"));
        }
        return ResponseEntity.ok(task);
    }

    /**
     * DELETE /api/tasks/{id}
     * Delete a task. Returns 403 if the task doesn't belong to the user.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id,
                                        Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        boolean deleted = taskService.deleteTask(id, userId);

        if (!deleted) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Task not found or access denied"));
        }
        return ResponseEntity.ok(Map.of("message", "Task deleted"));
    }
}
