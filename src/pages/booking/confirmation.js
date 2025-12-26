/**
 * Booking Confirmation Page
 */
import { bookings } from '../../api.js';

export function confirmationPage() {
  // Load data
  let listing = null;
  let dates = null;
  let guests = null;
  let total = 0;

  try {
    listing = JSON.parse(sessionStorage.getItem('booking_listing'));
    dates = JSON.parse(sessionStorage.getItem('booking_dates'));
    guests = JSON.parse(sessionStorage.getItem('booking_guests'));
    total = parseFloat(sessionStorage.getItem('booking_total') || '0');
  } catch (e) { }

  // Initial state: Loading (creating booking)
  // we use a flag to track if we already submitted to avoid double submit on re-render if we were using a framework
  // but here we just render the loading state and trigger the API call

  // However, since this is a route, navigating to it triggers the function.
  // We should probably show a "Confirming..." state first, then swap to success or error.

  if (!listing || !dates || !guests) {
    setTimeout(() => window.location.hash = '/home', 100);
    return '';
  }

  async function createBooking() {
    const titleEl = document.getElementById('status-title');
    const descEl = document.getElementById('status-desc');
    const iconEl = document.getElementById('status-icon');
    const contentEl = document.getElementById('confirmation-content');

    try {
      const bookingData = {
        listingId: listing.id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests: guests.adults + guests.children,
        adults: guests.adults,
        children: guests.children,
        infants: guests.infants,
        pets: guests.pets
      };

      await bookings.create(bookingData);

      // Success
      if (titleEl) titleEl.textContent = `Pack your bags!`;
      if (descEl) descEl.textContent = `Your stay at ${listing.title} is confirmed. We've sent the receipt to your email.`;
      if (iconEl) {
        iconEl.innerHTML = '<span class="material-symbols-outlined text-background-dark text-6xl font-bold icon-filled">check</span>';
        iconEl.parentElement.classList.remove('animate-pulse');
      }
      if (contentEl) contentEl.classList.remove('invisible', 'opacity-0');

      // Clear session
      sessionStorage.removeItem('booking_listing');
      sessionStorage.removeItem('booking_dates');
      sessionStorage.removeItem('booking_guests');
      sessionStorage.removeItem('booking_total');

    } catch (error) {
      console.error('Booking failed:', error);
      if (titleEl) titleEl.textContent = 'Booking Failed';
      if (descEl) descEl.textContent = error.message || 'Something went wrong. Please try again.';
      if (iconEl) {
        iconEl.innerHTML = '<span class="material-symbols-outlined text-background-dark text-6xl font-bold">error</span>';
        iconEl.parentElement.parentElement.querySelector('.absolute').classList.replace('bg-primary', 'bg-red-500');
        const circle = iconEl.parentElement;
        circle.classList.replace('bg-primary', 'bg-red-500');
        circle.classList.replace('shadow-[0_0_15px_rgba(17,212,82,0.4)]', 'shadow-[0_0_15px_rgba(239,68,68,0.4)]');
        circle.classList.remove('animate-pulse');
      }
      // Show retry button?
      const actionContainer = document.querySelector('.action-buttons');
      if (actionContainer) {
        actionContainer.innerHTML = `
                  <button onclick="window.history.back()" class="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary h-14 px-6 text-background-dark text-base font-bold tracking-wide shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]">
                    Go Back & Try Again
                  </button>
                `;
      }
    }
  }

  setTimeout(createBooking, 500); // Small delay for UX

  const checkInDate = new Date(dates.checkIn);
  const checkOutDate = new Date(dates.checkOut);
  const fmtTime = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); // Rough format

  return `
    <div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      <!-- Leaf Decorations -->
      <span class="material-symbols-outlined absolute opacity-5 pointer-events-none text-primary text-[120px] -top-10 -left-10 rotate-45 z-0">eco</span>
      <span class="material-symbols-outlined absolute opacity-5 pointer-events-none text-primary text-[80px] top-40 -right-8 -rotate-12 z-0">spa</span>
      <span class="material-symbols-outlined absolute opacity-5 pointer-events-none text-white text-[60px] bottom-32 -left-4 rotate-12 z-0">forest</span>
      
      <!-- Header / Hero Section -->
      <div class="relative z-10 flex flex-col items-center px-6 pt-12 pb-6 grow-0">
        <!-- Status Icon -->
        <div class="mb-6 relative">
          <div class="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
          <div class="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(17,212,82,0.4)] animate-pulse">
            <div id="status-icon" class="flex items-center justify-center">
                <span class="material-symbols-outlined text-background-dark text-6xl font-bold">hourglass_top</span>
            </div>
          </div>
        </div>
        
        <!-- Text -->
        <div class="flex flex-col items-center gap-3 text-center">
          <h1 id="status-title" class="text-gray-900 dark:text-white text-3xl font-extrabold leading-tight tracking-tight">Processing...</h1>
          <p id="status-desc" class="text-gray-500 dark:text-secondary-text text-base font-normal leading-relaxed max-w-[320px]">
            Please wait while we confirm your reservation.
          </p>
        </div>
      </div>
      
      <!-- Booking Summary Card -->
      <div id="confirmation-content" class="relative z-10 px-4 py-2 w-full invisible opacity-0 transition-all duration-500">
        <div class="relative overflow-hidden rounded-2xl bg-surface-dark p-0 shadow-lg border border-white/5">
          <!-- Card Header with Image -->
          <div class="relative h-32 w-full bg-cover bg-center" style='background-image: url("${listing.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200'}");'>
            <div class="absolute inset-0 bg-linear-to-t from-surface-dark to-transparent"></div>
            <div class="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-primary text-sm">confirmation_number</span>
              <span class="text-white text-xs font-medium tracking-wide">CONFIRMED</span>
            </div>
          </div>
          
          <!-- Card Content -->
          <div class="relative -mt-12 px-5 pb-5">
            <div class="flex flex-col gap-5">
              <!-- Main Info Row -->
              <div class="flex gap-4 items-end">
                <div class="h-20 w-20 shrink-0 rounded-xl bg-cover bg-center shadow-md border-2 border-surface-dark" style='background-image: url("${listing.images?.[0]}");'></div>
                <div class="flex flex-col mb-1">
                  <h2 class="text-white text-lg font-bold leading-tight truncate max-w-[180px]">${listing.title}</h2>
                  <div class="flex items-center gap-1 mt-1 text-secondary-text">
                    <span class="material-symbols-outlined text-sm" style="font-size: 16px;">location_on</span>
                    <span class="text-sm">${listing.location}</span>
                  </div>
                </div>
              </div>
              
              <!-- Details Grid -->
              <div class="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-secondary-text uppercase tracking-wider font-semibold">Check-in</span>
                  <span class="text-white text-sm font-medium">${checkInDate.toLocaleDateString()}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-secondary-text uppercase tracking-wider font-semibold">Check-out</span>
                  <span class="text-white text-sm font-medium">${checkOutDate.toLocaleDateString()}</span>
                </div>
                <div class="col-span-2 pt-2 mt-1 border-t border-white/5 flex justify-between items-center">
                  <span class="text-xs text-secondary-text">Total (${dates.nights} Nights)</span>
                  <span class="text-white text-base font-bold">$${total.toFixed(2)}</span>
                </div>
              </div>
              
              <!-- Add to Calendar -->
              <button class="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20 active:scale-[0.98]">
                <span class="material-symbols-outlined text-primary group-hover:text-white transition-colors" style="font-size: 20px;">calendar_today</span>
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Spacer -->
      <div class="grow"></div>
      
      <!-- Action Buttons -->
      <div class="relative z-10 w-full px-6 py-8 pb-10 action-buttons">
        <div class="flex flex-col gap-3">
          <button data-navigate="/profile?tab=upcoming" class="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary h-14 px-6 text-background-dark text-base font-bold tracking-wide shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] hover:shadow-primary/30">
            View Trip Details
          </button>
          <button data-navigate="/home" class="flex w-full cursor-pointer items-center justify-center rounded-xl border border-gray-300 dark:border-white/10 bg-transparent h-14 px-6 text-gray-700 dark:text-secondary-text text-base font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white active:scale-[0.98]">
            Back to Home
          </button>
        </div>
      </div>
    </div>
    `;
}

// Global listener for navigation in this page
document.addEventListener('click', (e) => {
  const target = e.target.closest('[data-navigate]');
  if (target && document.body.contains(target)) {
    // Simple check to ensure we only handle if appropriate? 
    // Actually router handles it if we don't prevent default, but usually we do:
    e.preventDefault();
    const hash = target.dataset.navigate;
    // If query params exist, we need to handle them?
    // hash sets window.location.hash directly
    window.location.hash = hash;
  }
});
