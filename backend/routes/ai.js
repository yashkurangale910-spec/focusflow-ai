const express = require('express');
const { auth } = require('./auth');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let knowledgeBase = {};
try {
    const kbPath = path.join(__dirname, '../utils/neural_knowledge.json');
    knowledgeBase = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
} catch (error) {
    console.error('Failed to load neural knowledge base:', error);
}

// Mock responses for demo mode when no OpenAI key
const mockResponses = [
    "Great question! Here's a quick tip: Break your task into smaller chunks of 10-15 minutes each. This makes it way less overwhelming! 🎯",
    "I hear you! For focusing, try the 2-minute rule - if something takes less than 2 minutes, do it now. Otherwise, schedule it! ⚡",
    "Nice! Let's tackle this together. What's the ONE most important thing you need to finish today? Focus on that first! 🚀",
    "Focus tip: Put your phone in another room, set a 25-min timer, and tell yourself 'just this one session'. You've got this! 💪",
    "Here's what works: Start with the easiest part of your task first. Small wins build momentum! 🌟",
    "Try this: Write down 3 things you want to accomplish. Cross them off as you go - super satisfying! ✅",
];

const getMockResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    // Deep Intent Recognition for common ADHD/Executive Function struggles
    const intentMap = [
        {
            keywords: ['start', 'stuck', 'begin', 'how', 'procrastinat', 'cant do', 'brain no', 'solve'],
            response: "Starting is the hardest part for our brains. Let's use the 🎯 **'Tiny First Step'** rule:\n\n1. What is the smallest, easiest part of this task? (e.g., 'Open the file')\n2. Do that for just 2 minutes.\n3. The goal isn't the task; it's just the 2 minutes.\n\nWhat's that tiny step for you right now?"
        },
        {
            keywords: ['focus', 'concentrate', 'distract', 'attention'],
            response: "Focus follows environment. Try this 🌊 **Reset Protocol**:\n\n1. Move your phone out of sight.\n2. Put on white noise or lo-fi.\n3. Set a 25-min timer.\n4. Close all unrelated tabs.\n\nReady to dive into a Pomodoro sprint?"
        },
        {
            keywords: ['break down', 'big', 'overwhelm', 'too much', 'task'],
            response: "Overwhelm is just a lack of clarity. Let's 🧩 **Deconstruct**:\n\n1. What's the 'big' thing?\n2. What are the 3 sub-parts of it?\n3. Which one can we do in 10 mins?\n\nTell me the big thing, and I'll break it into micro-steps for you."
        },
        {
            keywords: ['plan', 'today', 'prioritize', 'what'],
            response: "Let's align your day with your 🔋 **Energy Levels**:\n\n1. What's your top 'Must-Do' when your energy is highest?\n2. What can wait until you're lower energy?\n3. Let's build a timeline. What's the #1 priority?"
        },
        {
            keywords: ['hi', 'hello', 'hey', 'sup', 'who are you'],
            response: "Neural Link Established. I am your **Neural Coach**. I specialize in helping ADHD brains optimize focus and execution. \n\nI can help you:\n- 📝 **Plan** your sprints\n- 🧩 **Break down** overwhelming tasks\n- 🌊 **Reset** your focus\n\nWhat's on your mind right now?"
        }
    ];

    const match = intentMap.find(intent => intent.keywords.some(k => lowerMsg.includes(k)));
    if (match) return match.response;

    const tips = [
        "Break your task into chunks of 15 minutes. It bypasses the 'it's too much' alarm in your brain! 🎯",
        "Put your phone in another room. Physical distance = mental focus! 📱💨",
        "Small wins build dopamine. Finish one tiny thing now! 🌟",
        "Try the 2-minute rule: If it takes < 2 mins, do it now! ⚡",
        "Your brain needs novelty. Try changing your workspace! 🛋️✨",
        "Drink some water. Dehydration is the #1 silent killer of focus. 💧🧠"
    ];
    return tips[Math.floor(Math.random() * tips.length)];
};

// Proxy AI requests to OpenAI (keeps API key secure on server)
router.post('/chat', auth, async (req, res) => {
    try {
        const { messages } = req.body;

        // If no API key, use mock responses
        const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
        const apiProvider = process.env.AI_PROVIDER || 'openai';

        if (!apiKey || process.env.DB_STATUS === 'offline') {
            // Even if DB is offline, we can still try the AI if we have the key!
            // But if the server is struggling, use the mock.
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            const mockMessage = getMockResponse(lastUserMessage?.content || '');

            // If we have an API key, LET'S TRY IT ANYWAY even if DB is offline!
            if (apiKey) {
                console.log('DB Offline but AI Key present. Attempting Neural Connection...');
            } else {
                return res.json({ message: `[NEURAL BACKUP MODE]\n\n${mockMessage}` });
            }
        }

        const systemPrompt = {
            role: 'system',
            content: `You are the "Neural Coach", a specialized AI performance assistant for FocusFlow AI.

PROBLEM-SOLVING FRAMEWORK (DECONSTRUCT & SOLVE):
1. **Understand Intent**: The user may use vague words ("slove it", "help"). Always interpret this through the lens of ADHD challenges (Starting, Focusing, Overwhelm).
2. **Validate**: Briefly acknowledge why it's hard ("Starting is the hardest part...").
3. **Solve via Deconstruction**: Never give vague advice. Convert every problem into 3 tiny, actionable steps with time estimates.
4. **Iterate**: If the user is confused, ask "What's the very first obstacle you see?"

CONVERSATIONAL GUIDELINES (CRITICAL):
1. **Direct Solution First**: Answer the user's need immediately.
2. **Contextual Awareness**: Use [CURRENT_COGNITIVE_SNAPSHOT] to tailor the difficulty of your solution. (e.g., if tired, suggest easier tasks).
3. **No Repetition**: Do not use "Neural Link Active" or robotic greetings. Start naturally.

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
            ? 'llama-3.3-70b-versatile'  // Groq's best model
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
                temperature: 0.7,
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

        if (!response.ok || !data || !data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('AI API Failure:', data);
            // Fallback to mock on API error
            const messages = req.body?.messages;
            const lastUserMessage = Array.isArray(messages) ? messages.filter(m => m.role === 'user').pop() : null;
            const mockMessage = getMockResponse(lastUserMessage?.content || '');
            return res.json({ message: `[NEURAL BACKUP MODE]\n\n${mockMessage}` });
        }

        res.json({
            message: data.choices[0].message.content
        });
    } catch (error) {
        console.error('AI Route Internal Error:', error.message);
        // Fallback to mock on any internal error
        const messages = req.body?.messages;
        const lastUserMessage = Array.isArray(messages) ? messages.filter(m => m.role === 'user').pop() : null;
        const mockMessage = getMockResponse(lastUserMessage?.content || '');
        res.json({ message: `[NEURAL BACKUP MODE]\n\n${mockMessage}` });
    }
});

module.exports = router;
