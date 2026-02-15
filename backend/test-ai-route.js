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
        if (response.ok) {
            console.log('✅ Backend AI Response Success:', data);
        } else {
            console.error('❌ Backend AI Response Error:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('🚨 Test failed to execute:', error.message);
    }
}

testBackendAI();
