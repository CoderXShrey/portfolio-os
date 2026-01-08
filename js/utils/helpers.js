/* ========================================
   PORTFOLIO OS - HELPER UTILITIES
   ======================================== */

const Helpers = {
    /**
     * Generate unique ID
     */
    generateId: (prefix = 'id') => {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Format date and time
     */
    formatTime: (date = new Date()) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    },

    /**
     * Format uptime
     */
    formatUptime: (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    },

    /**
     * Format file size
     */
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    /**
     * Clone object (deep copy)
     */
    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Merge objects
     */
    merge: (target, ...sources) => {
        return Object.assign({}, target, ...sources);
    },

    /**
     * Escape HTML
     */
    escapeHtml: (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Parse command line arguments
     */
    parseArgs: (commandString) => {
        const args = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < commandString.length; i++) {
            const char = commandString[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ' ' && !inQuotes) {
                if (current) {
                    args.push(current);
                    current = '';
                }
            } else {
                current += char;
            }
        }
        
        if (current) args.push(current);
        return args;
    },

    /**
     * Highlight text with syntax
     */
    highlight: (text, lang = 'bash') => {
        // Simple syntax highlighting (can be extended)
        return Helpers.escapeHtml(text);
    },

    /**
     * Random between min and max
     */
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Debounce function
     */
    debounce: (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Throttle function
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Wait/delay
     */
    wait: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Get element or throw error
     */
    getElement: (selector) => {
        const el = document.querySelector(selector);
        if (!el) throw new Error(`Element not found: ${selector}`);
        return el;
    },

    /**
     * Create element with attributes
     */
    createElement: (tag, attributes = {}, content = '') => {
        const el = document.createElement(tag);
        Object.assign(el, attributes);
        if (content) el.innerHTML = content;
        return el;
    }
};