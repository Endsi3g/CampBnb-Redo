/**
 * Profile Page
 * Displays user info and stats
 */
import { auth, getCurrentUser, bookings } from '../api.js';
import { bottomNav } from '../components/bottom-nav.js';

export async function profilePage() {
    const currentUser = await getCurrentUser();

    // Redirect if not logged in
    if (!currentUser) {
        window.location.hash = '/signin';
        return;
    }

    // Stats
    let tripsCount = 0;

    async function loadData() {
        try {
            const bookingsRes = await bookings.list();
            tripsCount = bookingsRes.total || (bookingsRes.data ? bookingsRes.data.length : (Array.isArray(bookingsRes) ? bookingsRes.length : 0));
            render();
        } catch (e) {
            console.error(e);
        }
    }

    function render() {
        const app = document.getElementById('app');
        if (!app) return;

        // Avatar fallback using UI Avatars
        const avatarUrl = currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=11d452&color=fff`;

        app.innerHTML = `
            <div class="pb-24 min-h-screen bg-background-light dark:bg-background-dark">
                <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
                    <div class="flex items-center justify-between px-4 py-3">
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
                         <div class="flex items-center gap-2">
                            ${currentUser?.isHost ? `
                            <button data-navigate="/host/dashboard" class="text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                                Switch to Hosting
                            </button>
                            ` : ''}
                            <button data-navigate="/settings" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <span class="material-symbols-outlined text-gray-900 dark:text-white">settings</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main class="px-4 py-6">
                    <!-- Profile Header -->
                    <div class="flex flex-col items-center mb-8">
                        <div class="relative mb-4">
                            <img src="${avatarUrl}" alt="Profile" class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-lg">
                            <button class="absolute bottom-0 right-0 p-2 bg-primary text-background-dark rounded-full shadow-md hover:bg-primary/90 transition-colors">
                                <span class="material-symbols-outlined text-sm">edit</span>
                            </button>
                        </div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">${currentUser.name || 'User'}</h2>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">${currentUser.email}</p>
                        
                        <div class="flex gap-6 w-full justify-center">
                            <div class="text-center p-4 bg-white dark:bg-surface-dark rounded-2xl flex-1 shadow-sm border border-gray-100 dark:border-white/5">
                                <span class="block text-2xl font-bold text-gray-900 dark:text-white">${tripsCount}</span>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Trips</span>
                            </div>
                            <div class="text-center p-4 bg-white dark:bg-surface-dark rounded-2xl flex-1 shadow-sm border border-gray-100 dark:border-white/5">
                                <span class="block text-2xl font-bold text-gray-900 dark:text-white">0</span>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Reviews</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mb-6">
                        <button data-navigate="/trips" class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span class="material-symbols-outlined">flight_takeoff</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">My Trips</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        
                         <button data-navigate="/saved" class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400">
                                    <span class="material-symbols-outlined">favorite</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">Saved Spots</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        
                        <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-purple-100/50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <span class="material-symbols-outlined">support_agent</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">Support</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                    </div>

                    <!-- Logout -->
                     <button id="logout-btn" class="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                        <span class="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                    
                    <div class="text-center mt-6">
                        <p class="text-xs text-gray-400">CampBnB v1.0.0</p>
                    </div>
                </main>

                ${bottomNav('profile')}
            </div>
        `;

        // Listeners
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                auth.logout();
            }
        });

        document.querySelectorAll('[data-navigate]').forEach(el => {
            el.addEventListener('click', () => window.location.hash = el.dataset.navigate);
        });
    }

    // Initial render immediately if we have data (we do, because we waited)
    render();
    // Then load async stats
    loadData();

    // Return the rendered HTML string is NOT possible here because the function is async
    // The router expects a Promise returning string, OR a string.
    // Since we are async, we are returning a Promise that resolves to the HTML string.
    // BUT: We just rendered to 'app'. 
    // Wait, the router handles `app.innerHTML = content`.
    // If we return a string, the router sets it.
    // If we return a Promise, the router awaits it and then sets it.
    // So we should construct the HTML string and return it.

    // Refactor: We can't use 'app.getElementById' inside the function before it returns if the router sets innerHTML after.
    // This logic is slightly circular with the router implementation.
    // Router says: `const content = await route.handler(route.params); app.innerHTML = content;`
    // So we function should RETURN the HTML string.

    // Let's rewrite this function to behave correctly with the router.

    const avatarUrl = currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || 'User')}&background=11d452&color=fff`;

    // Trigger data load in background
    loadData();

    return `
            <div class="pb-24 min-h-screen bg-background-light dark:bg-background-dark">
                <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
                    <div class="flex items-center justify-between px-4 py-3">
                        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
                         <div class="flex items-center gap-2">
                            ${currentUser?.isHost ? `
                            <button data-navigate="/host/dashboard" class="text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-1.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                                Switch to Hosting
                            </button>
                            ` : ''}
                            <button data-navigate="/settings" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                <span class="material-symbols-outlined text-gray-900 dark:text-white">settings</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main class="px-4 py-6">
                    <!-- Profile Header -->
                    <div class="flex flex-col items-center mb-8">
                        <div class="relative mb-4">
                            <img src="${avatarUrl}" alt="Profile" class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-lg">
                            <button class="absolute bottom-0 right-0 p-2 bg-primary text-background-dark rounded-full shadow-md hover:bg-primary/90 transition-colors">
                                <span class="material-symbols-outlined text-sm">edit</span>
                            </button>
                        </div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">${currentUser.name || 'User'}</h2>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">${currentUser.email}</p>
                        
                        <div class="flex gap-6 w-full justify-center">
                            <div class="text-center p-4 bg-white dark:bg-surface-dark rounded-2xl flex-1 shadow-sm border border-gray-100 dark:border-white/5">
                                <span class="block text-2xl font-bold text-gray-900 dark:text-white" id="trips-count-display">-</span>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Trips</span>
                            </div>
                            <div class="text-center p-4 bg-white dark:bg-surface-dark rounded-2xl flex-1 shadow-sm border border-gray-100 dark:border-white/5">
                                <span class="block text-2xl font-bold text-gray-900 dark:text-white">0</span>
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Reviews</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden mb-6">
                        <button data-navigate="/trips" class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span class="material-symbols-outlined">flight_takeoff</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">My Trips</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        
                         <button data-navigate="/saved" class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-red-100/50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400">
                                    <span class="material-symbols-outlined">favorite</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">Saved Spots</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                        
                        <button class="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-purple-100/50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <span class="material-symbols-outlined">support_agent</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">Support</span>
                            </div>
                            <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                        </button>
                    </div>

                    <!-- Logout -->
                     <button id="logout-btn" class="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                        <span class="material-symbols-outlined">logout</span>
                        Log Out
                    </button>
                    
                    <div class="text-center mt-6">
                        <p class="text-xs text-gray-400">CampBnB v1.0.0</p>
                    </div>
                </main>

                ${bottomNav('profile')}
            </div>
  `;
}

// Helper to load stats independently after render
async function loadData() {
    try {
        const bookingsRes = await bookings.list();
        const tripsCount = bookingsRes.total || (bookingsRes.data ? bookingsRes.data.length : (Array.isArray(bookingsRes) ? bookingsRes.length : 0));

        const el = document.getElementById('trips-count-display');
        if (el) el.textContent = tripsCount;
    } catch (e) {
        console.error(e);
    }
}
// We don't export loadData, just use it internally.
// But we need to make sure listeners are attached.
// The router calls `initializePageEvents` (generic ones) after setting innerHTML.
// But specific ones like logout need to be handled.
// Since `router.js` doesn't support a `postRender` callback returned from the handler,
// and the handler returns a string, we can't easily attach listeners *inside* this function 
// because the elements aren't in the DOM yet when this function returns.
//
// WAIT. The router says:
// const content = await route.handler(route.params);
// app.innerHTML = content;
// this.initializePageEvents();
//
// It DOES NOT allow us to attach specific listeners for the page unless we use global delegation 
// or if we rely on a `setTimeout` hack, or if we modify the router to support an `init` function.
//
// The existing `profile.js` had `render()` which did `app.innerHTML = ...` then `document.getElementById(...).addEventListener`.
// This worked because it was bypassing the router's `app.innerHTML = content`.
// But the router ALSO does `app.innerHTML = content` if the handler returns something.
//
// Implementation Strategy:
// 1. Return the HTML string.
// 2. Use a `setTimeout` to attach listeners after the router updates the DOM.
// 3. Or, since we are using `import()`, maybe we can export an `init` function? No, router doesn't support it.
//
// Let's stick to the pattern used in `host/dashboard.js`:
// It returns a string, but also calls `setTimeout(loadData, 50)`.
// `loadData` then renders content into a container.
// But for `logout-btn`, it's part of the main return string.
//
// Let's use `setTimeout` to attach the logout listener.

setTimeout(() => {
    document.getElementById('logout-btn')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out?')) {
            auth.logout();
        }
    });
}, 100);
