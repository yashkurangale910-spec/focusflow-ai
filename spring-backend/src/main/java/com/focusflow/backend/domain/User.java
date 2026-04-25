package com.focusflow.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDate;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    private Role role = Role.USER;

    private int currentStreak = 0;

    private int longestStreak = 0;

    private LocalDate lastActiveDate;

    // --- Profile / Settings fields ---

    private String avatar; // URL or base64 string

    private String timezone = "UTC";

    private String preferredProtocol; // e.g., "deep-work", "creative-synthesis"

    private int dailyGoalMinutes = 120; // daily focus target in minutes

    private int totalXp = 0; // gamification XP

    private String neuralRank = "Initiate"; // rank title

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public enum Role {
        USER, ADMIN;

        /**
         * Convert from the lowercase values stored in MongoDB by the Node app
         * (e.g. "user", "admin") to the Java enum.
         */
        public static Role fromString(String value) {
            if (value == null) return USER;
            return switch (value.toLowerCase()) {
                case "admin" -> ADMIN;
                default -> USER;
            };
        }

        /**
         * Return the lowercase representation to stay compatible with MongoDB docs
         * written by the Node backend.
         */
        public String toMongoValue() {
            return this.name().toLowerCase();
        }
    }

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }

    public LocalDate getLastActiveDate() { return lastActiveDate; }
    public void setLastActiveDate(LocalDate lastActiveDate) { this.lastActiveDate = lastActiveDate; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public String getPreferredProtocol() { return preferredProtocol; }
    public void setPreferredProtocol(String preferredProtocol) { this.preferredProtocol = preferredProtocol; }

    public int getDailyGoalMinutes() { return dailyGoalMinutes; }
    public void setDailyGoalMinutes(int dailyGoalMinutes) { this.dailyGoalMinutes = dailyGoalMinutes; }

    public int getTotalXp() { return totalXp; }
    public void setTotalXp(int totalXp) { this.totalXp = totalXp; }

    public String getNeuralRank() { return neuralRank; }
    public void setNeuralRank(String neuralRank) { this.neuralRank = neuralRank; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
