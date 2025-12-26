/**
 * Host Bookings Management
 */
import { bookings } from '../../api.js';

export function hostBookingsPage() {
    let hostBookings = [];

    // We need a specific API call for host bookings.
    // Since we noted in the plan to add `GET /api/bookings/host`, we should do that next.
    // For now, let's assume `bookings.list({ host: true })` or similar will work once updated.

    async function loadData() {
        try {
            const response = await bookings.getHostBookings();
            hostBookings = response.data || response || [];
            render();
        } catch (e) {
            console.error(e);
            // Show error state
            const container = document.getElementById('host-bookings-container');
            if (container) {
                container.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-12 text-center">
                        <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                        <p class="text-gray-400">Failed to load bookings</p>
                        <button onclick="window.location.reload()" class="mt-4 text-primary font-bold">Try Again</button>
                    </div>
                `;
            }
        }
    }

    // Status colors
    const statusColors = {
        PENDING: 'text-orange-400 bg-orange-400/10',
        CONFIRMED: 'text-green-400 bg-green-400/10',
        CANCELLED: 'text-red-400 bg-red-400/10',
        COMPLETED: 'text-gray-400 bg-gray-400/10'
    };

    function renderCard(booking) {
        const checkIn = new Date(booking.checkIn).toLocaleDateString();
        const checkOut = new Date(booking.checkOut).toLocaleDateString();
        const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));

        return `
            <div class="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm mb-4">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex gap-3">
                        <div class="w-12 h-12 rounded-full bg-cover bg-center" style="background-image: url('${booking.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.user.name)}`}');"></div>
                        <div>
                            <h3 class="font-bold text-gray-900 dark:text-white">${booking.user.name}</h3>
                            <p class="text-xs text-gray-500 dark:text-gray-400">${booking.listing.title}</p>
                        </div>
                    </div>
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${statusColors[booking.status] || 'text-gray-400'}">
                        ${booking.status}
                    </span>
                </div>
                
                <div class="bg-gray-50 dark:bg-black/20 rounded-xl p-3 mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p class="text-gray-500 text-xs">Dates</p>
                        <p class="font-medium text-gray-900 dark:text-gray-200">${checkIn} - ${checkOut}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 text-xs">Total</p>
                        <p class="font-medium text-gray-900 dark:text-gray-200">$${booking.totalPrice} (${nights} nights)</p>
                    </div>
                </div>
                
                ${booking.status === 'PENDING' ? `
                <div class="flex gap-2">
                    <button data-reject="${booking.id}" class="flex-1 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        Decline
                    </button>
                    <button data-confirm="${booking.id}" class="flex-1 py-2.5 rounded-xl bg-primary text-background-dark font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        Approve
                    </button>
                </div>
                ` : ''}
            </div>
        `;
    }

    function render() {
        const container = document.getElementById('host-bookings-container');
        if (!container) return;

        if (hostBookings.length === 0) {
            container.innerHTML = `
                <div class="px-4 py-6">
                    <div class="flex flex-col items-center justify-center py-20 text-center">
                        <div class="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <span class="material-symbols-outlined text-4xl text-gray-400">calendar_today</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No bookings yet</h3>
                        <p class="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Requests from guests will appear here.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="px-4 py-6 pb-20">
                ${hostBookings.map(renderCard).join('')}
            </div>
        `;

        // Listeners for confirm/reject
        document.querySelectorAll('[data-confirm]').forEach(btn => {
            btn.addEventListener('click', async () => handleAction(btn.dataset.confirm, 'confirm'));
        });

        document.querySelectorAll('[data-reject]').forEach(btn => {
            btn.addEventListener('click', async () => handleAction(btn.dataset.reject, 'reject'));
        });
    }

    async function handleAction(id, action) {
        // Optimistic update would be nice, but simple reload is safer for now
        const btn = document.querySelector(`[data-${action}="${id}"]`);
        if (btn) {
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">progress_activity</span>';
            btn.disabled = true;
        }

        try {
            if (action === 'confirm') await bookings.confirm(id);
            else await bookings.reject(id);
            loadData(); // Reload
        } catch (e) {
            alert('Action failed: ' + e.message);
            if (btn) {
                btn.innerHTML = action === 'confirm' ? 'Approve' : 'Decline';
                btn.disabled = false;
            }
        }
    }

    setTimeout(loadData, 50);

    return `
    <div class="min-h-screen bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div class="flex items-center px-4 py-3">
          <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mr-2">
            <span class="material-symbols-outlined text-gray-900 dark:text-white">arrow_back</span>
          </button>
          <h1 class="text-lg font-bold text-gray-900 dark:text-white">Calendar</h1>
        </div>
      </header>
      
      <div id="host-bookings-container">
        <div class="flex justify-center p-12">
            <span class="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
        </div>
      </div>
    </div>
    `;
}
