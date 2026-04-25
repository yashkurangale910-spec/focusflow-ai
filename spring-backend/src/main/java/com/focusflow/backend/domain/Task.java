package com.focusflow.backend.domain;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "tasks")
@CompoundIndex(name = "user_status_idx", def = "{'userId': 1, 'status': 1}")
@CompoundIndex(name = "user_created_idx", def = "{'userId': 1, 'createdAt': -1}")
public class Task {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String title;

    private String description;

    private Status status = Status.TODO;

    private int priority = 3; // 1 (low) → 5 (critical)

    private String category; // "study", "work", "personal", "health"

    private Instant dueDate; // nullable — tasks without deadlines

    private int estimatedMinutes; // estimated time to complete

    private int actualMinutes; // time actually spent

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
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

    public int getPriority() { return priority; }
    public void setPriority(int priority) { this.priority = priority; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Instant getDueDate() { return dueDate; }
    public void setDueDate(Instant dueDate) { this.dueDate = dueDate; }

    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }

    public int getActualMinutes() { return actualMinutes; }
    public void setActualMinutes(int actualMinutes) { this.actualMinutes = actualMinutes; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
