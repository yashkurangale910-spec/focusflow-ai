package com.focusflow.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "memories")
public class Memory {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String context;

    private Map<String, Object> metadata = new HashMap<>();

    private int importance = 1;

    private Instant timestamp = Instant.now();

    public Memory() {}

    public Memory(String userId, String context, Map<String, Object> metadata) {
        this.userId = userId;
        this.context = context;
        this.metadata = metadata != null ? metadata : new HashMap<>();
        this.timestamp = Instant.now();
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }

    public Map<String, Object> getMetadata() { return metadata; }
    public void setMetadata(Map<String, Object> metadata) { this.metadata = metadata; }

    public int getImportance() { return importance; }
    public void setImportance(int importance) { this.importance = importance; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
