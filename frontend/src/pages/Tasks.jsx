import React from 'react';
import TaskBoard from '../components/TaskBoard';

const Tasks = () => {
    const handleStartFocus = (task) => {
        // This will be integrated with Focus Timer later
        console.log('Starting focus session for:', task.title);
        // TODO: Navigate to Focus page and pre-fill with task details
    };

    return (
        <div className="animate-in fade-in zoom-in duration-700">
            <TaskBoard onStartFocus={handleStartFocus} />
        </div>
    );
};

export default Tasks;
