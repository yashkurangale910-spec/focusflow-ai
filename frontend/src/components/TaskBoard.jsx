import React, { useState } from 'react';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Plus } from 'lucide-react';

const DroppableColumn = ({ column, children }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div
            ref={setNodeRef}
            className="glass-card border-white/10 p-6 rounded-2xl min-h-[500px]"
        >
            {children}
        </div>
    );
};

const TaskBoard = ({ onStartFocus }) => {
    const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const columns = [
        { id: 'todo', title: 'To Do', status: 'todo' },
        { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
        { id: 'done', title: 'Done', status: 'done' },
    ];

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeTask = tasks.find(t => t.id === active.id);
        if (!activeTask) return;

        // Check if dropped on a column container
        let targetStatus = null;
        const overColumn = columns.find(col => col.id === over.id);

        if (overColumn) {
            targetStatus = overColumn.status;
        } else {
            // Dropped on another task - find which column that task is in
            const overTask = tasks.find(t => t.id === over.id);
            if (overTask) {
                targetStatus = overTask.status;
            }
        }

        if (targetStatus && activeTask.status !== targetStatus) {
            moveTask(active.id, targetStatus);
        }
    };

    const handleSaveTask = (formData) => {
        if (editingTask) {
            updateTask(editingTask.id, formData);
        } else {
            addTask(formData);
        }
        setEditingTask(null);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black">Task Board_</h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        Organize your work, track progress, and stay focused.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-105"
                    style={{ backgroundColor: 'var(--color-accent)', color: '#000' }}
                >
                    <Plus size={20} />
                    <span>New Task</span>
                </button>
            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map((column) => {
                        const columnTasks = getTasksByStatus(column.status);

                        return (
                            <DroppableColumn key={column.id} column={column}>
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">{column.title}</h3>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-zinc-500">
                                        {columnTasks.length}
                                    </span>
                                </div>

                                {/* Drop Zone */}
                                <SortableContext
                                    id={column.id}
                                    items={columnTasks.map(t => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div
                                        className="space-y-3 min-h-[400px] p-2 rounded-xl border-2 border-dashed border-white/5 hover:border-white/10 transition-colors"
                                        data-column={column.id}
                                    >
                                        {columnTasks.length === 0 ? (
                                            <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                                                Drop tasks here
                                            </div>
                                        ) : (
                                            columnTasks.map((task) => (
                                                <TaskCard
                                                    key={task.id}
                                                    task={task}
                                                    onEdit={handleEditTask}
                                                    onDelete={deleteTask}
                                                    onStartFocus={onStartFocus}
                                                />
                                            ))
                                        )}
                                    </div>
                                </SortableContext>
                            </DroppableColumn>
                        );
                    })}
                </div>
            </DndContext>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTask}
                task={editingTask}
            />
        </div>
    );
};

export default TaskBoard;
