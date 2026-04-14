package com.focusflow.backend.service;

import com.focusflow.backend.domain.User;
import com.focusflow.backend.dto.LoginRequest;
import com.focusflow.backend.dto.RegisterRequest;
import com.focusflow.backend.repository.UserRepository;
import com.focusflow.backend.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

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
            throw new RuntimeException("User already exists");
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

        // Generate JWT (matches Node payload: userId, email)
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().toMongoValue()
        );

        // Build response matching Node backend shape
        Map<String, Object> userObj = new HashMap<>();
        userObj.put("id", user.getId());
        userObj.put("email", user.getEmail());
        userObj.put("name", user.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", userObj);
        return response;
    }

    /**
     * Authenticate user and return JWT + user object.
     */
    public Map<String, Object> login(LoginRequest request) {
        // Find user
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().toMongoValue()
        );

        Map<String, Object> userObj = new HashMap<>();
        userObj.put("id", user.getId());
        userObj.put("email", user.getEmail());
        userObj.put("name", user.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", userObj);
        return response;
    }

    /**
     * Get user profile by ID.
     */
    public Map<String, Object> getProfile(String userId) {
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isEmpty()) {
            // Return mock/offline user (matches Node backend fallback)
            Map<String, Object> mock = new HashMap<>();
            mock.put("id", "offline-user");
            mock.put("email", "offline@focusflow.ai");
            mock.put("name", "Offline Pilot");
            mock.put("currentStreak", 0);
            mock.put("longestStreak", 0);
            return mock;
        }

        User user = optUser.get();
        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("name", user.getName());
        profile.put("currentStreak", user.getCurrentStreak());
        profile.put("longestStreak", user.getLongestStreak());
        return profile;
    }
}
