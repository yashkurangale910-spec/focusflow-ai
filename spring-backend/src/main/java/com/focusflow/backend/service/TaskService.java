package com.focusflow.backend.service;

import com.focusflow.backend.domain.Task;
import com.focusflow.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Get all tasks for a specific user, sorted by creation date descending.
     */
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Create a new task for the authenticated user.
     */
    public Task createTask(String userId, Map<String, Object> body) {
        Task task = new Task();
        task.setUserId(userId);
        task.setTitle((String) body.getOrDefault("title", "Untitled"));
        task.setDescription((String) body.getOrDefault("description", ""));

        String statusStr = (String) body.getOrDefault("status", "todo");
        task.setStatus(Task.Status.fromString(statusStr));
        task.setCreatedAt(Instant.now());

        return taskRepository.save(task);
    }

    /**
     * Update an existing task. Returns null if the task doesn't belong to the user.
     */
    public Task updateTask(String taskId, String userId, Map<String, Object> updates) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElse(null);

        if (task == null) return null;

        if (updates.containsKey("title")) {
            task.setTitle((String) updates.get("title"));
        }
        if (updates.containsKey("description")) {
            task.setDescription((String) updates.get("description"));
        }
        if (updates.containsKey("status")) {
            task.setStatus(Task.Status.fromString((String) updates.get("status")));
        }
        task.setUpdatedAt(Instant.now());

        return taskRepository.save(task);
    }

    /**
     * Delete a task. Returns false if not found or not owned by user.
     */
    public boolean deleteTask(String taskId, String userId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElse(null);

        if (task == null) return false;

        taskRepository.delete(task);
        return true;
    }
}
