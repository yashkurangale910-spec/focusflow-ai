// AI service with built-in fallback for demo mode
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
    return localStorage.getItem('focusflow_token') || 'mock-token';
};

// Fuzzy matching helper - checks if input is similar to target (handles typos)
const fuzzyMatch = (input, target) => {
    if (input.includes(target)) return true;

    // Check for common typo patterns - allow 1-2 character differences
    const words = input.split(/\s+/);
    for (const word of words) {
        if (word.length < 3) continue;

        // Quick similarity check - count matching characters
        let matches = 0;
        const shorter = word.length < target.length ? word : target;
        const longer = word.length >= target.length ? word : target;

        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }

        // If 70%+ characters match and similar length, consider it a match
        const similarity = matches / longer.length;
        const lengthRatio = shorter.length / longer.length;

        if (similarity >= 0.6 && lengthRatio >= 0.7) {
            return true;
        }
    }
    return false;
};

// Fallback responses when backend is unavailable
const getFallbackResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (fuzzyMatch(lowerMsg, 'focus') || fuzzyMatch(lowerMsg, 'concentrate') || fuzzyMatch(lowerMsg, 'attention')) {
        return "To improve focus, try these steps:\n\n1. 🎧 Put on some lo-fi or white noise\n2. 📱 Put your phone on airplane mode\n3. ⏱️ Set a 25-minute timer\n4. 🎯 Work on ONE task only\n5. ☕ Take a 5-min break after!\n\nWant me to help you break down a specific task?";
    }
    if (fuzzyMatch(lowerMsg, 'schedule') || fuzzyMatch(lowerMsg, 'plan') || fuzzyMatch(lowerMsg, 'calendar') || fuzzyMatch(lowerMsg, 'organize')) {
        return "Great thinking about scheduling! Here's how to organize your time:\n\n📅 Block time for your most important task first\n⏰ Use time-boxing: assign specific hours to tasks\n🎯 Leave buffer time between activities\n✨ Review and adjust your plan each morning\n\nWhat would you like to schedule?";
    }
    if (fuzzyMatch(lowerMsg, 'task') || fuzzyMatch(lowerMsg, 'break down') || lowerMsg.includes('help')) {
        return "I'd love to help break that down! Here's my approach:\n\n1. 📝 What's the main goal?\n2. 🔍 What's the very FIRST tiny step?\n3. ⏰ How long will each step take?\n\nTell me more about what you're working on!";
    }
    if (fuzzyMatch(lowerMsg, 'procrastinate') || fuzzyMatch(lowerMsg, 'stuck') || lowerMsg.includes("can't start")) {
        return "I totally get it - starting is the hardest part! Try this:\n\n🎲 The 5-minute rule: Commit to just 5 minutes. That's it!\n\nUsually once you start, you'll want to keep going. And if not? That's okay too - you still did 5 minutes more than zero! 💪";
    }
    if (fuzzyMatch(lowerMsg, 'motivation') || fuzzyMatch(lowerMsg, 'tired') || fuzzyMatch(lowerMsg, 'energy')) {
        return "Low energy days happen! Here are some quick wins:\n\n☕ Get a drink of water (dehydration = brain fog)\n🚶 Take a 2-minute walk\n🎵 Put on your favorite pump-up song\n\nSometimes just changing your environment helps. You've got this! 🌟";
    }

    // Default responses
    const defaults = [
        "Great question! Here's a quick tip: Break your task into smaller chunks of 10-15 minutes each. This makes it way less overwhelming! 🎯",
        "I hear you! For focusing, try the 2-minute rule - if something takes less than 2 minutes, do it now. Otherwise, schedule it! ⚡",
        "Nice! Let's tackle this together. What's the ONE most important thing you need to finish today? Focus on that first! 🚀",
        "Focus tip: Put your phone in another room, set a 25-min timer, and tell yourself 'just this one session'. You've got this! 💪",
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
};

export const chatWithAI = async (messages, systemPrompt = null) => {
    const token = getAuthToken();
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';

    const defaultSystemPrompt = `You are a friendly, supportive productivity coach for FocusFlow AI.
Keep responses concise, warm, and encouraging. Use emojis occasionally.`;

    try {
        const response = await fetch(`${API_URL}/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt || defaultSystemPrompt },
                    ...messages,
                ],
            }),
        });

        if (!response.ok) {
            console.warn('Backend AI failed, using fallback');
            return getFallbackResponse(lastUserMessage);
        }

        const data = await response.json();
        return data.message || getFallbackResponse(lastUserMessage);
    } catch (error) {
        console.warn('AI API Error, using fallback:', error.message);
        return getFallbackResponse(lastUserMessage);
    }
};

export const breakDownTask = async (taskTitle, taskDescription = '') => {
    const prompt = `Break down this task into 3-5 tiny, actionable micro-steps. Be specific and realistic.

Task: ${taskTitle}
${taskDescription ? `Details: ${taskDescription}` : ''}

Format each step like:
1. [Step description] (estimated time)

Keep it simple and approachable!`;

    return await chatWithAI([{ role: 'user', content: prompt }]);
};

export const getFocusRecommendation = async (taskTitle, userContext = '') => {
    const prompt = `Based on this task, suggest:
1. Ideal focus session length (Pomodoro/Deep Focus/Custom)
2. One specific tip for staying focused on this type of work

Task: ${taskTitle}
${userContext ? `Context: ${userContext}` : ''}

Keep it brief and actionable!`;

    return await chatWithAI([{ role: 'user', content: prompt }]);
};
export const triageTasks = async (tasks) => {
    if (!tasks || tasks.length === 0) return [];

    const taskList = tasks.map((t, i) => `${i + 1}. ${t.title} (${t.priority} priority)`).join('\n');
    const prompt = `As a Neural Coach for ADHD users, reorder these tasks based on the "INCUP" model (Interest, Novelty, Challenge, Urgency, Proximity).
    
    Current Tasks:
    ${taskList}

    Return a JSON array of the task TITLES ONLY, sorted from most engaging/critical to least.
    Example format: ["Task A", "Task B", "Task C"]
    
    IMPORTANT: Return ONLY the JSON array.`;

    try {
        const response = await chatWithAI([{ role: 'user', content: prompt }], "You are a specialized ADHD task prioritization engine. Respond ONLY with valid JSON.");
        // Try to find the JSON array in the response
        const jsonMatch = response.match(/\[.*\]/s);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return tasks.map(t => t.title); // Fallback to original order
    } catch (error) {
        console.error('Triage failed:', error);
        return tasks.map(t => t.title);
    }
};
