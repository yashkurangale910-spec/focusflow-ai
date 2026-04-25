package com.focusflow.backend.service;

import com.focusflow.backend.domain.Session;
import com.focusflow.backend.domain.User;
import com.focusflow.backend.dto.SessionRequest;
import com.focusflow.backend.exception.ResourceNotFoundException;
import com.focusflow.backend.repository.SessionRepository;
import com.focusflow.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class SessionService {

    private static final Logger log = LoggerFactory.getLogger(SessionService.class);

    private final SessionRepository sessionRepository;
    private final StreakService streakService;
    private final UserRepository userRepository;

    public SessionService(SessionRepository sessionRepository,
                          StreakService streakService,
                          UserRepository userRepository) {
        this.sessionRepository = sessionRepository;
        this.streakService = streakService;
        this.userRepository = userRepository;
    }

    /**
     * Get all sessions for a user, sorted by creation date descending.
     */
    public List<Session> getSessionsByUserId(String userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Create a new focus session, calculate XP, recalculate streak.
     * Supports raw Map for backward compatibility.
     */
    public Map<String, Object> createSession(String userId, Map<String, Object> body) {
        Session session = new Session();
        session.setUserId(userId);
        session.setDuration(((Number) body.getOrDefault("duration", 25)).intValue());
        session.setQuality(((Number) body.getOrDefault("quality", 5)).intValue());
        session.setNotes((String) body.getOrDefault("notes", ""));
        session.setType((String) body.getOrDefault("type", "focus"));

        if (body.containsKey("protocol")) {
            session.setProtocol((String) body.get("protocol"));
        }
        if (body.containsKey("distractionCount")) {
            session.setDistractionCount(((Number) body.get("distractionCount")).intValue());
        }

        // Calculate XP: base(duration * 2) + quality bonus + streak bonus
        int xp = calculateXp(session, userId);
        session.setXpEarned(xp);

        session = sessionRepository.save(session);

        // Award XP to user
        awardXp(userId, xp);

        // Recalculate streak
        Map<String, Object> streakData = streakService.recalculate(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("session", session);
        result.put("streak", streakData);
        result.put("xpEarned", xp);

        log.info("Session recorded: {}min ({}quality) for user {} → +{}XP",
                session.getDuration(), session.getQuality(), userId, xp);
        return result;
    }

    /**
     * Create a session using typed DTO.
     */
    public Map<String, Object> createSession(String userId, SessionRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put("duration", request.getDuration());
        body.put("quality", request.getQuality());
        body.put("notes", request.getNotes());
        body.put("type", request.getType());
        if (request.getProtocol() != null) {
            body.put("protocol", request.getProtocol());
        }
        return createSession(userId, body);
    }

    /**
     * Compute analytics for the authenticated user.
     * Returns: totalSessions, totalMinutes, totalHours, avgQuality, weeklyBreakdown, streakData
     */
    public Map<String, Object> getAnalytics(String userId) {
        List<Session> sessions = sessionRepository.findByUserIdOrderByCreatedAtDesc(userId);

        int totalSessions = sessions.size();
        int totalMinutes = sessions.stream().mapToInt(Session::getDuration).sum();
        double avgQuality = totalSessions > 0
                ? sessions.stream().mapToInt(Session::getQuality).average().orElse(0.0)
                : 0.0;
        int totalXpEarned = sessions.stream().mapToInt(Session::getXpEarned).sum();

        // Protocol breakdown
        Map<String, Integer> protocolBreakdown = new HashMap<>();
        for (Session s : sessions) {
            String protocol = s.getProtocol() != null ? s.getProtocol() : "general";
            protocolBreakdown.merge(protocol, s.getDuration(), Integer::sum);
        }

        // Weekly breakdown (last 7 days)
        List<Map<String, Object>> weeklyBreakdown = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            Instant dayStart = Instant.now().minus(i, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);
            Instant dayEnd = dayStart.plus(1, ChronoUnit.DAYS);

            int dayMinutes = sessions.stream()
                    .filter(s -> s.getCreatedAt() != null
                            && !s.getCreatedAt().isBefore(dayStart)
                            && s.getCreatedAt().isBefore(dayEnd))
                    .mapToInt(Session::getDuration)
                    .sum();

            long daySessions = sessions.stream()
                    .filter(s -> s.getCreatedAt() != null
                            && !s.getCreatedAt().isBefore(dayStart)
                            && s.getCreatedAt().isBefore(dayEnd))
                    .count();

            Map<String, Object> day = new HashMap<>();
            day.put("date", dayStart.toString());
            day.put("minutes", dayMinutes);
            day.put("sessions", daySessions);
            weeklyBreakdown.add(day);
        }

        // Monthly breakdown (last 30 days aggregated by week)
        List<Map<String, Object>> monthlyBreakdown = new ArrayList<>();
        for (int week = 3; week >= 0; week--) {
            Instant weekStart = Instant.now().minus((long) week * 7 + 7, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);
            Instant weekEnd = weekStart.plus(7, ChronoUnit.DAYS);

            int weekMinutes = sessions.stream()
                    .filter(s -> s.getCreatedAt() != null
                            && !s.getCreatedAt().isBefore(weekStart)
                            && s.getCreatedAt().isBefore(weekEnd))
                    .mapToInt(Session::getDuration)
                    .sum();

            Map<String, Object> weekData = new HashMap<>();
            weekData.put("weekStart", weekStart.toString());
            weekData.put("minutes", weekMinutes);
            monthlyBreakdown.add(weekData);
        }

        // Best session
        Optional<Session> bestSession = sessions.stream()
                .max(Comparator.comparingInt(s -> s.getDuration() * s.getQuality()));

        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalSessions", totalSessions);
        analytics.put("totalMinutes", totalMinutes);
        analytics.put("totalHours", totalMinutes / 60);
        analytics.put("avgQuality", String.format("%.1f", avgQuality));
        analytics.put("sessionCount", totalSessions);
        analytics.put("totalXpEarned", totalXpEarned);
        analytics.put("weeklyBreakdown", weeklyBreakdown);
        analytics.put("monthlyBreakdown", monthlyBreakdown);
        analytics.put("protocolBreakdown", protocolBreakdown);
        bestSession.ifPresent(s -> analytics.put("bestSession", Map.of(
                "duration", s.getDuration(),
                "quality", s.getQuality(),
                "date", s.getCreatedAt().toString()
        )));

        return analytics;
    }

    // --- Private helpers ---

    /**
     * Calculate XP for a session: base(duration * 2) + quality bonus + protocol multiplier
     */
    private int calculateXp(Session session, String userId) {
        int baseXp = session.getDuration() * 2;
        int qualityBonus = session.getQuality() * 5;

        // Protocol multiplier
        double protocolMultiplier = switch (session.getProtocol() != null ? session.getProtocol() : "") {
            case "deep-work" -> 1.5;
            case "creative-synthesis" -> 1.3;
            case "rapid-realignment" -> 1.0;
            case "neural-recovery" -> 0.8;
            default -> 1.0;
        };

        // Distraction penalty (lose 5% per distraction, max 50%)
        double distractionPenalty = Math.max(0.5, 1.0 - (session.getDistractionCount() * 0.05));

        return (int) ((baseXp + qualityBonus) * protocolMultiplier * distractionPenalty);
    }

    /**
     * Award XP to a user and recalculate Neural Rank.
     */
    private void awardXp(String userId, int xp) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) return;

            user.setTotalXp(user.getTotalXp() + xp);
            user.setNeuralRank(calculateRank(user.getTotalXp()));
            userRepository.save(user);
        } catch (Exception e) {
            log.error("Failed to award XP to user {}: {}", userId, e.getMessage());
        }
    }

    /**
     * Determine Neural Rank based on total XP.
     */
    private String calculateRank(int totalXp) {
        if (totalXp >= 50000) return "Neural Architect";
        if (totalXp >= 25000) return "Flow Master";
        if (totalXp >= 10000) return "Cognitive Elite";
        if (totalXp >= 5000)  return "Focus Commander";
        if (totalXp >= 2000)  return "Synaptic Warrior";
        if (totalXp >= 500)   return "Neural Cadet";
        return "Initiate";
    }
}
