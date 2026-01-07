import React, { useState } from 'react';
import { Download, Upload, Trash2, Database } from 'lucide-react';
import { exportAllData, exportToCSV, importData } from '../services/dataExportService';
import { useAnalytics } from '../context/AnalyticsContext';
import { useTasks } from '../context/TaskContext';

const DataManager = () => {
    const { sessions } = useAnalytics();
    const { tasks } = useTasks();
    const [importing, setImporting] = useState(false);

    const handleExportJSON = () => {
        exportAllData();
    };

    const handleExportCSV = () => {
        exportToCSV(sessions, 'focusflow_sessions');
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImporting(true);
        try {
            await importData(file);
            alert('Data imported successfully! Refresh the page to see changes.');
        } catch (error) {
            alert('Error importing data: ' + error.message);
        } finally {
            setImporting(false);
        }
    };

    const handleClearAll = () => {
        if (confirm('Are you sure? This will delete ALL your data!')) {
            localStorage.clear();
            alert('All data cleared. Refresh the page.');
        }
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Database size={24} className="text-accent" />
                <h3 className="text-xl font-bold">Data Management</h3>
            </div>

            <div className="space-y-3">
                <button
                    onClick={handleExportJSON}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all"
                >
                    <Download size={20} className="text-accent" />
                    <div className="text-left flex-1">
                        <p className="font-bold">Export All Data (JSON)</p>
                        <p className="text-xs text-zinc-500">Backup tasks, sessions, and settings</p>
                    </div>
                </button>

                <button
                    onClick={handleExportCSV}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all"
                >
                    <Download size={20} className="text-green-500" />
                    <div className="text-left flex-1">
                        <p className="font-bold">Export Sessions (CSV)</p>
                        <p className="text-xs text-zinc-500">Download session history as spreadsheet</p>
                    </div>
                </button>

                <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all cursor-pointer">
                    <Upload size={20} className="text-blue-500" />
                    <div className="text-left flex-1">
                        <p className="font-bold">{importing ? 'Importing...' : 'Import Data'}</p>
                        <p className="text-xs text-zinc-500">Restore from backup file</p>
                    </div>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                        disabled={importing}
                    />
                </label>

                <button
                    onClick={handleClearAll}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all"
                >
                    <Trash2 size={20} className="text-red-400" />
                    <div className="text-left flex-1">
                        <p className="font-bold text-red-400">Clear All Data</p>
                        <p className="text-xs text-red-400/70">Permanently delete everything</p>
                    </div>
                </button>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30">
                <p className="text-sm text-zinc-300">
                    <strong>{tasks.length} tasks</strong> and <strong>{sessions.length} sessions</strong> stored locally
                </p>
            </div>
        </div>
    );
};

export default DataManager;
