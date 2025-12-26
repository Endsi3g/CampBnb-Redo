/**
 * Trips Page
 * Displays upcoming and past bookings
 */
import { bookings } from '../api.js';
import { bottomNav } from '../components/bottom-nav.js';

export function tripsPage() {
    let activeTab = 'upcoming'; // 'upcoming' or 'past'
    let myBookings = [];
    let loading = true;

    async function loadData() {
        if (!await isAuthenticated()) {
            window.location.hash = '/signin';
            return;
        }

        try {
            const data = await bookings.list({ limit: 50 }); // Fetch enough history
            myBookings = data.data || [];
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
            render();
        }
    }

    function filterBookings(tab) {
        const now = new Date();
        return myBookings.filter(b => {
            const checkOut = new Date(b.checkOut);
            if (tab === 'upcoming') {
                return checkOut >= now && b.status !== 'CANCELLED';
            } else {
                return checkOut < now || b.status === 'CANCELLED';
            }
        });
    }

    function renderCard(booking) {
        const checkIn = new Date(booking.checkIn).toLocaleDateString();
        const checkOut = new Date(booking.checkOut).toLocaleDateString();
        const isPast = activeTab === 'past';

        return `
            <div class="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 mb-4 flex gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                 onclick="window.location.hash = '/booking/confirmation?id=${booking.id}'">
                <div class="w-24 h-24 rounded-xl bg-cover bg-center shrink-0" 
                     style="background-image: url('${booking.listing.images?.[0] || 'https://via.placeholder.com/150'}')">
                </div>
                <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                        <h3 class="font-bold text-gray-900 dark:text-white truncate">${booking.listing.title}</h3>
                        <p class="text-sm text-gray-500 truncate">${booking.listing.location}</p>
                    </div>
                    <div>
                        <div class="flex items-center gap-1 text-xs text-gray-500 mb-1">
                            <span class="material-symbols-outlined text-[14px]">calendar_month</span>
                            ${checkIn} - ${checkOut}
                        </div>
                        <span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase
                            ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                booking.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                    booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'}">
                            ${booking.status}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    function render() {
        const app = document.getElementById('app');
        if (!app) return;

        const filtered = filterBookings(activeTab);

        app.innerHTML = `
            <div class="min-h-screen bg-background-light dark:bg-background-dark pb-24">
                <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-4">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Trips</h1>
                    <div class="flex p-1 bg-gray-100 dark:bg-white/10 rounded-xl">
                        <button id="tab-upcoming" class="flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'upcoming' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}">
                            Upcoming
                        </button>
                        <button id="tab-past" class="flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'past' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}">
                            Past
                        </button>
                    </div>
                </header>

                <main class="px-4 py-6">
                    ${loading ? `
                        <div class="space-y-4">
                            ${[1, 2, 3].map(() => `
                            <div class="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 animate-pulse">
                                <div class="w-24 h-24 rounded-xl bg-gray-200 dark:bg-white/10 shrink-0"></div>
                                <div class="flex-1 py-1 space-y-3">
                                    <div class="h-5 bg-gray-200 dark:bg-white/10 rounded w-3/4"></div>
                                    <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                                    <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/3 mt-2"></div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    ` : filtered.length ? filtered.map(renderCard).join('') : `
                        <div class="flex flex-col items-center justify-center py-12 text-center opacity-60">
                            <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">
                                ${activeTab === 'upcoming' ? 'flight_takeoff' : 'history'}
                            </span>
                            <p class="text-lg font-medium text-gray-900 dark:text-white">No ${activeTab} trips</p>
                            <p class="text-sm text-gray-500 mt-1 max-w-xs">
                                ${activeTab === 'upcoming' ? 'Time to plan your next adventure!' : 'You haven\'t completed any trips yet.'}
                            </p>
                            ${activeTab === 'upcoming' ? `
                            <button onclick="window.location.hash='/search'" class="mt-6 px-6 py-3 bg-primary text-background-dark font-bold rounded-xl shadow-lg shadow-primary/20">
                                Start Exploring
                            </button>
                            ` : ''}
                        </div>
                    `}
                </main>

                ${bottomNav('trips')}
            </div>
        `;

        // Tab listeners
        document.getElementById('tab-upcoming')?.addEventListener('click', () => {
            activeTab = 'upcoming';
            render();
        });
        document.getElementById('tab-past')?.addEventListener('click', () => {
            activeTab = 'past';
            render();
        });
    }

    // Initial load
    render();
    loadData();
}
