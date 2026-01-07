// Updated API service to call backend instead of OpenAI directly
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
    return localStorage.getItem('focusflow_token');
};

export const chatWithAI = async (messages, systemPrompt = null) => {
    try {
        const token = getAuthToken();
        if (!token) {
            return "Please log in to use AI features.";
        }

        const defaultSystemPrompt = `You are a friendly, supportive productivity coach for FocusFlow AI - an app designed for people with ADHD, Autism, and focus challenges.

Your personality:
- Warm, encouraging, and empathetic
- Use natural, conversational language (never robotic or corporate)
- Keep responses concise but meaningful
- Use emojis occasionally to feel more human
- Be genuinely helpful, not just polite

Your expertise:
- Task breakdown (breaking overwhelming tasks into tiny, manageable steps)
- Focus strategies tailored to neurodivergent minds
- Pomodoro and other time management techniques
- Motivation without pressure
- Understanding executive dysfunction

Guidelines:
- If someone shares a big task, break it down into 3-5 micro-steps
- Celebrate small wins
- Never be judgmental about procrastination or struggles
- Suggest focus session lengths based on the task
- Be realistic about time estimates
- Use phrases like "Hey", "Let's", "You got this"
- Avoid corporate speak like "I'd be happy to assist"

Remember: You're a supportive friend who happens to know a lot about productivity.`;

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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'AI request failed');
        }

        return data.message;
    } catch (error) {
        console.error('AI API Error:', error);
        return "Oops, something went wrong. Can you try again? 🤔";
    }
};

export const breakDownTask = async (taskTitle, taskDescription = '') => {
    const prompt = `Break down this task into 3-5 tiny, actionable micro-steps. Be specific and realistic.

Task: ${taskTitle}
${taskDescription ? `Details: ${taskDescription}` : ''}

Format each step like:
1. [Step description] (estimated time)

Keep it simple and approachable!`;

    const response = await chatWithAI([
        { role: 'user', content: prompt }
    ]);

    return response;
};

export const getFocusRecommendation = async (taskTitle, userContext = '') => {
    const prompt = `Based on this task, suggest:
1. Ideal focus session length (Pomodoro/Deep Focus/Custom)
2. One specific tip for staying focused on this type of work

Task: ${taskTitle}
${userContext ? `Context: ${userContext}` : ''}

Keep it brief and actionable!`;

    const response = await chatWithAI([
        { role: 'user', content: prompt }
    ]);

    return response;
};
