package com.focusflow.backend.dto;

/**
 * Response DTO for AI Chat.
 */
public class ChatResponse {
    private String message;

    public ChatResponse() {}

    public ChatResponse(String message) {
        this.message = message;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
