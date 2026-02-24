import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Eraser, Pen, Trash2, Download } from 'lucide-react';
import socketService from '../services/socketService';

const CollaborativeWhiteboard = ({ squadId }) => {
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#22d3ee');
    const [brushSize, setBrushSize] = useState(3);
    const [lines, setLines] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
    const [remotePioneer, setRemotePioneer] = useState(null);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const containerRef = useRef(null);

    // Responsive Canvas Logic
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: 400
                });
            }
        };

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        socketService.onCanvasUpdate((newLine) => {
            setLines(prev => [...prev, newLine]);
        });

        socketService.onCanvasCleared(() => {
            setLines([]);
        });

        socketService.onPioneerStatusChanged((data) => {
            if (data.status === 'drawing') {
                setRemotePioneer(data.user);
            } else if (data.status === 'idle') {
                setRemotePioneer(null);
            }
        });

        return () => {
            // Clean up listeners if switching squads
            setLines([]);
        };
    }, [squadId]);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        socketService.sendPioneerStatus(squadId, 'drawing', 'Alex_Pioneer');
        const pos = e.target.getStage().getPointerPosition();
        const newLine = {
            tool,
            points: [pos.x, pos.y],
            color: tool === 'eraser' ? '#000000' : color,
            width: tool === 'eraser' ? brushSize * 5 : brushSize
        };
        setLines(prev => [...prev, newLine]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        setLines(prev => {
            const newLines = [...prev];
            const lastLineIdx = newLines.length - 1;
            if (lastLineIdx < 0) return prev;

            const lastLine = { ...newLines[lastLineIdx] };
            lastLine.points = lastLine.points.concat([point.x, point.y]);
            newLines[lastLineIdx] = lastLine;
            return newLines;
        });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        // Broadcast the finished line
        if (lines.length > 0) {
            socketService.sendDrawData(squadId, lines[lines.length - 1]);
        }

        // Notify others that drawing has stopped
        socketService.sendPioneerStatus(squadId, 'idle', 'Alex_Pioneer');
    };

    const handleClear = () => {
        if (window.confirm("Purge all neural blueprints from the grid?")) {
            socketService.clearCanvas(squadId);
        }
    };

    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement('a');
        link.download = `neural-blueprint-${squadId}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const colors = ['#22d3ee', '#10b981', '#f43f5e', '#fbbf24', '#a855f7', '#ffffff'];

    return (
        <div className="flex flex-col h-full bg-black border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/5">
            {/* Whiteboard Header */}
            <div className="flex flex-wrap items-center justify-between p-4 border-b border-white/5 bg-white/5 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Neural Canvas</h3>
                        {remotePioneer && (
                            <span className="text-[8px] font-bold text-emerald-400 animate-pulse uppercase tracking-tight">● {remotePioneer} is sketching...</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/5">
                        {colors.map(c => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setTool('pen'); }}
                                className={`w-4 h-4 rounded-full transition-transform hover:scale-120 ${color === c && tool === 'pen' ? 'ring-2 ring-white scale-110' : ''}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                        <span className="text-[8px] font-bold text-slate-500 uppercase">Size</span>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                            className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-xl transition-all ${tool === 'pen' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        title="Neural Pen"
                    >
                        <Pen size={14} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-xl transition-all ${tool === 'eraser' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        title="Eraser"
                    >
                        <Eraser size={14} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button
                        onClick={handleClear}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all"
                        title="Clear Grid"
                    >
                        <Trash2 size={14} />
                    </button>
                    <button
                        onClick={handleExport}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-xl transition-all"
                        title="Export Blueprint"
                    >
                        <Download size={14} />
                    </button>
                </div>
            </div>

            {/* Drawing Surface */}
            <div ref={containerRef} className="flex-1 cursor-crosshair touch-none relative bg-black">
                <Stage
                    width={dimensions.width}
                    height={dimensions.height}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                    ref={stageRef}
                >
                    <Layer>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={line.width}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>

                {lines.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Grid Awaiting Input</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollaborativeWhiteboard;
