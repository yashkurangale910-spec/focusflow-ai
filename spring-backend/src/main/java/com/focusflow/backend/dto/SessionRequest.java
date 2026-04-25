package com.focusflow.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO for creating a new focus session.
 */
public class SessionRequest {

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 480, message = "Duration cannot exceed 480 minutes")
    private Integer duration = 25;

    @Min(value = 1, message = "Quality must be between 1 and 5")
    @Max(value = 5, message = "Quality must be between 1 and 5")
    private int quality = 5;

    private String notes = "";

    private String type = "focus"; // 'focus', 'break', 'creative', 'recovery'

    private String protocol; // e.g., "deep-work", "creative-synthesis", "rapid-realignment"

    public SessionRequest() {}

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public int getQuality() { return quality; }
    public void setQuality(int quality) { this.quality = quality; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getProtocol() { return protocol; }
    public void setProtocol(String protocol) { this.protocol = protocol; }
}
