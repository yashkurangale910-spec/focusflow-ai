// Basic API client wrapper for fetch to handle consistency
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthToken = () => {
    return localStorage.getItem('focusflow_token') || 'mock-token';
};

/**
 * Enhanced fetch wrapper with automatic auth headers and error handling
 */
export const apiClient = async (endpoint, options = {}) => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);

        // Handle unauthorized status globally
        if (response.status === 401 && token !== 'mock-token') {
            console.error('Session expired or unauthorized. Redirecting to login...');
            // Optional: window.location.href = '/login'; 
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(errorData.error || `HTTP error! status: ${response.status}`);
            error.status = response.status;
            error.data = errorData;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error(`📡 API Client Error (${endpoint}):`, error.message);
        throw error;
    }
};

export default apiClient;
