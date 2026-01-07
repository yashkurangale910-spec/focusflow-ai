const express = require('express');
const { auth } = require('./auth');
const router = express.Router();

// Proxy AI requests to OpenAI (keeps API key secure on server)
router.post('/chat', auth, async (req, res) => {
    try {
        const { messages } = req.body;

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
            return res.status(response.status).json({ error: data.error });
        }

        res.json({
            message: data.choices[0].message.content
        });
    } catch (error) {
        console.error('AI API Error:', error);
        res.status(500).json({ error: 'AI request failed' });
    }
});

module.exports = router;
