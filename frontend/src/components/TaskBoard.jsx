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
import { Plus, ListTodo, Activity, CheckCircle2 } from 'lucide-react';

const DroppableColumn = ({ column, tasksCount, children }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    const icons = {
        todo: ListTodo,
        'in-progress': Activity,
        done: CheckCircle2
    };
    const Icon = icons[column.id];

    return (
        <div
            ref={setNodeRef}
            className="surface-flat p-6 rounded-2xl min-h-[600px] flex flex-col bg-slate-900/30"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <Icon size={16} className="text-indigo-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-tight uppercase">{column.title}</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-500 border border-slate-700/50">
                    {tasksCount}
                </span>
            </div>
            {children}
        </div>
    );
};

const TaskBoard = ({ onStartFocus }) => {
    const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const columns = [
        { id: 'todo', title: 'Pending', status: 'todo' },
        { id: 'in-progress', title: 'Active', status: 'in-progress' },
        { id: 'done', title: 'Complete', status: 'done' },
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
        <div className="space-y-10 animate-soft-entry">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400 mb-1">Workflow Manager</p>
                    <h2 className="text-3xl font-extrabold font-display">Priority <span className="text-slate-500 font-light italic">Board</span></h2>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                    <Plus size={18} />
                    <span>Create Task</span>
                </button>
            </div>

            {/* Kanban Board */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {columns.map((column) => {
                        const columnTasks = getTasksByStatus(column.status);

                        return (
                            <DroppableColumn key={column.id} column={column} tasksCount={columnTasks.length}>
                                <SortableContext
                                    id={column.id}
                                    items={columnTasks.map(t => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div
                                        className="flex-1 space-y-4 rounded-xl transition-colors"
                                        data-column={column.id}
                                    >
                                        {columnTasks.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-800/50 rounded-2xl text-slate-600 text-xs font-bold uppercase tracking-widest gap-2">
                                                <span>No tasks present</span>
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
