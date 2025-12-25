/**
 * Date Picker Page
 */
export function datePickerPage() {
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
              <span class="text-base font-bold text-gray-900 dark:text-white">Oct 12</span>
            </div>
          </div>
          <div class="flex flex-col flex-1 gap-1.5 p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-surface-dark/50 transition-all cursor-pointer hover:border-gray-400 dark:hover:border-white/20">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Check-out</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-gray-400" style="font-size: 20px;">event_available</span>
              <span class="text-base font-bold text-gray-900 dark:text-white">Oct 15</span>
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
        <!-- October 2023 -->
        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-2 sticky top-0 bg-background-light dark:bg-background-dark py-2 z-0">October 2023</h3>
          <div class="grid grid-cols-7 gap-y-1">
            <div></div><div></div><div></div><div></div><div></div><div></div>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(d => `
              <button class="h-10 w-full flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/5">${d}</button>
            `).join('')}
            <!-- Selection Start -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <div class="absolute right-0 top-0 bottom-0 w-1/2 bg-primary/20"></div>
              <button class="relative z-10 size-10 flex items-center justify-center rounded-full bg-primary text-background-dark text-sm font-bold shadow-lg shadow-primary/25">12</button>
            </div>
            <!-- Range Middle -->
            <div class="relative w-full h-10 flex items-center justify-center bg-primary/20">
              <button class="relative z-10 size-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-900 dark:text-white">13</button>
            </div>
            <div class="relative w-full h-10 flex items-center justify-center bg-primary/20">
              <button class="relative z-10 size-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-900 dark:text-white">14</button>
            </div>
            <!-- Selection End -->
            <div class="relative w-full h-10 flex items-center justify-center">
              <div class="absolute left-0 top-0 bottom-0 w-1/2 bg-primary/20"></div>
              <button class="relative z-10 size-10 flex items-center justify-center rounded-full bg-primary text-background-dark text-sm font-bold shadow-lg shadow-primary/25">15</button>
            </div>
            ${[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(d => `
              <button class="h-10 w-full flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/5">${d}</button>
            `).join('')}
          </div>
        </div>
        
        <!-- November 2023 -->
        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-2 sticky top-0 bg-background-light dark:bg-background-dark py-2 z-0">November 2023</h3>
          <div class="grid grid-cols-7 gap-y-4">
            <div></div><div></div><div></div>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(d => `
              <button class="h-10 w-full flex items-center justify-center text-sm font-medium text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/5">${d}</button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Action Panel -->
      <div class="absolute bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 p-5 pb-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] z-20">
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price</p>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">$360</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">for 3 nights</span>
              </div>
            </div>
            <div class="px-3 py-1.5 rounded-lg bg-surface-dark/10 dark:bg-white/10 border border-gray-200 dark:border-white/5">
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">$120 / night</span>
            </div>
          </div>
          <button data-navigate="/booking/guests" class="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25">
            <span class="text-base font-bold text-background-dark">Save & Continue</span>
            <span class="material-symbols-outlined text-background-dark" style="font-size: 20px;">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
