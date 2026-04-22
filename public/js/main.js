// Global Utilities
const SmartSys = {
    showToast: (message, type = 'success') => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            if(toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    },

    toggleTheme: () => {
        const body = document.documentElement;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    checkAuth: (requiredRole = null) => {
        const token = SmartSys.getToken();
        const user = SmartSys.getUser();

        if (!token || !user) {
            window.location.href = '/login.html';
            return false;
        }

        if (requiredRole && user.role !== requiredRole) {
            // Redirect to their respective dashboard
            window.location.href = `/${user.role}-dashboard.html`;
            return false;
        }
        return true;
    },

    apiCall: async (endpoint, options = {}) => {
        const token = SmartSys.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(`/api${endpoint}`, {
                ...options,
                headers
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (error) {
            SmartSys.showToast(error.message, 'error');
            throw error;
        }
    }
};

// Initialize theme on load
document.addEventListener('DOMContentLoaded', () => {
    SmartSys.initTheme();

    // Attach theme toggle listener if button exists
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', SmartSys.toggleTheme);
    }
    
    // Attach logout listener if button exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', SmartSys.logout);
    }
});
