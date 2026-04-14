package com.focusflow.backend.service;

import com.focusflow.backend.domain.User;
import com.focusflow.backend.repository.SessionRepository;
import com.focusflow.backend.repository.TaskRepository;
import com.focusflow.backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final TaskRepository taskRepository;

    public AdminService(UserRepository userRepository,
                        SessionRepository sessionRepository,
                        TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * Get paginated user list with optional search.
     */
    public Map<String, Object> getUsers(String search, Pageable pageable) {
        Page<User> page;
        if (search != null && !search.isBlank()) {
            page = userRepository.searchByNameOrEmail(search, pageable);
        } else {
            page = userRepository.findAll(pageable);
        }

        // Strip passwords from response
        List<Map<String, Object>> users = page.getContent().stream().map(user -> {
            Map<String, Object> u = new HashMap<>();
            u.put("id", user.getId());
            u.put("name", user.getName());
            u.put("email", user.getEmail());
            u.put("role", user.getRole().toMongoValue());
            u.put("currentStreak", user.getCurrentStreak());
            u.put("longestStreak", user.getLongestStreak());
            u.put("createdAt", user.getCreatedAt());
            return u;
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("users", users);
        result.put("totalPages", page.getTotalPages());
        result.put("currentPage", page.getNumber());
        result.put("total", page.getTotalElements());
        return result;
    }

    /**
     * Delete a user and their sessions.
     */
    public boolean deleteUser(String userId, String requestingUserId) {
        if (userId.equals(requestingUserId)) {
            throw new RuntimeException("Cannot delete your own account");
        }

        if (!userRepository.existsById(userId)) {
            return false;
        }

        // Delete user's sessions (matching Node behavior)
        List<com.focusflow.backend.domain.Session> sessions =
                sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        sessionRepository.deleteAll(sessions);

        userRepository.deleteById(userId);
        return true;
    }

    /**
     * Get system-wide statistics.
     */
    public Map<String, Object> getStats() {
        long totalUsers = userRepository.count();
        long totalSessions = sessionRepository.count();
        long totalTasks = taskRepository.count();

        // Users created in last 7 days
        Instant weekAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        long newUsersThisWeek = userRepository.countByCreatedAtAfter(weekAgo);

        // Total focus time
        List<com.focusflow.backend.domain.Session> allSessions = sessionRepository.findAll();
        long totalMinutes = allSessions.stream()
                .mapToLong(com.focusflow.backend.domain.Session::getDuration)
                .sum();

        // Active users (distinct users with sessions in last 7 days)
        List<com.focusflow.backend.domain.Session> recentSessions =
                sessionRepository.findByCreatedAtAfter(weekAgo);
        long activeUsers = recentSessions.stream()
                .map(com.focusflow.backend.domain.Session::getUserId)
                .distinct()
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalSessions", totalSessions);
        stats.put("totalTasks", totalTasks);
        stats.put("newUsersThisWeek", newUsersThisWeek);
        stats.put("activeUsers", activeUsers);
        stats.put("totalFocusHours", totalMinutes / 60);
        stats.put("avgSessionsPerUser", totalUsers > 0
                ? String.format("%.1f", (double) totalSessions / totalUsers) : "0");
        return stats;
    }
}
