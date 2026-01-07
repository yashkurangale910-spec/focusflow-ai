// Simple notification service for browser notifications
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
};

export const sendNotification = (title, options = {}) => {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            icon: '/vite.svg',
            badge: '/vite.svg',
            ...options,
        });
    }
};

export const notifySessionComplete = (duration) => {
    sendNotification('Focus Session Complete! 🎉', {
        body: `Great work! You focused for ${duration} minutes.`,
        tag: 'session-complete',
    });
};

export const notifyBreakTime = () => {
    sendNotification('Time for a Break 🧘', {
        body: 'Step away from your work and recharge.',
        tag: 'break-reminder',
    });
};
