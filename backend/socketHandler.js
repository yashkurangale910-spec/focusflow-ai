const socketIO = require('socket.io');

const socketHandler = (server, allowedOrigins) => {
    const io = socketIO(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    console.log('⚡ Socket.io: Neural Grid Connectivity Established');

    const squadStates = new Map();

    io.on('connection', (socket) => {
        console.log(`🔌 New Pioneer Linked: ${socket.id}`);

        socket.on('join_squad', (squadId) => {
            socket.join(squadId);

            // Initialize squad state if doesn't exist
            if (!squadStates.has(squadId)) {
                squadStates.set(squadId, {
                    pioneers: new Set(),
                    timer: { timeLeft: 0, status: 'idle', duration: 25 * 60 },
                    canvasData: [] // Store drawing strokes
                });
            }

            const state = squadStates.get(squadId);
            state.pioneers.add(socket.id);

            console.log(`🤝 Pioneer ${socket.id} joined Squad: ${squadId}`);

            // Notify others in room
            socket.to(squadId).emit('pioneer_joined', {
                id: socket.id,
                count: state.pioneers.size
            });

            // Send current state to the new joiner (including whiteboard data)
            socket.emit('squad_state_sync', {
                timer: state.timer,
                pioneerCount: state.pioneers.size,
                canvasData: state.canvasData
            });
        });

        socket.on('canvas_draw', (data) => {
            // data: { squadId, line }
            const state = squadStates.get(data.squadId);
            if (state) {
                state.canvasData.push(data.line);
                socket.to(data.squadId).emit('canvas_update', data.line);
            }
        });

        socket.on('canvas_clear', (squadId) => {
            const state = squadStates.get(squadId);
            if (state) {
                state.canvasData = [];
                io.in(squadId).emit('canvas_cleared');
            }
        });

        socket.on('pioneer_status_update', (data) => {
            // data: { squadId, status: 'typing' | 'drawing' | 'idle', user }
            socket.to(data.squadId).emit('pioneer_status_changed', data);
        });

        socket.on('timer_action', (data) => {
            // data: { squadId, action, duration }
            const state = squadStates.get(data.squadId);
            if (state) {
                if (data.action === 'start') {
                    state.timer.status = 'running';
                    state.timer.timeLeft = data.duration;
                    state.timer.duration = data.duration;
                } else if (data.action === 'pause') {
                    state.timer.status = 'paused';
                } else if (data.action === 'reset') {
                    state.timer.status = 'idle';
                    state.timer.timeLeft = 0;
                }

                io.in(data.squadId).emit('timer_updated', state.timer);
            }
        });

        socket.on('timer_tick', (data) => {
            // Received from the "master" client or the one who started it
            const state = squadStates.get(data.squadId);
            if (state) {
                state.timer.timeLeft = data.timeLeft;
                socket.to(data.squadId).emit('timer_sync_tick', { timeLeft: data.timeLeft });
            }
        });

        socket.on('chat_message', (data) => {
            // data: { squadId, message, user }
            const messageData = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date()
            };
            io.in(data.squadId).emit('new_message', messageData);
        });

        socket.on('disconnecting', () => {
            for (const room of socket.rooms) {
                if (squadStates.has(room)) {
                    const state = squadStates.get(room);
                    state.pioneers.delete(socket.id);
                    socket.to(room).emit('pioneer_left', {
                        id: socket.id,
                        count: state.pioneers.size
                    });

                    if (state.pioneers.size === 0) {
                        squadStates.delete(room);
                    }
                }
            }
        });

        socket.on('disconnect', () => {
            console.log(`🔌 Pioneer Unlinked: ${socket.id}`);
        });
    });

    return io;
};

module.exports = socketHandler;
