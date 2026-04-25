package com.focusflow.backend.controller;

import com.focusflow.backend.domain.Task;
import com.focusflow.backend.service.TaskService;
import org.springframework.http.HttpStatus;
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
     * Optional query param: ?status=todo|in_progress|done
     */
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(Authentication authentication,
                                                @RequestParam(required = false) String status) {
        String userId = (String) authentication.getPrincipal();
        List<Task> tasks;
        if (status != null && !status.isBlank()) {
            tasks = taskService.getTasksByStatus(userId, status);
        } else {
            tasks = taskService.getTasksByUserId(userId);
        }
        return ResponseEntity.ok(tasks);
    }

    /**
     * GET /api/tasks/overdue
     * Return all overdue tasks for the authenticated user.
     */
    @GetMapping("/overdue")
    public ResponseEntity<List<Task>> getOverdueTasks(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(taskService.getOverdueTasks(userId));
    }

    /**
     * GET /api/tasks/stats
     * Return task completion statistics.
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getTaskStats(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(taskService.getTaskStats(userId));
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
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    /**
     * PUT /api/tasks/{id}
     * Update an existing task. Returns 404 if not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id,
                                            Authentication authentication,
                                            @RequestBody Map<String, Object> updates) {
        String userId = (String) authentication.getPrincipal();
        Task task = taskService.updateTask(id, userId, updates);
        return ResponseEntity.ok(task);
    }

    /**
     * DELETE /api/tasks/{id}
     * Delete a task. Returns 404 if not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id,
                                        Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        taskService.deleteTask(id, userId);
        return ResponseEntity.ok(Map.of("message", "Task deleted"));
    }
}
