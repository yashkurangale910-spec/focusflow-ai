import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Clock, Trash2, Edit, Play } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStartFocus }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const priorityConfig = {
        low: { color: '#10b981', label: 'Low', bg: 'rgba(16, 185, 129, 0.1)' },
        medium: { color: '#f59e0b', label: 'Medium', bg: 'rgba(245, 158, 11, 0.1)' },
        high: { color: '#ef4444', label: 'High', bg: 'rgba(239, 68, 68, 0.1)' },
    };

    const config = priorityConfig[task.priority] || priorityConfig.medium;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group surface-raised p-5 mb-4 hover:border-slate-700/80 transition-all duration-300 relative overflow-hidden"
        >
            {/* Subtle Priority Side Indicator */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: config.color }}
            />

            <div className="flex items-start gap-4">
                {/* Drag Handle - More subtle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="mt-1 text-slate-600 hover:text-indigo-400 cursor-grab active:cursor-grabbing transition-colors p-1"
                >
                    <GripVertical size={16} />
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border"
                            style={{
                                backgroundColor: config.bg,
                                color: config.color,
                                borderColor: `${config.color}30`
                            }}
                        >
                            {config.label}
                        </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
                        {task.title}
                    </h4>

                    {task.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-medium">
                            {task.description}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            <Clock size={12} className="text-slate-600" />
                            <span>{task.estimatedTime}m</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions Panel - Cleaner integration */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-800/50">
                <button
                    onClick={() => onStartFocus(task)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/10 active:scale-95"
                >
                    <Play size={12} fill="currentColor" />
                    <span>Focus</span>
                </button>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800"
                    >
                        <Edit size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 rounded-lg bg-slate-800/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all border border-slate-800"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
