const express = require('express');
const { auth } = require('./auth');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Multi-Dataset Knowledge Engine
let knowledgeBase = {};
const loadKnowledge = () => {
    try {
        const baseKB = path.join(__dirname, '../utils/neural_knowledge.json');
        const datasetsDir = path.join(__dirname, '../utils/datasets');

        let mergedKB = JSON.parse(fs.readFileSync(baseKB, 'utf8'));

        // Load additional datasets
        if (fs.existsSync(datasetsDir)) {
            const files = fs.readdirSync(datasetsDir);
            files.forEach(file => {
                if (file.endsWith('.json')) {
                    const data = JSON.parse(fs.readFileSync(path.join(datasetsDir, file), 'utf8'));
                    mergedKB = { ...mergedKB, ...data };
                    console.log(`📡 Dataset Synchronized: ${file}`);
                }
            });
        }

        knowledgeBase = mergedKB;
        console.log('🧠 Neural Knowledge Engine: Fully Trained & Optimized');
    } catch (error) {
        console.error('Failed to load neural datasets:', error);
    }
};

loadKnowledge();

// Backup Intelligence System (Offline/Fallback)
const offlineResponses = {
    focus: [
        "Focus follows environment. Try the **'Phone Jail'** rule: Put your phone in another room. Physical distance = mental focus! 📱💨",
        "Try a **🌊 Neural Reset**: 1. Deep breath. 2. Close all tabs. 3. Set a 25-min timer. 4. One task only. Ready?",
        "Neuroscience tip: Your brain can't multitask. It just context-switches, costing you 20% of your cognitive energy. Stick to ONE thing! 🧠",
        "Try **Binaural Beats (40Hz)**. It syncs your brainwaves for deep cognitive work. Want to try a focus session with soundscapes?"
    ],
    stuck: [
        "Starting is the hardest part. Commit to JUST 2 minutes. The goal isn't the task; it's just the 2 minutes. ⏱️",
        "If you're stuck, use the **🎲 Swiss Cheese** method: Poke a tiny hole in the task by doing one small thing (like renaming a file).",
        "Activation energy is high right now. Let's lower it. What's the smallest, easiest sub-task you see?",
        "Momentum is built, not found. Do the absolute easiest thing on your list first to get the dopamine flowing! 🚀"
    ],
    overwhelm: [
        "Overwhelm is just a lack of clarity. Let's deconstruct! What's the 'big' thing causing the stress? 🧩",
        "Try the **1-3-5 Rule**: Pick 1 Big thing, 3 Medium things, and 5 Small things. Forget everything else for now.",
        "Your brain is in 'threat mode'. Let's dump everything on your mind onto a list. Offloading mental RAM instantly lowers anxiety. 🧠💨",
        "Complexity is the enemy of execution. Let's pick ONE micro-step and ignore the rest of the mountain."
    ],
    planning: [
        "Let's align your day with 🔋 **Energy Levels**: Do your hardest work during your peak (usually 2-4 hours after waking).",
        "Try **Time Boxing**: Give yourself a strict 60-minute window for this task. Constraints breed creativity! 📦",
        "The **Ivy Lee Method**: Write down the 6 most important tasks for tomorrow. Number them by priority. Start with #1. Simple.",
        "Don't manage time, manage energy. What's your top 'Must-Do' while you still have brain power? ⚡"
    ],
    greeting: [
        "Neural Link Established. I am your **Neural Coach**. How can I help you optimize your performance today? 🧠",
        "Systems Active. Ready to crush some tasks? Tell me what's on your mind and we'll optimize it. 🚀",
        "Hello, Pioneer! I'm here to handle the mental heavy lifting. What are we focusing on right now?"
    ]
};

const getMockResponse = (message) => {
    const msg = message.toLowerCase();
    let category = 'greeting';

    if (msg.includes('focus') || msg.includes('concentrate') || msg.includes('distract')) category = 'focus';
    else if (msg.includes('start') || msg.includes('stuck') || msg.includes('procrastinat')) category = 'stuck';
    else if (msg.includes('big') || msg.includes('overwhelm') || msg.includes('task')) category = 'overwhelm';
    else if (msg.includes('plan') || msg.includes('prioritize') || msg.includes('today')) category = 'planning';

    const pool = offlineResponses[category];
    return pool[Math.floor(Math.random() * pool.length)];
};

// Proxy AI requests to Groq/OpenAI (keeps API key secure on server)
router.post('/chat', async (req, res) => {
    try {
        const { messages, userId = 'mock-123' } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        const apiKey = process.env.AI_PROVIDER === 'groq' ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;
        const apiProvider = process.env.AI_PROVIDER || 'groq';

        // No API key at all → use mock
        if (!apiKey) {
            console.warn('AI API Key missing. Falling back to Backup Intelligence.');
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            return res.json({ message: getMockResponse(lastUserMessage?.content || '') });
        }

        // 🧠 Cognitive Archive Retrieval
        let archivedContext = "";
        try {
            if (process.env.DB_STATUS !== 'offline') {
                const recentMemories = await Memory.find({ userId }).sort({ timestamp: -1 }).limit(5);
                if (recentMemories.length > 0) {
                    archivedContext = "\n\n[COGNITIVE_ARCHIVE_RETRIEVED]:\n" +
                        recentMemories.map(m => `- ${m.context}`).join('\n');
                }
            }
        } catch (memError) {
            console.error('Memory retrieval failed:', memError);
        }

        // Build the system prompt
        const systemPrompt = {
            role: 'system',
            content: `You are the "Neural Coach", a specialized AI performance assistant for FocusFlow AI.
${archivedContext}

PROBLEM-SOLVING FRAMEWORK (DECONSTRUCT & SOLVE):
1. **Understand Intent**: The user may use vague words ("slove it", "help"). Always interpret this through the lens of ADHD challenges (Starting, Focusing, Overwhelm).
2. **Validate**: Briefly acknowledge why it's hard ("Starting is the hardest part...").
3. **Solve via Deconstruction**: Never give vague advice. Convert every problem into 3 tiny, actionable steps with time estimates.
4. **Iterate**: If the user is confused, ask "What's the very first obstacle you see?"

CONVERSATIONAL GUIDELINES (CRITICAL):
1. **Direct Solution First**: Answer the user's need immediately.
2. **Contextual Awareness**: Use [CURRENT_COGNITIVE_SNAPSHOT] to tailor the difficulty of your solution. (e.g., if tired, suggest easier tasks).
3. **No Repetition**: Do not use "Neural Link Active" or robotic greetings. Start naturally.
4. **NEVER give the same answer twice**. Vary your phrasing, examples, and techniques in every response.
5. **Use diverse productivity frameworks**: Pomodoro, GTD, Eisenhower Matrix, Time Blocking, Eat the Frog, SMART goals, etc.

NEURAL INTERFACE (VOICE & CONTROL):
1. **System Commands**: You can trigger app actions (Timers, Navigation). If a user asks to "start a timer" or "go to stats", confirm it with a "Neural System Message" (e.g., "Executing Focus Sprint protocol... Grid engaged. 🚀").
2. **Audio-Friendly**: For spoken responses, keep lists short and punchy. Use rhythmic structure for cognitive clarity.
3. **Modal Awareness**: Users using the Mic button are often in high-focus states. Minimize conversational fluff.

COGNITIVE ARCHIVE (LONG-TERM MEMORY):
1. **Reflection**: Use [COGNITIVE_ARCHIVE_RETRIEVED] to recall past user breakthroughs or struggles. Link current advice to past memories.
2. **Archiving Strategy**: If a user shares a major win or a specific struggle pattern, suggest they click the "Archive" button to save it to their long-term cognitive core.

COMMUNITY & SOCIAL LINK:
1. **Social Accountability**: If a user is unmotivated, suggest joining a **Co-Working Room** or a **Body Doubling** session for shared momentum.
2. **Focus Battles**: Encourage friendly competition. If a user feels productive, suggest a **Focus Battle** to test their neural precision against others.
3. **Collaboration**: Direct users to the **Collaborative Whiteboard** for team-based neural synthesis.

TRAINING MODES & KNOWLEDGE:
- Use Neural Protocols from: ${JSON.stringify(knowledgeBase, null, 2)}
- Modes: PLANNING (Triage), TRAINING (Drills), DIAGNOSTIC (Patterns).`
        };

        const apiMessages = [systemPrompt, ...messages];

        // Choose API endpoint based on provider
        const apiEndpoint = apiProvider === 'groq'
            ? 'https://api.groq.com/openai/v1/chat/completions'
            : 'https://api.openai.com/v1/chat/completions';

        // Choose model based on provider
        const model = apiProvider === 'groq'
            ? 'llama-3.3-70b-versatile'
            : 'gpt-4o-mini';

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: apiMessages,
                temperature: 0.8,
                max_tokens: 800
            })
        });

        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('Failed to parse AI API response:', parseError);
            throw new Error('Neural Link Malfunction: Invalid response format');
        }

        if (!response.ok || !data?.choices?.[0]?.message) {
            console.error('AI API Failure:', data);
            throw new Error('AI API returned invalid data');
        }

        return res.json({
            message: data.choices[0].message.content
        });
    } catch (error) {
        console.error('AI Route Error:', error.message);
        // Fallback to mock on any error
        const msgs = req.body?.messages;
        const lastUserMessage = Array.isArray(msgs) ? msgs.filter(m => m.role === 'user').pop() : null;
        const mockMessage = getMockResponse(lastUserMessage?.content || '');
        res.json({ message: mockMessage });
    }
});

router.post('/memory', async (req, res) => {
    try {
        const { userId = 'mock-123', context, metadata = {} } = req.body;
        const newMemory = new Memory({ userId, context, metadata });
        await newMemory.save();
        res.json({ status: 'success', message: 'Insight archived to long-term memory' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
