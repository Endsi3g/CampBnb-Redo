/**
 * Price Breakdown Page
 */
export function priceBreakdownPage() {
  // Load session data
  let listing = null;
  let dates = null;
  let guests = null;

  try {
    listing = JSON.parse(sessionStorage.getItem('booking_listing'));
    dates = JSON.parse(sessionStorage.getItem('booking_dates'));
    guests = JSON.parse(sessionStorage.getItem('booking_guests'));
  } catch (e) { }

  if (!listing || !dates || !guests) {
    setTimeout(() => window.location.hash = '/home', 100);
    return '';
  }

  const checkInDate = new Date(dates.checkIn);
  const checkOutDate = new Date(dates.checkOut);
  const nights = dates.nights;

  // Fees (default to 0 if not present in listing object, though they should be)
  const nightlyPrice = listing.price;
  const subtotal = nightlyPrice * nights;
  const cleaningFee = listing.cleaningFee || 45; // Fallback for MVP if not in object
  const serviceFee = listing.serviceFee || 25;
  const taxes = listing.taxes || 15;
  const total = subtotal + cleaningFee + serviceFee + taxes;

  // Formatting
  const fmtInfo = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  function initEvents() {
    document.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', () => window.history.back());
    });

    document.getElementById('confirm-pay-btn')?.addEventListener('click', () => {
      // Store total for reference, though usually re-calc
      sessionStorage.setItem('booking_total', total);
      window.location.hash = '/booking/confirmation';
    });
  }

  setTimeout(initEvents, 50);

  return `
    <div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark z-10 sticky top-0">
        <button data-back class="text-gray-900 dark:text-white flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/5 active:bg-white/10 transition-colors">
          <span class="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 class="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          Price Breakdown
        </h2>
      </header>
      
      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto px-5 pb-32 no-scrollbar">
        <!-- Property Thumbnail -->
        <div class="flex items-center gap-4 py-6">
          <div class="bg-center bg-no-repeat bg-cover rounded-2xl size-16 shrink-0 shadow-lg" style='background-image: url("${listing.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200'}");'></div>
          <div class="flex flex-col justify-center">
            <p class="text-gray-900 dark:text-white text-lg font-semibold leading-tight mb-1 truncate max-w-[200px]">${listing.title}</p>
            <p class="text-secondary-text text-sm font-medium leading-normal flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] align-middle">calendar_today</span>
              ${fmtInfo(checkInDate)} - ${fmtInfo(checkOutDate)}
            </p>
          </div>
        </div>
        
        <!-- Cost Container -->
        <div class="bg-surface-dark/60 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/5 shadow-xl mb-6">
          <div class="flex flex-col gap-4">
            <!-- Nightly Rate -->
            <div class="flex justify-between items-start gap-x-4">
              <div class="flex flex-col">
                <p class="text-gray-300 text-[15px] font-medium leading-normal">$${Math.round(nightlyPrice)} x ${nights} nights</p>
              </div>
              <p class="text-white text-[15px] font-medium leading-normal text-right">$${subtotal.toFixed(2)}</p>
            </div>
            
            <!-- Cleaning Fee -->
            <div class="flex justify-between items-center gap-x-4">
              <div class="flex items-center gap-1.5 group cursor-pointer">
                <p class="text-gray-300 text-[15px] font-medium leading-normal underline decoration-dotted decoration-gray-500 underline-offset-4">Cleaning Fee</p>
                <span class="material-symbols-outlined text-secondary-text text-[18px] opacity-70 group-hover:opacity-100 transition-opacity">info</span>
              </div>
              <p class="text-white text-[15px] font-medium leading-normal text-right">$${cleaningFee.toFixed(2)}</p>
            </div>
            
            <!-- Service Fee -->
            <div class="flex justify-between items-center gap-x-4">
              <div class="flex items-center gap-1.5 group cursor-pointer">
                <p class="text-gray-300 text-[15px] font-medium leading-normal underline decoration-dotted decoration-gray-500 underline-offset-4">Service Fee</p>
                <span class="material-symbols-outlined text-secondary-text text-[18px] opacity-70 group-hover:opacity-100 transition-opacity">info</span>
              </div>
              <p class="text-white text-[15px] font-medium leading-normal text-right">$${serviceFee.toFixed(2)}</p>
            </div>
            
            <!-- Occupancy Taxes -->
            <div class="flex justify-between items-center gap-x-4">
              <div class="flex items-center gap-1.5 group cursor-pointer">
                <p class="text-gray-300 text-[15px] font-medium leading-normal underline decoration-dotted decoration-gray-500 underline-offset-4">Occupancy Taxes</p>
                <span class="material-symbols-outlined text-secondary-text text-[18px] opacity-70 group-hover:opacity-100 transition-opacity">info</span>
              </div>
              <p class="text-white text-[15px] font-medium leading-normal text-right">$${taxes.toFixed(2)}</p>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="h-px bg-white/10 w-full my-5 border-t border-dashed border-white/20"></div>
          
          <!-- Total -->
          <div class="flex items-end justify-between gap-4">
            <p class="text-white text-lg font-bold leading-normal">Total <span class="text-sm font-normal text-gray-400 ml-1">(CAD)</span></p>
            <p class="text-primary text-2xl font-bold leading-none tracking-tight">$${total.toFixed(2)}</p>
          </div>
        </div>
        
        <!-- Cancellation Policy -->
        <div class="bg-surface-dark/30 rounded-xl p-4 border border-white/5 flex gap-3 items-start">
          <span class="material-symbols-outlined text-secondary-text text-xl mt-0.5 shrink-0">verified_user</span>
          <div>
            <p class="text-gray-900 dark:text-white text-sm font-semibold mb-1">Free cancellation for 48 hours</p>
            <p class="text-gray-500 dark:text-gray-400 text-xs font-normal leading-relaxed">
              After that, cancel before check-in for a partial refund. By confirming, you agree to the <span class="text-primary underline cursor-pointer">Guest Release and Rules</span>.
            </p>
          </div>
        </div>
      </main>
      
      <!-- Bottom Action Bar -->
      <div class="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 p-5 pb-8 z-20 max-w-md mx-auto right-0">
        <button id="confirm-pay-btn" class="w-full bg-primary hover:bg-[#0ebf49] active:scale-[0.98] transition-all duration-200 h-14 rounded-2xl flex items-center justify-between px-6 shadow-[0_0_20px_rgba(17,212,82,0.3)] group">
          <span class="text-background-dark text-base font-bold">Confirm and Pay</span>
          <div class="flex items-center gap-2">
            <span class="text-background-dark text-lg font-bold">$${total.toFixed(2)}</span>
            <span class="material-symbols-outlined text-background-dark text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
    `;
}
