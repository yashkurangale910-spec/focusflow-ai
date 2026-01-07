// Voice Command Service
export const initVoiceCommands = (callbacks) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();

        if (command.includes('start') || command.includes('begin')) {
            callbacks.onStart && callbacks.onStart();
        } else if (command.includes('pause') || command.includes('stop')) {
            callbacks.onPause && callbacks.onPause();
        } else if (command.includes('reset')) {
            callbacks.onReset && callbacks.onReset();
        } else if (command.includes('pomodoro')) {
            callbacks.onPomodoro && callbacks.onPomodoro();
        } else if (command.includes('deep focus')) {
            callbacks.onDeepFocus && callbacks.onDeepFocus();
        }
    };

    return recognition;
};

// Keyboard Shortcuts
export const setupKeyboardShortcuts = (callbacks) => {
    const handleKeyPress = (e) => {
        // Ctrl/Cmd + Space: Start/Pause
        if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
            e.preventDefault();
            callbacks.onToggle && callbacks.onToggle();
        }
        // Ctrl/Cmd + R: Reset
        else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyR') {
            e.preventDefault();
            callbacks.onReset && callbacks.onReset();
        }
        // Ctrl/Cmd + K: Command Palette
        else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
            e.preventDefault();
            callbacks.onCommandPalette && callbacks.onCommandPalette();
        }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
};
