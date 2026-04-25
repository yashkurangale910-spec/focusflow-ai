package com.focusflow.backend.dto;

/**
 * DTO for squad chat messages.
 */
public class SquadChatMessage {
    private String sender;
    private String text;
    private String id;
    private String timestamp;

    public SquadChatMessage() {}

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
