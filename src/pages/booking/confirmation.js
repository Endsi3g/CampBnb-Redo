/**
 * Booking Confirmation Page
 */
export function confirmationPage() {
    return `
    <div class="relative flex h-full min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl">
      <!-- Leaf Decorations -->
      <span class="material-symbols-outlined absolute opacity-10 pointer-events-none text-primary text-[120px] -top-10 -left-10 rotate-45 z-0">eco</span>
      <span class="material-symbols-outlined absolute opacity-10 pointer-events-none text-primary text-[80px] top-40 -right-8 -rotate-12 z-0">spa</span>
      <span class="material-symbols-outlined absolute opacity-10 pointer-events-none text-white text-[60px] bottom-32 -left-4 rotate-12 z-0">forest</span>
      
      <!-- Header / Hero Section -->
      <div class="relative z-10 flex flex-col items-center px-6 pt-12 pb-6 flex-grow-0">
        <!-- Success Icon -->
        <div class="mb-6 relative">
          <div class="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full"></div>
          <div class="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(17,212,82,0.4)]">
            <span class="material-symbols-outlined text-background-dark text-6xl font-bold icon-filled">check</span>
          </div>
        </div>
        
        <!-- Text -->
        <div class="flex flex-col items-center gap-3 text-center">
          <h1 class="text-white text-3xl font-extrabold leading-tight tracking-tight">Pack your bags, Alex!</h1>
          <p class="text-secondary-text text-base font-normal leading-relaxed max-w-[320px]">
            Your stay at Whispering Pines is confirmed. We've sent the receipt to your email.
          </p>
        </div>
      </div>
      
      <!-- Booking Summary Card -->
      <div class="relative z-10 px-4 py-2 w-full">
        <div class="relative overflow-hidden rounded-2xl bg-surface-dark p-0 shadow-lg border border-white/5">
          <!-- Card Header with Map Preview -->
          <div class="relative h-32 w-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWTukrL9sJHgvIEX8ult9FAeupObwith3HamZ4sHJMImHoOJQwx9wBwpdYpp24iAAg4VSC9l5O5QHrJiz7lD2P7GktSjbrnDKeU9MuyML60kE4flsXldkbDf3fJPzdZe6jRQpRXxmH8MHRKxAg4UrGtvJ9950DPxoxHF59b1QJBhpq1CbgVU95HaV4VfDp3mmEhrxmbGxW6clRiy_0q8SAWSwkeKBns1XcUVrm9jueVhKMS_H35s4dRPYOp9Sl-58YkAP-949eTXNV");'>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent"></div>
            <div class="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-primary text-sm">confirmation_number</span>
              <span class="text-white text-xs font-medium tracking-wide">#BK-8829</span>
            </div>
          </div>
          
          <!-- Card Content -->
          <div class="relative -mt-12 px-5 pb-5">
            <div class="flex flex-col gap-5">
              <!-- Main Info Row -->
              <div class="flex gap-4 items-end">
                <div class="h-20 w-20 flex-shrink-0 rounded-xl bg-cover bg-center shadow-md border-2 border-surface-dark" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXkYMp4KMyIRdqz5wI3rZLi5Uw9qyX0Qi66DUV6GeSrUOpVYq8DpzHbjvd3hEHlj0ZfgPgIYxfKgInqaLQEvce6ZRe8_jSIfVeHpRk1pJLhSgWAFhUWqEzd6IojGXBQo1IGwixkexlLL75TUSgciob8rPcHGCYNmXMtEh7EOnKVPoPiCg_zSBY-W0txO869KNm0OBhS5Cc3LmloeD_i0ZUf811zk10TQS_r94pLxHSgrX5-WEFgmBT3M4X3MS-24DOpolsHppRnKcP");'></div>
                <div class="flex flex-col mb-1">
                  <h2 class="text-white text-lg font-bold leading-tight">Whispering Pines</h2>
                  <div class="flex items-center gap-1 mt-1 text-secondary-text">
                    <span class="material-symbols-outlined text-sm" style="font-size: 16px;">location_on</span>
                    <span class="text-sm">Banff, Alberta</span>
                  </div>
                </div>
              </div>
              
              <!-- Details Grid -->
              <div class="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-secondary-text uppercase tracking-wider font-semibold">Check-in</span>
                  <span class="text-white text-sm font-medium">Oct 14, 2:00 PM</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-secondary-text uppercase tracking-wider font-semibold">Check-out</span>
                  <span class="text-white text-sm font-medium">Oct 16, 11:00 AM</span>
                </div>
                <div class="col-span-2 pt-2 mt-1 border-t border-white/5 flex justify-between items-center">
                  <span class="text-xs text-secondary-text">Total (2 Nights)</span>
                  <span class="text-white text-base font-bold">$248.00</span>
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
      <div class="flex-grow"></div>
      
      <!-- Action Buttons -->
      <div class="relative z-10 w-full px-6 py-8 pb-10">
        <div class="flex flex-col gap-3">
          <button data-navigate="/home" class="flex w-full cursor-pointer items-center justify-center rounded-xl bg-primary h-14 px-6 text-background-dark text-base font-bold tracking-wide shadow-lg shadow-primary/20 transition-transform active:scale-[0.98] hover:shadow-primary/30">
            View Trip Details
          </button>
          <button data-navigate="/home" class="flex w-full cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-transparent h-14 px-6 text-secondary-text text-base font-semibold transition-colors hover:bg-white/5 hover:text-white active:scale-[0.98]">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  `;
}
