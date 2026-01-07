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
        opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
        low: '#10b981',
        medium: '#f59e0b',
        high: '#ef4444',
    };

    const priorityLabels = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group glass-card border-white/10 p-4 rounded-xl mb-3 hover:border-white/20 transition-all"
        >
            {/* Priority Indicator */}
            <div
                className="h-1 w-full rounded-full mb-3"
                style={{ backgroundColor: priorityColors[task.priority] }}
            />

            <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="mt-1 text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing transition-colors"
                >
                    <GripVertical size={18} />
                </button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white mb-1 truncate">{task.title}</h4>
                    {task.description && (
                        <p className="text-sm text-zinc-500 line-clamp-2 mb-2">
                            {task.description}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-zinc-600">
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{task.estimatedTime}m</span>
                        </div>
                        <span
                            className="px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                            style={{
                                backgroundColor: `${priorityColors[task.priority]}20`,
                                color: priorityColors[task.priority],
                            }}
                        >
                            {priorityLabels[task.priority]}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onStartFocus(task)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                        backgroundColor: 'var(--color-accent)',
                        color: '#000',
                    }}
                >
                    <Play size={14} />
                    <span>Focus</span>
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                >
                    <Edit size={14} />
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
