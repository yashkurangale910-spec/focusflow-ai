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
        low: { color: '#06b6d4', label: 'Stable', bg: 'rgba(6, 182, 212, 0.1)', glow: 'shadow-cyan-500/20' },
        medium: { color: '#6366f1', label: 'Active', bg: 'rgba(99, 102, 241, 0.1)', glow: 'shadow-indigo-500/20' },
        high: { color: '#f43f5e', label: 'CRITICAL', bg: 'rgba(244, 63, 94, 0.1)', glow: 'shadow-rose-500/20' },
    };

    const config = priorityConfig[task.priority] || priorityConfig.medium;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group surface-raised p-5 mb-4 hover:border-slate-700/80 transition-all duration-500 relative overflow-hidden rounded-[1.5rem] border border-white/5 ${config.glow}`}
        >
            {/* Holographic Scanning Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

            {/* Neural Priority Link */}
            <div
                className="absolute left-0 top-6 bottom-6 w-[2px] rounded-r-full"
                style={{ background: `linear-gradient(to bottom, transparent, ${config.color}, transparent)` }}
            />

            <div className="flex items-start gap-4 relative z-10">
                {/* Drag Handle - Neural Grip */}
                <button
                    {...attributes}
                    {...listeners}
                    className="mt-1 text-slate-700 hover:text-cyan-400 cursor-grab active:cursor-grabbing transition-all p-1 bg-white/5 rounded-lg border border-white/5"
                >
                    <GripVertical size={14} />
                </button>

                {/* Directive Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span
                                className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border shadow-sm"
                                style={{
                                    backgroundColor: config.bg,
                                    color: config.color,
                                    borderColor: `${config.color}30`
                                }}
                            >
                                {config.label}
                            </span>
                            <div className="h-1 w-1 rounded-full bg-slate-700" />
                            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Protocol {task.id.toString().slice(-4)}</span>
                        </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-200 mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                        {task.title}
                    </h4>

                    {task.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                            {task.description}
                        </p>
                    )}

                    {/* Telemetry Block */}
                    <div className="flex items-center gap-4 py-2 px-3 bg-black/40 rounded-xl border border-white/5 w-fit">
                        <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase tracking-[0.1em]">
                            <Clock size={10} className="text-cyan-500/50" />
                            <span>Interval: <span className="text-slate-300">{task.estimatedTime}M</span></span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/5" />
                        <div className="flex items-center gap-2 text-[9px] text-slate-500 font-black uppercase tracking-[0.1em]">
                            <span className="text-indigo-400/50">●</span>
                            <span>Stream: Active</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Neural Action Grid */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
                <button
                    onClick={() => onStartFocus(task)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/20 active:scale-95 group/btn overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Play size={10} fill="currentColor" className="relative z-10" />
                    <span className="relative z-10">Initiate Link</span>
                </button>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all border border-white/5"
                        title="Calibrate Directive"
                    >
                        <Edit size={14} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all border border-white/5"
                        title="Purge Link"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
