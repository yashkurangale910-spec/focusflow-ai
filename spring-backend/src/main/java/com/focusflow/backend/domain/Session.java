package com.focusflow.backend.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "sessions")
@CompoundIndex(name = "user_created_idx", def = "{'userId': 1, 'createdAt': -1}")
public class Session {

    @Id
    private String id;

    @Indexed
    private String userId;

    private int duration; // in minutes

    private int quality; // 1-5 rating

    private String notes;

    private String type = "focus"; // 'focus', 'break', 'creative', 'recovery'

    private String protocol; // 'deep-work', 'creative-synthesis', 'rapid-realignment', 'neural-recovery'

    private int xpEarned; // XP gained from this session

    private int distractionCount; // number of times the user broke focus

    @CreatedDate
    private Instant createdAt;

    public Session() {}

    public Session(String userId, int duration, int quality, String notes, String type) {
        this.userId = userId;
        this.duration = duration;
        this.quality = quality;
        this.notes = notes;
        this.type = type;
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public int getQuality() { return quality; }
    public void setQuality(int quality) { this.quality = quality; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getProtocol() { return protocol; }
    public void setProtocol(String protocol) { this.protocol = protocol; }

    public int getXpEarned() { return xpEarned; }
    public void setXpEarned(int xpEarned) { this.xpEarned = xpEarned; }

    public int getDistractionCount() { return distractionCount; }
    public void setDistractionCount(int distractionCount) { this.distractionCount = distractionCount; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
