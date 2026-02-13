async function testBackendAI() {
    try {
        const response = await fetch('http://localhost:5000/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer mock-token'
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'hi' }]
            })
        });

        const data = await response.json();
        console.log('Backend AI Response:', data);
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testBackendAI();
