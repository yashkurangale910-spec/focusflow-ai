package com.focusflow.backend.service;

import com.focusflow.backend.domain.Session;
import com.focusflow.backend.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final StreakService streakService;

    public SessionService(SessionRepository sessionRepository, StreakService streakService) {
        this.sessionRepository = sessionRepository;
        this.streakService = streakService;
    }

    /**
     * Get all sessions for a user, sorted by creation date descending.
     */
    public List<Session> getSessionsByUserId(String userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Create a new focus session and recalculate the user's streak.
     */
    public Map<String, Object> createSession(String userId, Map<String, Object> body) {
        Session session = new Session();
        session.setUserId(userId);
        session.setDuration(((Number) body.getOrDefault("duration", 25)).intValue());
        session.setQuality(((Number) body.getOrDefault("quality", 5)).intValue());
        session.setNotes((String) body.getOrDefault("notes", ""));
        session.setType((String) body.getOrDefault("type", "focus"));
        session.setCreatedAt(Instant.now());

        session = sessionRepository.save(session);

        // Recalculate streak
        Map<String, Object> streakData = streakService.recalculate(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("session", session);
        result.put("streak", streakData);
        return result;
    }

    /**
     * Compute analytics for the authenticated user.
     * Returns: totalSessions, totalMinutes, totalHours, avgQuality
     */
    public Map<String, Object> getAnalytics(String userId) {
        List<Session> sessions = sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);

        int totalSessions = sessions.size();
        int totalMinutes = sessions.stream().mapToInt(Session::getDuration).sum();
        double avgQuality = totalSessions > 0
                ? sessions.stream().mapToInt(Session::getQuality).average().orElse(0.0)
                : 0.0;

        // Weekly breakdown (last 7 days)
        List<Map<String, Object>> weeklyBreakdown = new ArrayList<>();
        Instant sevenDaysAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        for (int i = 6; i >= 0; i--) {
            Instant dayStart = Instant.now().minus(i, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);
            Instant dayEnd = dayStart.plus(1, ChronoUnit.DAYS);
            int dayMinutes = sessions.stream()
                    .filter(s -> s.getCreatedAt() != null
                            && !s.getCreatedAt().isBefore(dayStart)
                            && s.getCreatedAt().isBefore(dayEnd))
                    .mapToInt(Session::getDuration)
                    .sum();

            Map<String, Object> day = new HashMap<>();
            day.put("date", dayStart.toString());
            day.put("minutes", dayMinutes);
            weeklyBreakdown.add(day);
        }

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalSessions", totalSessions);
        analytics.put("totalMinutes", totalMinutes);
        analytics.put("totalHours", totalMinutes / 60);
        analytics.put("avgQuality", String.format("%.1f", avgQuality));
        analytics.put("sessionCount", totalSessions);
        analytics.put("weeklyBreakdown", weeklyBreakdown);
        return analytics;
    }
}
