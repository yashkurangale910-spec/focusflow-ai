package com.focusflow.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    private String userId;

    private String title;

    private String description;

    private Status status = Status.TODO;

    private Instant createdAt = Instant.now();

    private Instant updatedAt;

    public enum Status {
        TODO, IN_PROGRESS, DONE;

        /**
         * Convert from lowercase/kebab-case values stored by the Node app
         * (e.g. "todo", "in_progress", "done").
         */
        public static Status fromString(String value) {
            if (value == null) return TODO;
            return switch (value.toLowerCase().replace("-", "_")) {
                case "in_progress" -> IN_PROGRESS;
                case "done" -> DONE;
                default -> TODO;
            };
        }

        public String toMongoValue() {
            return this.name().toLowerCase();
        }
    }

    public Task() {}

    public Task(String userId, String title, String description, Status status) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = Instant.now();
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
