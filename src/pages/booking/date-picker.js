/**
 * Date Picker Page
 * Handles dynamic date selection
 */
export function datePickerPage() {
  // Load listing data
  let listing = null;
  try {
    listing = JSON.parse(sessionStorage.getItem('booking_listing'));
  } catch (e) {
    console.error('No listing found in session');
  }

  if (!listing) {
    // Fallback or redirect
    setTimeout(() => window.location.hash = '/home', 100);
    return '<div class="p-10 text-white">Loading...</div>';
  }

  // State
  const today = new Date();
  // Reset time to midnight for comparison
  today.setHours(0, 0, 0, 0);

  let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedStartDate = null;
  let selectedEndDate = null;

  function renderCalendar(monthOffset) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIdx = date.getDay(); // 0 = Sunday

    let html = `
        <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-2 sticky top-0 bg-background-light dark:bg-background-dark py-2 z-0">${monthName}</h3>
            <div class="grid grid-cols-7 gap-y-1">
        `;

    // Empty slots
    for (let i = 0; i < firstDayIdx; i++) {
      html += `<div></div>`;
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(date.getFullYear(), date.getMonth(), day);
      const isPast = currentDayDate < today;

      let classes = "h-10 w-full flex items-center justify-center text-sm font-medium rounded-full transition-colors relative z-10 ";
      let wrapperClasses = "relative w-full h-10 flex items-center justify-center ";
      let bgClasses = "";

      if (isPast) {
        classes += "text-gray-300 dark:text-gray-600 cursor-not-allowed";
      } else {
        classes += "cursor-pointer text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5";
      }

      // Selection logic
      let isStart = selectedStartDate && currentDayDate.getTime() === selectedStartDate.getTime();
      let isEnd = selectedEndDate && currentDayDate.getTime() === selectedEndDate.getTime();
      let isInRange = selectedStartDate && selectedEndDate && currentDayDate > selectedStartDate && currentDayDate < selectedEndDate;

      if (isStart || isEnd) {
        classes = "h-10 w-full flex items-center justify-center text-sm font-bold rounded-full bg-primary text-background-dark shadow-lg shadow-primary/25 relative z-10";
      }

      if (isInRange) {
        bgClasses = "bg-primary/20";
      } else if (isStart && selectedEndDate) {
        // background right half
        bgClasses = "bg-gradient-to-r from-transparent via-transparent to-primary/20 to-50% pl-[50%]";
        // Using simple css for now, standard Tailwind classes might be tricky for "right half"
        // Let's simplified: if start and end exist, just put background
        wrapperClasses += " bg-gradient-to-l from-primary/20 via-primary/20 to-transparent ";
      } else if (isEnd && selectedStartDate) {
        wrapperClasses += " bg-gradient-to-r from-primary/20 via-primary/20 to-transparent ";
      }

      // We need custom styles for half-backgrounds if we want it perfect, but full bg is okay for MVP
      if (isStart && selectedEndDate) wrapperClasses = "relative w-full h-10 flex items-center justify-center overflow-hidden";
      if (isEnd && selectedStartDate) wrapperClasses = "relative w-full h-10 flex items-center justify-center overflow-hidden";

      // Simplified range rendering
      // To do this properly without complex HTML, we apply bg to the wrapper div
      let finalWrapperStyle = "";
      if (isInRange) finalWrapperStyle = "background-color: rgba(17, 212, 82, 0.2);";
      if (isStart && selectedEndDate) finalWrapperStyle = "background: linear-gradient(to right, transparent 50%, rgba(17, 212, 82, 0.2) 50%);";
      if (isEnd && selectedStartDate) finalWrapperStyle = "background: linear-gradient(to left, transparent 50%, rgba(17, 212, 82, 0.2) 50%);";

      const dataAttr = isPast ? '' : `data-date="${currentDayDate.toISOString()}"`;

      html += `
            <div class="relative w-full h-10 flex items-center justify-center" style="${finalWrapperStyle}">
                <button ${dataAttr} class="${classes}">${day}</button>
            </div>
            `;
    }

    html += `</div></div>`;
    return html;
  }

  // Initial Render Wrapper
  setTimeout(() => {
    initEvents();
    updateUI();
  }, 50);

  function updateUI() {
    const container = document.getElementById('calendar-scroll');
    if (container) {
      container.innerHTML = [0, 1, 2].map(offset => renderCalendar(offset)).join('');

      // Re-attach listeners
      attachDateListeners();
    }

    // Update header dates
    const checkInEl = document.getElementById('check-in-display');
    const checkOutEl = document.getElementById('check-out-display');
    const priceEl = document.getElementById('total-price');
    const nightsEl = document.getElementById('total-nights');
    const saveBtn = document.getElementById('save-btn');

    if (checkInEl) checkInEl.textContent = selectedStartDate ? selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--';
    if (checkOutEl) checkOutEl.textContent = selectedEndDate ? selectedEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '--';

    if (selectedStartDate && selectedEndDate) {
      const diffTime = Math.abs(selectedEndDate - selectedStartDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (priceEl) priceEl.textContent = `$${Math.round(diffDays * listing.price)}`;
      if (nightsEl) nightsEl.textContent = `for ${diffDays} nights`;

      // Enable button
      if (saveBtn) {
        saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        saveBtn.disabled = false;
      }
    } else {
      if (priceEl) priceEl.textContent = `$0`;
      if (nightsEl) nightsEl.textContent = 'Select dates';
      if (saveBtn) {
        saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
        saveBtn.disabled = true;
      }
    }
  }

  function attachDateListeners() {
    document.querySelectorAll('button[data-date]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const date = new Date(e.target.dataset.date);

        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
          selectedStartDate = date;
          selectedEndDate = null;
        } else if (date < selectedStartDate) {
          selectedStartDate = date;
        } else if (date > selectedStartDate) {
          selectedEndDate = date;
        }

        updateUI();
      });
    });
  }

  function initEvents() {
    // Back button
    document.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', () => window.history.back());
    });

    // Save button
    document.getElementById('save-btn')?.addEventListener('click', () => {
      if (selectedStartDate && selectedEndDate) {
        const diffTime = Math.abs(selectedEndDate - selectedStartDate);
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        sessionStorage.setItem('booking_dates', JSON.stringify({
          checkIn: selectedStartDate.toISOString(),
          checkOut: selectedEndDate.toISOString(),
          nights
        }));

        window.location.hash = '/booking/guests';
      }
    });

    // Load existing selection if any
    try {
      const saved = JSON.parse(sessionStorage.getItem('booking_dates'));
      if (saved) {
        selectedStartDate = new Date(saved.checkIn);
        selectedEndDate = new Date(saved.checkOut);
        updateUI();
      }
    } catch (e) { }
  }

  return `
    <div class="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      <!-- Header -->
      <header class="flex items-center px-4 py-3 pb-2 justify-between z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md sticky top-0">
        <button data-back class="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span class="material-symbols-outlined text-gray-900 dark:text-white" style="font-size: 24px;">arrow_back_ios_new</span>
        </button>
        <h2 class="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Select Dates</h2>
      </header>
      
      <!-- Date Inputs -->
      <div class="px-4 py-3 z-10 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-white/5">
        <div class="flex gap-3">
          <div class="flex flex-col flex-1 gap-1.5 p-3 rounded-xl border-2 border-primary bg-primary/10 transition-all cursor-pointer">
            <span class="text-xs font-medium text-primary uppercase tracking-wider">Check-in</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary" style="font-size: 20px;">calendar_today</span>
              <span id="check-in-display" class="text-base font-bold text-gray-900 dark:text-white">--</span>
            </div>
          </div>
          <div class="flex flex-col flex-1 gap-1.5 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark/50 transition-all cursor-pointer hover:border-gray-400 dark:hover:border-white/20">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check-out</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">event_available</span>
              <span id="check-out-display" class="text-base font-bold text-gray-900 dark:text-white">--</span>
            </div>
          </div>
        </div>
        
        <!-- Weekday Header -->
        <div class="grid grid-cols-7 mt-6 mb-2">
          <div class="text-xs font-bold text-gray-400 text-center uppercase">S</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">M</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">T</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">W</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">T</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">F</div>
          <div class="text-xs font-bold text-gray-400 text-center uppercase">S</div>
        </div>
      </div>
      
      <!-- Scrollable Calendar Area -->
      <div class="flex-1 overflow-y-auto no-scrollbar pb-32 px-4" id="calendar-scroll">
        <!-- Calendar rendered here -->
      </div>
      
      <!-- Action Panel -->
      <div class="absolute bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 p-5 pb-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] z-20">
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price</p>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <h3 id="total-price" class="text-xl font-bold text-gray-900 dark:text-white">$0</h3>
                <span id="total-nights" class="text-sm text-gray-500 dark:text-gray-400">Select dates</span>
              </div>
            </div>
            <div class="px-3 py-1.5 rounded-lg bg-surface-dark/10 dark:bg-white/10 border border-gray-200 dark:border-white/5">
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">$${Math.round(listing.price)} / night</span>
            </div>
          </div>
          <button id="save-btn" disabled class="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25 opacity-50 cursor-not-allowed">
            <span class="text-base font-bold text-background-dark">Save & Continue</span>
            <span class="material-symbols-outlined text-background-dark" style="font-size: 20px;">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
    `;
}
