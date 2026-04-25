package com.focusflow.backend.dto;

import java.util.Map;

/**
 * DTO for squad timer actions.
 */
public class SquadTimerAction {
    private String action; // start, pause, reset
    private int duration;

    public SquadTimerAction() {}

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
}
