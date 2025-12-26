/**
 * Host Dashboard
 * Overview of listings, bookings, and stats
 */
import { listings, bookings, users, auth } from '../../api.js';

export function hostDashboardPage() {
    let hostStats = {
        totalListings: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalEarnings: 0
    };
    let hostListings = [];
    let recentBookings = [];

    // Check if user is host
    async function checkHostStatus() {
        const user = await auth.me();
        if (!user) {
            window.location.hash = '/signin';
            return false;
        }
        if (!user.isHost) {
            renderBecomeHost(user);
            return false;
        }
        return true;
    }

    async function loadData() {
        try {
            const isHost = await checkHostStatus();
            if (!isHost) return;

            // Fetch listings and bookings concurrently
            const [listingsRes, bookingsRes] = await Promise.all([
                listings.getHostListings(),
                bookings.getHostBookings({ limit: 5 }) // Get recent bookings
            ]);

            hostListings = listingsRes.data || [];
            recentBookings = bookingsRes.data || [];

            // Calculate stats
            // Note: For total earnings, we should technically fetch ALL confirmed bookings, 
            // but for now we'll sum up from the specific 'host listings' query if we included bookings there, 
            // OR we just use the recent bookings count for now.
            // ACTUALLY: The `getHostListings` endpoint I just added includes `bookings` with `totalPrice`.
            // So we can calculate total earnings from that!

            let earnings = 0;
            let totalBookingsCount = 0;
            let pendingCount = 0;

            hostListings.forEach(listing => {
                if (listing.bookings) {
                    listing.bookings.forEach(b => {
                        if (['CONFIRMED', 'COMPLETED'].includes(b.status)) {
                            earnings += (b.totalPrice || 0);
                        }
                        totalBookingsCount++;
                        if (b.status === 'PENDING') pendingCount++;
                    });
                }
            });

            hostStats = {
                totalListings: hostListings.length,
                totalBookings: totalBookingsCount,
                pendingBookings: pendingCount, // specific pending count could be better
                totalEarnings: earnings
            };

            // Recalculate pending from recent bookings to be safe? 
            // No, the listings query is more comprehensive for stats.

            renderDashboard();
        } catch (e) {
            console.error(e);
        }
    }

    function renderBecomeHost(user) {
        const container = document.getElementById('host-dashboard');
        if (!container) return;

        container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
                <div class="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-primary">cabin</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Become a Host</h2>
                <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">Earn money by sharing your camping spot with outdoor enthusiasts.</p>
                <button id="become-host-btn" class="bg-primary hover:bg-primary/90 text-background-dark font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all transform active:scale-95">
                    Start Hosting
                </button>
            </div>
        `;

        document.getElementById('become-host-btn')?.addEventListener('click', async () => {
            try {
                await users.becomeHost(); // Need to add this to api.js
                window.location.reload();
            } catch (e) {
                alert('Failed to upgrade: ' + e.message);
            }
        });
    }

    function renderDashboard() {
        const container = document.getElementById('host-dashboard');
        if (!container) return;

        const recentBookingsHtml = recentBookings.length ? recentBookings.map(b => `
            <div class="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5 mb-2">
                <div class="w-10 h-10 rounded-full bg-cover bg-center" style="background-image: url('${b.user.avatar || 'https://ui-avatars.com/api/?name=Guest'}')"></div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-gray-900 dark:text-white truncate">${b.user.name}</p>
                    <p class="text-xs text-gray-500 truncate">${b.listing.title}</p>
                </div>
                <span class="text-xs font-bold px-2 py-1 rounded-md ${b.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}">
                    ${b.status}
                </span>
            </div>
        `).join('') : `
            <div class="text-center py-8 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
                <p class="text-gray-400 text-sm">No new booking requests</p>
            </div>
        `;

        const myListingsHtml = hostListings.length ? hostListings.map(l => `
            <div class="flex gap-3 p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5">
                <div class="w-20 h-20 rounded-lg bg-cover bg-center shrink-0" style="background-image: url('${l.images?.[0] || 'https://via.placeholder.com/150'}')"></div>
                <div class="flex flex-col justify-between py-0.5">
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white line-clamp-1">${l.title}</h4>
                        <p class="text-xs text-gray-500">$${l.price} / night</p>
                    </div>
                    <div class="flex gap-2 text-xs">
                        <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <span class="material-symbols-outlined text-[14px]">star</span>
                            ${l.reviews?.length ? '4.8' : 'New'} 
                        </span>
                        <span class="text-gray-300">|</span>
                        <span class="text-gray-600 dark:text-gray-400">${l.type}</span>
                    </div>
                </div>
            </div>
        `).join('') : `
             <div class="text-left py-4">
                <p class="text-gray-400 text-sm">You haven't created any listings yet.</p>
            </div>
        `;

        container.innerHTML = `
            <div class="p-4 pb-24">
                <!-- Stats Grid -->
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="material-symbols-outlined text-primary text-xl">payments</span>
                            <span class="text-xs font-bold uppercase text-gray-400">Earnings</span>
                        </div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">$${hostStats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <div class="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="material-symbols-outlined text-orange-400 text-xl">pending_actions</span>
                            <span class="text-xs font-bold uppercase text-gray-400">Pending</span>
                        </div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">${hostStats.pendingBookings}</p>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
                    <button data-navigate="/host/listings/new" class="shrink-0 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-xl font-bold shadow-lg">
                        <span class="material-symbols-outlined">add</span>
                        Create Listing
                    </button>
                    <button data-navigate="/host/bookings" class="shrink-0 flex items-center gap-2 bg-white dark:bg-surface-dark text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-5 py-3 rounded-xl font-bold">
                        <span class="material-symbols-outlined">calendar_month</span>
                        Calendar
                    </button>
                </div>

                <!-- Recent Bookings -->
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recent Requests</h3>
                        <button data-navigate="/host/bookings" class="text-primary text-sm font-bold">See All</button>
                    </div>
                    ${recentBookingsHtml}
                </div>

                <!-- My Listings -->
                <div>
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">My Listings</h3>
                    </div>
                    <div id="host-listings-list" class="space-y-3">
                        ${myListingsHtml}
                    </div>
                </div>
            </div>
        `;

        // Listeners for nav
        document.querySelectorAll('[data-navigate]').forEach(el => {
            el.addEventListener('click', () => window.location.hash = el.dataset.navigate);
        });
    }

    setTimeout(loadData, 50);

    return `
        <div class="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
            <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 px-4 py-3 flex justify-between items-center">
                <h1 class="text-xl font-bold">Hosting Dashboard</h1>
                <button data-navigate="/profile" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </header>
            
            <div id="host-dashboard">
                <div class="flex justify-center p-12">
                    <span class="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
                </div>
            </div>
        </div>
    `;
}
