import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling']
            });
            console.log('⚡ Neural Link Established (Socket)');
        }
        return this.socket;
    }

    joinSquad(squadId) {
        if (this.socket) {
            this.socket.emit('join_squad', squadId);
        }
    }

    onSquadStateSync(callback) {
        if (this.socket) {
            this.socket.on('squad_state_sync', callback);
        }
    }

    onPioneerJoined(callback) {
        if (this.socket) {
            this.socket.on('pioneer_joined', callback);
        }
    }

    onPioneerLeft(callback) {
        if (this.socket) {
            this.socket.on('pioneer_left', callback);
        }
    }

    sendChatMessage(squadId, message, user) {
        if (this.socket) {
            this.socket.emit('chat_message', { squadId, message, user });
        }
    }

    onNewMessage(callback) {
        if (this.socket) {
            this.socket.on('new_message', callback);
        }
    }

    sendTimerAction(squadId, action, duration) {
        if (this.socket) {
            this.socket.emit('timer_action', { squadId, action, duration });
        }
    }

    sendTimerTick(squadId, timeLeft) {
        if (this.socket) {
            this.socket.emit('timer_tick', { squadId, timeLeft });
        }
    }

    onTimerSyncTick(callback) {
        if (this.socket) {
            this.socket.on('timer_sync_tick', callback);
        }
    }

    onTimerUpdated(callback) {
        if (this.socket) {
            this.socket.on('timer_updated', callback);
        }
    }

    sendDrawData(squadId, line) {
        if (this.socket) {
            this.socket.emit('canvas_draw', { squadId, line });
        }
    }

    onCanvasUpdate(callback) {
        if (this.socket) {
            this.socket.on('canvas_update', callback);
        }
    }

    clearCanvas(squadId) {
        if (this.socket) {
            this.socket.emit('canvas_clear', squadId);
        }
    }

    onCanvasCleared(callback) {
        if (this.socket) {
            this.socket.on('canvas_cleared', callback);
        }
    }

    sendPioneerStatus(squadId, status, user) {
        if (this.socket) {
            this.socket.emit('pioneer_status_update', { squadId, status, user });
        }
    }

    onPioneerStatusChanged(callback) {
        if (this.socket) {
            this.socket.on('pioneer_status_changed', callback);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log('🔌 Neural Link Cut (Socket)');
        }
    }
}

const socketService = new SocketService();
export default socketService;
