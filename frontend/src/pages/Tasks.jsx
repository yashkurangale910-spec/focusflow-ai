import TaskBoard from '../components/TaskBoard';

const Tasks = ({ onStartFocus }) => {
    return (
        <div className="animate-in fade-in zoom-in duration-700">
            <TaskBoard onStartFocus={onStartFocus} />
        </div>
    );
};

export default Tasks;
