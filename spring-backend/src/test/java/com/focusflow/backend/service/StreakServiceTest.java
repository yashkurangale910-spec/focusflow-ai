package com.focusflow.backend.service;

import com.focusflow.backend.domain.User;
import com.focusflow.backend.repository.SessionRepository;
import com.focusflow.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class StreakServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SessionRepository sessionRepository;

    @InjectMocks
    private StreakService streakService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRecalculate_NewUser_NoSessions() {
        User user = new User();
        user.setId("user1");
        user.setCurrentStreak(0);
        user.setLongestStreak(0);

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(sessionRepository.findByUserIdOrderByCreatedAtDesc("user1")).thenReturn(Collections.emptyList());

        Map<String, Object> result = streakService.recalculate("user1");

        assertEquals(0, result.get("currentStreak"));
        assertEquals(0, result.get("longestStreak"));
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testRecalculate_ActiveStreak() {
        User user = new User();
        user.setId("user1");
        user.setCurrentStreak(1);
        user.setLongestStreak(1);
        user.setLastActiveDate(LocalDate.now().minusDays(1));

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        // We'll mock the internal logic by just checking if the service updates it correctly
        // The service usually recalculates based on actual session history
        
        // Mock session history: one today, one yesterday
        com.focusflow.backend.domain.Session s1 = new com.focusflow.backend.domain.Session();
        s1.setCreatedAt(java.time.Instant.now());
        
        com.focusflow.backend.domain.Session s2 = new com.focusflow.backend.domain.Session();
        s2.setCreatedAt(java.time.Instant.now().minus(1, java.time.temporal.ChronoUnit.DAYS));

        when(sessionRepository.findByUserIdOrderByCreatedAtDesc("user1")).thenReturn(java.util.List.of(s1, s2));

        Map<String, Object> result = streakService.recalculate("user1");

        assertEquals(2, result.get("currentStreak"));
        assertEquals(2, result.get("longestStreak"));
    }

    @Test
    void testRecalculate_BrokenStreak() {
        User user = new User();
        user.setId("user1");
        user.setCurrentStreak(5);
        user.setLongestStreak(5);

        // Last session was 3 days ago
        com.focusflow.backend.domain.Session s1 = new com.focusflow.backend.domain.Session();
        s1.setCreatedAt(java.time.Instant.now().minus(3, java.time.temporal.ChronoUnit.DAYS));

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(sessionRepository.findByUserIdOrderByCreatedAtDesc("user1")).thenReturn(java.util.List.of(s1));

        Map<String, Object> result = streakService.recalculate("user1");

        assertEquals(0, result.get("currentStreak"));
        assertEquals(5, result.get("longestStreak"));
    }
}
