const express = require('express');
const { auth } = require('./auth');
const router = express.Router();

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
    // Simple keyword matching for more relevant responses
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('focus') || lowerMsg.includes('concentrate')) {
        return "To improve focus, try these steps:\n\n1. 🎧 Put on some lo-fi or white noise\n2. 📱 Put your phone on airplane mode\n3. ⏱️ Set a 25-minute timer\n4. 🎯 Work on ONE task only\n5. ☕ Take a 5-min break after!\n\nWant me to help you break down a specific task?";
    }
    if (lowerMsg.includes('task') || lowerMsg.includes('break down') || lowerMsg.includes('help')) {
        return "I'd love to help break that down! Here's my approach:\n\n1. 📝 What's the main goal?\n2. 🔍 What's the very FIRST tiny step?\n3. ⏰ How long will each step take?\n\nTell me more about what you're working on!";
    }
    if (lowerMsg.includes('procrastinat') || lowerMsg.includes('stuck') || lowerMsg.includes('can\'t start')) {
        return "I totally get it - starting is the hardest part! Try this:\n\n🎲 The 5-minute rule: Commit to just 5 minutes. That's it!\n\nUsually once you start, you'll want to keep going. And if not? That's okay too - you still did 5 minutes more than zero! 💪";
    }
    // Random response
    return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

// Proxy AI requests to OpenAI (keeps API key secure on server)
router.post('/chat', auth, async (req, res) => {
    try {
        const { messages } = req.body;

        // If no API key, use mock responses
        if (!process.env.OPENAI_API_KEY) {
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            const mockMessage = getMockResponse(lastUserMessage?.content || '');
            return res.json({ message: mockMessage });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                temperature: 0.8,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Fallback to mock if API fails
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            const mockMessage = getMockResponse(lastUserMessage?.content || '');
            return res.json({ message: mockMessage });
        }

        res.json({
            message: data.choices[0].message.content
        });
    } catch (error) {
        console.error('AI API Error:', error);
        // Fallback to mock on error
        const { messages } = req.body;
        const lastUserMessage = messages?.filter(m => m.role === 'user').pop();
        const mockMessage = getMockResponse(lastUserMessage?.content || '');
        res.json({ message: mockMessage });
    }
});

module.exports = router;
