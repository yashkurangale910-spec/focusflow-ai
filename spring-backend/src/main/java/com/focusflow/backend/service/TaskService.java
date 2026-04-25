package com.focusflow.backend.service;

import com.focusflow.backend.domain.Task;
import com.focusflow.backend.dto.TaskRequest;
import com.focusflow.backend.exception.ForbiddenOperationException;
import com.focusflow.backend.exception.ResourceNotFoundException;
import com.focusflow.backend.repository.TaskRepository;
import com.focusflow.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get all tasks for a specific user, sorted by creation date descending.
     */
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Get tasks filtered by status.
     */
    public List<Task> getTasksByStatus(String userId, String status) {
        Task.Status taskStatus = Task.Status.fromString(status);
        return taskRepository.findByUserIdAndStatusOrderByPriorityDesc(userId, taskStatus);
    }

    /**
     * Get overdue tasks (dueDate has passed, not yet DONE).
     */
    public List<Task> getOverdueTasks(String userId) {
        return taskRepository.findByUserIdAndDueDateBeforeAndStatusNot(
                userId, Instant.now(), Task.Status.DONE);
    }

    /**
     * Create a new task for the authenticated user.
     * Supports both typed DTO and raw Map for backward compatibility.
     */
    public Task createTask(String userId, Map<String, Object> body) {
        Task task = new Task();
        task.setUserId(userId);
        task.setTitle((String) body.getOrDefault("title", "Untitled"));
        task.setDescription((String) body.getOrDefault("description", ""));

        String statusStr = (String) body.getOrDefault("status", "todo");
        task.setStatus(Task.Status.fromString(statusStr));

        if (body.containsKey("priority")) {
            task.setPriority(((Number) body.get("priority")).intValue());
        }
        if (body.containsKey("category")) {
            task.setCategory((String) body.get("category"));
        }
        if (body.containsKey("dueDate") && body.get("dueDate") != null) {
            task.setDueDate(Instant.parse((String) body.get("dueDate")));
        }
        if (body.containsKey("estimatedMinutes")) {
            task.setEstimatedMinutes(((Number) body.get("estimatedMinutes")).intValue());
        }

        task = taskRepository.save(task);
        log.debug("Task created: '{}' for user {}", task.getTitle(), userId);
        return task;
    }

    /**
     * Create a task using typed DTO.
     */
    public Task createTask(String userId, TaskRequest request) {
        Task task = new Task();
        task.setUserId(userId);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(Task.Status.fromString(request.getStatus()));
        task.setPriority(request.getPriority());
        task.setCategory(request.getCategory());

        if (request.getDueDate() != null) {
            task.setDueDate(Instant.parse(request.getDueDate()));
        }

        task = taskRepository.save(task);
        log.debug("Task created: '{}' for user {}", task.getTitle(), userId);
        return task;
    }

    /**
     * Update an existing task. Throws if not found or not owned.
     */
    public Task updateTask(String taskId, String userId, Map<String, Object> updates) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        if (updates.containsKey("title")) {
            task.setTitle((String) updates.get("title"));
        }
        if (updates.containsKey("description")) {
            task.setDescription((String) updates.get("description"));
        }
        if (updates.containsKey("status")) {
            Task.Status newStatus = Task.Status.fromString((String) updates.get("status"));
            // Award XP if changing to DONE
            if (newStatus == Task.Status.DONE && task.getStatus() != Task.Status.DONE) {
                awardTaskXp(userId, task.getPriority());
            }
            task.setStatus(newStatus);
        }
        if (updates.containsKey("priority")) {
            task.setPriority(((Number) updates.get("priority")).intValue());
        }
        if (updates.containsKey("category")) {
            task.setCategory((String) updates.get("category"));
        }
        if (updates.containsKey("dueDate")) {
            Object dueDateVal = updates.get("dueDate");
            task.setDueDate(dueDateVal != null ? Instant.parse((String) dueDateVal) : null);
        }
        if (updates.containsKey("estimatedMinutes")) {
            task.setEstimatedMinutes(((Number) updates.get("estimatedMinutes")).intValue());
        }
        if (updates.containsKey("actualMinutes")) {
            task.setActualMinutes(((Number) updates.get("actualMinutes")).intValue());
        }

        task = taskRepository.save(task);
        log.debug("Task updated: '{}' ({})", task.getTitle(), taskId);
        return task;
    }

    private void awardTaskXp(String userId, int priority) {
        int xp = 50 + (priority * 10); // Base 50 + 10 per priority level
        userRepository.findById(userId).ifPresent(user -> {
            user.setTotalXp(user.getTotalXp() + xp);
            userRepository.save(user);
            log.info("Awarded {} XP to user {} for task completion", xp, userId);
        });
    }

    /**
     * Delete a task. Throws if not found or not owned.
     */
    public void deleteTask(String taskId, String userId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        taskRepository.delete(task);
        log.debug("Task deleted: {}", taskId);
    }

    /**
     * Get task completion stats for a user.
     */
    public Map<String, Object> getTaskStats(String userId) {
        List<Task> allTasks = taskRepository.findByUserIdOrderByCreatedAtDesc(userId);

        long total = allTasks.size();
        long completed = allTasks.stream().filter(t -> t.getStatus() == Task.Status.DONE).count();
        long inProgress = allTasks.stream().filter(t -> t.getStatus() == Task.Status.IN_PROGRESS).count();
        long todo = allTasks.stream().filter(t -> t.getStatus() == Task.Status.TODO).count();
        double completionRate = total > 0 ? (double) completed / total * 100 : 0;

        return Map.of(
                "total", total,
                "completed", completed,
                "inProgress", inProgress,
                "todo", todo,
                "completionRate", String.format("%.1f", completionRate)
        );
    }
}
