package com.focusflow.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Map;

/**
 * Request DTO for AI Chat.
 */
public class ChatRequest {

    @NotEmpty(message = "Messages cannot be empty")
    private List<Map<String, String>> messages;

    public ChatRequest() {}

    public List<Map<String, String>> getMessages() { return messages; }
    public void setMessages(List<Map<String, String>> messages) { this.messages = messages; }
}
