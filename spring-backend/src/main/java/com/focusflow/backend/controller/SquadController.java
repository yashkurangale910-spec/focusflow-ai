package com.focusflow.backend.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class SquadController {

    private final SimpMessagingTemplate messagingTemplate;

    // In-memory state storage (squadId -> SquadState)
    private final Map<String, SquadState> squadStates = new ConcurrentHashMap<>();

    public SquadController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/squad/{squadId}/join")
    public void joinSquad(@DestinationVariable String squadId, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        
        SquadState state = squadStates.computeIfAbsent(squadId, k -> new SquadState());
        state.getPioneers().add(sessionId);

        // Notify room
        Map<String, Object> joinPayload = new HashMap<>();
        joinPayload.put("id", sessionId);
        joinPayload.put("count", state.getPioneers().size());
        messagingTemplate.convertAndSend("/topic/squad/" + squadId + "/pioneer_joined", joinPayload);

        // Sync state to joiner
        Map<String, Object> syncPayload = new HashMap<>();
        syncPayload.put("timer", state.getTimer());
        syncPayload.put("pioneerCount", state.getPioneers().size());
        syncPayload.put("canvasData", state.getCanvasData());
        messagingTemplate.convertAndSendToUser(sessionId, "/topic/squad/" + squadId + "/sync", syncPayload);
    }

    @MessageMapping("/squad/{squadId}/draw")
    public void handleDraw(@DestinationVariable String squadId, @Payload Map<String, Object> line) {
        SquadState state = squadStates.get(squadId);
        if (state != null) {
            state.getCanvasData().add(line);
            messagingTemplate.convertAndSend("/topic/squad/" + squadId + "/canvas_update", line);
        }
    }

    @MessageMapping("/squad/{squadId}/clear")
    public void clearCanvas(@DestinationVariable String squadId) {
        SquadState state = squadStates.get(squadId);
        if (state != null) {
            state.getCanvasData().clear();
            messagingTemplate.convertAndSend("/topic/squad/" + squadId + "/canvas_cleared", Map.of("cleared", true));
        }
    }

    @MessageMapping("/squad/{squadId}/timer")
    public void handleTimer(@DestinationVariable String squadId, @Payload Map<String, Object> actionData) {
        SquadState state = squadStates.get(squadId);
        if (state != null) {
            String action = (String) actionData.get("action");
            TimerState timer = state.getTimer();
            
            if ("start".equals(action)) {
                timer.setStatus("running");
                timer.setDuration((Integer) actionData.get("duration"));
                timer.setTimeLeft(timer.getDuration());
            } else if ("pause".equals(action)) {
                timer.setStatus("paused");
            } else if ("reset".equals(action)) {
                timer.setStatus("idle");
                timer.setTimeLeft(0);
            }

            messagingTemplate.convertAndSend("/topic/squad/" + squadId + "/timer_updated", timer);
        }
    }

    @MessageMapping("/squad/{squadId}/chat")
    public void handleChat(@DestinationVariable String squadId, @Payload Map<String, Object> chatData) {
        Map<String, Object> message = new HashMap<>(chatData);
        message.put("id", UUID.randomUUID().toString());
        message.put("timestamp", Instant.now().toString());
        messagingTemplate.convertAndSend("/topic/squad/" + squadId + "/new_message", message);
    }

    // --- State Classes ---

    public static class SquadState {
        private Set<String> pioneers = Collections.newSetFromMap(new ConcurrentHashMap<>());
        private TimerState timer = new TimerState();
        private List<Map<String, Object>> canvasData = Collections.synchronizedList(new ArrayList<>());

        public Set<String> getPioneers() { return pioneers; }
        public TimerState getTimer() { return timer; }
        public List<Map<String, Object>> getCanvasData() { return canvasData; }
    }

    public static class TimerState {
        private int timeLeft = 0;
        private String status = "idle";
        private int duration = 1500; // 25 min default

        public int getTimeLeft() { return timeLeft; }
        public void setTimeLeft(int timeLeft) { this.timeLeft = timeLeft; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public int getDuration() { return duration; }
        public void setDuration(int duration) { this.duration = duration; }
    }
}
