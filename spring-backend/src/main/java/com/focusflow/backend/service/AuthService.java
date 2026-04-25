package com.focusflow.backend.service;

import com.focusflow.backend.domain.User;
import com.focusflow.backend.dto.ChangePasswordRequest;
import com.focusflow.backend.dto.LoginRequest;
import com.focusflow.backend.dto.ProfileUpdateRequest;
import com.focusflow.backend.dto.RegisterRequest;
import com.focusflow.backend.exception.DuplicateResourceException;
import com.focusflow.backend.exception.ResourceNotFoundException;
import com.focusflow.backend.exception.UnauthorizedException;
import com.focusflow.backend.repository.UserRepository;
import com.focusflow.backend.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Register a new user and return JWT + user object.
     */
    public Map<String, Object> register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new DuplicateResourceException("A user with email '" + request.getEmail() + "' already exists");
        }

        // Hash the password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create user
        User user = new User(
                request.getName(),
                request.getEmail().toLowerCase().trim(),
                hashedPassword
        );
        user = userRepository.save(user);

        log.info("New user registered: {} ({})", user.getName(), user.getEmail());

        // Generate JWT (matches Node payload: userId, email)
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().toMongoValue()
        );

        return buildAuthResponse(token, user);
    }

    /**
     * Authenticate user and return JWT + user object.
     */
    public Map<String, Object> login(LoginRequest request) {
        // Find user
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        log.info("User logged in: {}", user.getEmail());

        // Generate JWT
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().toMongoValue()
        );

        return buildAuthResponse(token, user);
    }

    /**
     * Get user profile by ID.
     */
    public Map<String, Object> getProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("name", user.getName());
        profile.put("role", user.getRole().toMongoValue());
        profile.put("currentStreak", user.getCurrentStreak());
        profile.put("longestStreak", user.getLongestStreak());
        profile.put("avatar", user.getAvatar());
        profile.put("timezone", user.getTimezone());
        profile.put("preferredProtocol", user.getPreferredProtocol());
        profile.put("dailyGoalMinutes", user.getDailyGoalMinutes());
        profile.put("totalXp", user.getTotalXp());
        profile.put("neuralRank", user.getNeuralRank());
        profile.put("createdAt", user.getCreatedAt());
        return profile;
    }

    /**
     * Update user profile (name, avatar, timezone, preferences).
     */
    public Map<String, Object> updateProfile(String userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setName(request.getName());

        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getTimezone() != null) {
            user.setTimezone(request.getTimezone());
        }
        if (request.getPreferredProtocol() != null) {
            user.setPreferredProtocol(request.getPreferredProtocol());
        }
        if (request.getDailyGoalMinutes() != null) {
            user.setDailyGoalMinutes(request.getDailyGoalMinutes());
        }

        userRepository.save(user);
        log.info("Profile updated for user: {}", user.getEmail());

        return getProfile(userId);
    }

    /**
     * Change user password.
     */
    public void changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new UnauthorizedException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("Password changed for user: {}", user.getEmail());
    }

    /**
     * Build the standard auth response shape the frontend expects.
     */
    private Map<String, Object> buildAuthResponse(String token, User user) {
        Map<String, Object> userObj = new HashMap<>();
        userObj.put("id", user.getId());
        userObj.put("email", user.getEmail());
        userObj.put("name", user.getName());
        userObj.put("role", user.getRole().toMongoValue());
        userObj.put("currentStreak", user.getCurrentStreak());
        userObj.put("longestStreak", user.getLongestStreak());
        userObj.put("totalXp", user.getTotalXp());
        userObj.put("neuralRank", user.getNeuralRank());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", userObj);
        return response;
    }
}
