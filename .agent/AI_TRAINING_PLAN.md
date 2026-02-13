# Implementation Plan - AI Training & Interaction

## Goal
Train the AI Coach (via Groq API) to interact intelligently with user data for personalized focus training and daily planning.

## Proposed Changes

### 1. Backend: Contextual Training Engine (`backend/routes/ai.js`)
- [ ] Upgrade `systemPrompt` to handle "Training Modes" (Plan, Train, Reset).
- [ ] Implement `UserContextProcessor` to digest analytics data into readable coaching insights.
- [ ] Add specific "Training Protocols" from `neural_knowledge.json` into the active prompt.

### 2. Frontend: Intelligent Data Sync (`frontend/src/components/AIChatbot.jsx`)
- [ ] Implement `NeuralTrainingService` to collect user stats, mood, and task success rates.
- [ ] Update `handleSend` to include a "Cognitive Snapshot" in every request.
- [ ] Add "Training Completion" feedback loop (User can tell AI if a focus technique worked).

### 3. Analytics Integration (`frontend/src/context/AnalyticsContext.jsx`)
- [ ] Add helper methods to summarize user "Focus Weaknesses" for the AI to target.

## Success Metrics
- AI suggests techniques based on user's actual past performance (e.g., "You usually lose focus at 2:00 PM, let's try a sprint now").
- AI breaks down tasks specific to the user's ADHD profile defined in `neural_knowledge.json`.
