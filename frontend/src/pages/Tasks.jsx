import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus, MoreHorizontal, Edit3, Trash2, Zap,
    CheckCircle, Clock, Target, PlayCircle, Pause,
    Grid, Calendar, BarChart3, Circle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Tasks = ({ onStartFocus }) => {
    const { tasks, addTask, updateTask, deleteTask, getTasksByStatus } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const queueTasks = getTasksByStatus('todo');
    const activeTasks = getTasksByStatus('in-progress');
    const completedTasks = getTasksByStatus('done');

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-500/10 text-red-400 border border-red-500/20';
            case 'medium':
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
            case 'low':
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
        }
    };

    const TaskCard = ({ task, isActive = false, isCompleted = false }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-slate-900 border rounded-lg p-4 shadow-sm hover:border-slate-700 transition-all duration-200 ${isActive ? 'border-cyan-500/30 bg-slate-900 shadow-lg' :
                    isCompleted ? 'opacity-60 grayscale-[0.5] hover:opacity-90 hover:grayscale-0' :
                        'border-slate-800/80'
                }`}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        getPriorityStyle(task.priority)
                    }`}>
                    {isCompleted ? 'Completed' : `${task.priority || 'medium'} Priority`}
                </span>
                {isActive && (
                    <div className="flex items-center gap-1.5 text-cyan-400">
                        <span className="size-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-tighter uppercase">Focus Active</span>
                    </div>
                )}
                {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
                {!isActive && !isCompleted && (
                    <span className="text-[10px] font-mono text-slate-500">#{task.id?.slice(0, 3) || '000'}</span>
                )}
            </div>

            <h4 className={`font-semibold text-sm mb-1.5 leading-tight ${isCompleted ? 'text-slate-300 line-through' : 'text-white'
                }`}>
                {task.title}
            </h4>
            <p className={`text-xs mb-5 line-clamp-2 ${isCompleted ? 'text-slate-500' : 'text-slate-400'
                }`}>
                {task.description || 'No description provided.'}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
                {isCompleted ? (
                    <>
                        <span className="text-[9px] text-slate-600 uppercase font-mono">
                            {new Date(task.completedAt || Date.now()).toLocaleDateString()}
                        </span>
                        <button
                            onClick={() => updateTask(task.id, { status: 'todo' })}
                            className="text-[10px] text-cyan-500 font-bold hover:text-cyan-400 tracking-tighter"
                        >
                            REOPEN
                        </button>
                    </>
                ) : isActive ? (
                    <>
                        <div className="flex gap-1">
                            <button className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors">
                                <Edit3 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateTask(task.id, { status: 'todo' })}
                                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[11px] font-bold rounded border border-slate-700 hover:bg-slate-700 transition-colors"
                            >
                                PAUSE
                            </button>
                            <button
                                onClick={() => updateTask(task.id, { status: 'done', completedAt: new Date() })}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded shadow-md shadow-emerald-600/10 transition-colors"
                            >
                                COMPLETE
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-1">
                            <button className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors">
                                <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                updateTask(task.id, { status: 'in-progress' });
                                if (onStartFocus) onStartFocus(task);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/10 text-cyan-400 text-[11px] font-bold rounded border border-cyan-500/20 hover:bg-cyan-600/20 transition-all"
                        >
                            <Zap className="w-3 h-3" />
                            START FOCUS
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );

    const Column = ({ title, count, children, isActive = false, isCompleted = false, icon: Icon }) => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-xs uppercase tracking-widest ${isActive ? 'text-cyan-400' : isCompleted ? 'text-slate-500' : 'text-slate-300'
                        }`}>
                        {title}
                    </h3>
                    <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${isActive ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20' :
                            isCompleted ? 'bg-slate-800/50 text-slate-600 border border-slate-800' :
                                'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                        {String(count).padStart(2, '0')}
                    </span>
                </div>
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className={`flex flex-col gap-4 rounded-xl p-3 min-h-[calc(100vh-280px)] border ${isActive ? 'bg-cyan-500/5 border-cyan-500/20' :
                    isCompleted ? 'bg-slate-950/20 border-slate-800 border-dashed' :
                        'bg-slate-900/40 border-slate-800/50'
                }`}>
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Mission Control Board</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage your neural workflows and task execution state.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-cyan-600/20 transition-all border border-cyan-400/20"
                    >
                        <Plus className="w-5 h-5" />
                        New Mission
                    </button>
                    <button className="p-2.5 border border-slate-800 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition-colors">
                        <Grid className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Column title="Neural Queue" count={queueTasks.length} icon={Clock}>
                    {queueTasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </Column>

                <Column title="Live Mission" count={activeTasks.length} isActive icon={Target}>
                    {activeTasks.map(task => (
                        <TaskCard key={task.id} task={task} isActive />
                    ))}
                </Column>

                <Column title="Archived Logs" count={completedTasks.length} isCompleted icon={CheckCircle}>
                    {completedTasks.map(task => (
                        <TaskCard key={task.id} task={task} isCompleted />
                    ))}
                </Column>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 size-14 bg-cyan-600 text-white rounded-full shadow-2xl shadow-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500 active:scale-95 transition-all flex items-center justify-center z-50"
            >
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Tasks;
