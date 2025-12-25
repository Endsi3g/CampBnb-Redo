/**
 * Simple hash-based router for CampBnB PWA
 */

class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;

        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }

    /**
     * Register a route
     * @param {string} path - Route path (e.g., '/home', '/listing/:id')
     * @param {Function} handler - Function that returns HTML content
     */
    register(path, handler) {
        this.routes.set(path, handler);
        return this;
    }

    /**
     * Navigate to a route
     * @param {string} path - Route to navigate to
     */
    navigate(path) {
        window.location.hash = path;
    }

    /**
     * Get current hash path
     */
    getPath() {
        return window.location.hash.slice(1) || '/';
    }

    /**
     * Parse path parameters
     * @param {string} routePath - Route pattern
     * @param {string} currentPath - Current URL path
     */
    parseParams(routePath, currentPath) {
        const routeParts = routePath.split('/');
        const pathParts = currentPath.split('/');
        const params = {};

        if (routeParts.length !== pathParts.length) return null;

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
                params[routeParts[i].slice(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                return null;
            }
        }

        return params;
    }

    /**
     * Find matching route
     */
    findRoute(path) {
        // First try exact match
        if (this.routes.has(path)) {
            return { handler: this.routes.get(path), params: {} };
        }

        // Then try pattern matching
        for (const [routePath, handler] of this.routes) {
            const params = this.parseParams(routePath, path);
            if (params !== null) {
                return { handler, params };
            }
        }

        return null;
    }

    /**
     * Handle route change
     */
    async handleRoute() {
        const path = this.getPath();
        const app = document.getElementById('app');

        const route = this.findRoute(path);

        if (route) {
            try {
                const content = await route.handler(route.params);
                app.innerHTML = content;

                // Re-initialize any event listeners
                this.initializePageEvents();

                // Scroll to top
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error loading page:', error);
                app.innerHTML = this.getErrorPage();
            }
        } else {
            // 404 - redirect to home or show error
            this.navigate('/');
        }
    }

    /**
     * Initialize page-specific event listeners
     */
    initializePageEvents() {
        // Handle all internal navigation links
        document.querySelectorAll('[data-navigate]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate(el.dataset.navigate);
            });
        });

        // Handle back buttons
        document.querySelectorAll('[data-back]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.back();
            });
        });
    }

    /**
     * Error page content
     */
    getErrorPage() {
        return `
      <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <span class="material-symbols-outlined text-6xl text-primary mb-4">error_outline</span>
        <h1 class="text-2xl font-bold mb-2">Oops!</h1>
        <p class="text-gray-400 mb-6">Something went wrong.</p>
        <button data-navigate="/" class="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold">
          Go Home
        </button>
      </div>
    `;
    }
}

// Create and export router instance
export const router = new Router();
