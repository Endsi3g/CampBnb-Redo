/**
 * Saved Listings Page
 * Displays user's favorited listings
 */
import { favorites, favorites as favoritesApi } from '../api.js';
import { bottomNav } from '../components/bottom-nav.js';

export function savedPage() {
    let savedListings = [];
    let loading = true;

    async function loadData() {
        try {
            const data = await favorites.list({ limit: 50 });
            savedListings = data.data || [];
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
            render();
        }
    }

    async function toggleFavorite(e, id) {
        e.stopPropagation();
        try {
            await favoritesApi.remove(id);
            // Remove from local list to update UI instantly
            savedListings = savedListings.filter(l => l.id !== id);
            render();
        } catch (err) {
            console.error(err);
        }
    }

    function renderCard(listing) {
        return `
            <div class="relative group cursor-pointer" onclick="window.location.hash = '/listings/${listing.id}'">
                <div class="aspect-4/3 rounded-2xl bg-gray-200 dark:bg-white/10 overflow-hidden mb-3 relative">
                    <img src="${listing.images?.[0] || 'https://via.placeholder.com/400'}" 
                         alt="${listing.title}" 
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                         loading="lazy">
                    
                    <button class="favorite-btn absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform active:scale-95 text-red-500"
                            data-id="${listing.id}">
                        <span class="material-symbols-outlined icon-filled text-xl">favorite</span>
                    </button>
                    
                    <div class="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-900 dark:text-white">
                        $${listing.price}/night
                    </div>
                </div>
                
                <h3 class="font-bold text-gray-900 dark:text-white truncate">${listing.title}</h3>
                <p class="text-sm text-gray-500 truncate">${listing.location}</p>
                <div class="flex items-center gap-1 mt-1">
                     <span class="material-symbols-outlined text-orange-400 text-sm icon-filled">star</span>
                     <span class="text-sm font-medium text-gray-900 dark:text-white">4.92</span>
                     <span class="text-sm text-gray-500">(28)</span>
                </div>
            </div>
        `;
    }

    function render() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <div class="min-h-screen bg-background-light dark:bg-background-dark pb-24">
                <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-4">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Saved Spots</h1>
                </header>

                <main class="px-4 py-6">
                    ${loading ? `
                        <div class="flex justify-center py-12">
                            <span class="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
                        </div>
                    ` : savedListings.length ? `
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${savedListings.map(renderCard).join('')}
                        </div>
                    ` : `
                        <div class="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">favorite</span>
                            <p class="text-lg font-medium text-gray-900 dark:text-white">No saved spots yet</p>
                            <p class="text-sm text-gray-500 mt-1 max-w-xs">
                                Save your favorite listings to find them easily later.
                            </p>
                             <button onclick="window.location.hash='/search'" class="mt-6 px-6 py-3 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20">
                                Start Exploring
                            </button>
                        </div>
                    `}
                </main>

                ${bottomNav('saved')}
            </div>
        `;

        // Attach listeners
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => toggleFavorite(e, btn.dataset.id));
        });
    }

    render();
    loadData();
}
