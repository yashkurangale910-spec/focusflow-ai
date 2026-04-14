package com.focusflow.backend.service;

import com.focusflow.backend.domain.User;
import com.focusflow.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Migrated from streakUtils.js — handles daily streak calculation.
 */
@Service
public class StreakService {

    private static final Logger log = LoggerFactory.getLogger(StreakService.class);

    private final UserRepository userRepository;

    public StreakService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Recalculate a user's streak after recording a session.
     * Logic matches the Node backend's streakUtils.js exactly:
     *   - Same day → no change
     *   - Next day → increment streak
     *   - Missed a day → reset streak to 1
     */
    public Map<String, Object> recalculate(String userId) {
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isEmpty()) {
            log.warn("Streak recalculation skipped — user not found: {}", userId);
            return null;
        }

        User user = optUser.get();
        LocalDate today = LocalDate.now();
        LocalDate lastActive = user.getLastActiveDate();

        if (lastActive == null) {
            // First ever session
            user.setCurrentStreak(1);
        } else {
            long daysBetween = ChronoUnit.DAYS.between(lastActive, today);

            if (daysBetween == 0) {
                // Same day — no change
            } else if (daysBetween == 1) {
                // Consecutive day — increment
                user.setCurrentStreak(user.getCurrentStreak() + 1);
                if (user.getCurrentStreak() > user.getLongestStreak()) {
                    user.setLongestStreak(user.getCurrentStreak());
                }
            } else {
                // Missed a day — reset
                user.setCurrentStreak(1);
            }
        }

        user.setLastActiveDate(today);
        userRepository.save(user);

        Map<String, Object> result = new HashMap<>();
        result.put("currentStreak", user.getCurrentStreak());
        result.put("longestStreak", user.getLongestStreak());
        return result;
    }
}
