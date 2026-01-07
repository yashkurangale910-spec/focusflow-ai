// Data Export & Backup Service
export const exportToJSON = (data, filename) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => row[h]).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};

export const exportAllData = () => {
    const tasks = JSON.parse(localStorage.getItem('focusflow_tasks') || '[]');
    const sessions = JSON.parse(localStorage.getItem('focusflow_sessions') || '[]');
    const theme = localStorage.getItem('focusflow_theme');

    const allData = {
        exportDate: new Date().toISOString(),
        tasks,
        sessions,
        settings: { theme },
    };

    exportToJSON(allData, 'focusflow_backup');
};

export const importData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.tasks) localStorage.setItem('focusflow_tasks', JSON.stringify(data.tasks));
                if (data.sessions) localStorage.setItem('focusflow_sessions', JSON.stringify(data.sessions));
                if (data.settings?.theme) localStorage.setItem('focusflow_theme', data.settings.theme);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsText(file);
    });
};
