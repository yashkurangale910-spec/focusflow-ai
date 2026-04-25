package com.focusflow.backend.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for updating user profile details.
 */
public class ProfileUpdateRequest {

    @NotBlank(message = "Name is required")
    private String name;

    private String avatar; // URL or base64

    private String timezone; // e.g., "Asia/Kolkata"

    private String preferredProtocol; // e.g., "deep-work"

    private Integer dailyGoalMinutes; // e.g., 120

    public ProfileUpdateRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }

    public String getPreferredProtocol() { return preferredProtocol; }
    public void setPreferredProtocol(String preferredProtocol) { this.preferredProtocol = preferredProtocol; }

    public Integer getDailyGoalMinutes() { return dailyGoalMinutes; }
    public void setDailyGoalMinutes(Integer dailyGoalMinutes) { this.dailyGoalMinutes = dailyGoalMinutes; }
}
