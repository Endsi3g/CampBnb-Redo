/**
 * Guest Selector Page
 */
export function guestSelectorPage() {
    return `
    <div class="relative h-screen w-full overflow-hidden flex flex-col items-center justify-end md:justify-center">
      <!-- Backdrop Image & Scrim -->
      <div class="absolute inset-0 z-0">
        <img alt="Camping tent" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQy-qd54s6t9bAqKRnnFTy8vdbh9a4bknMU5c2yQ81M7E1ucgrY6i7lNO2_sdorDp7lAQyngRXbLkeB775Gkik01jeRl-IKjQIcT6ZsBRf2Qwj_wKpmz1Z8PHozEmBh_6T1KKYkaxA-uMAW3YET8fduzanUvZYoqlITd5GJ83B6QrI2WGuVwvlGvo1c8SmKSrVNPjwsNRCwXU_dugcRWsYWrQrNcaaO6ogXaKqSjdnxVGvkEE-gMQucH5BTv21aAgKJ9Rkuxz76WE4"/>
        <div class="absolute inset-0 bg-gradient-to-t from-[#102216] via-[#102216]/80 to-[#102216]/40 backdrop-blur-[2px]"></div>
      </div>
      
      <!-- Main Content -->
      <div class="relative z-10 w-full max-w-md bg-background-dark rounded-t-[32px] md:rounded-[32px] shadow-2xl border-t border-white/5 md:border md:mb-8 overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Handle -->
        <div class="w-full flex justify-center pt-4 pb-2 bg-background-dark sticky top-0 z-20">
          <div class="h-1.5 w-12 rounded-full bg-white/20"></div>
        </div>
        
        <!-- Title Header -->
        <div class="px-6 pb-6 pt-2 bg-background-dark sticky top-8 z-20">
          <h1 class="text-3xl font-bold tracking-tight text-white mb-2">Who is coming?</h1>
          <p class="text-white/60 text-sm">Select the number of guests for your trip.</p>
        </div>
        
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto no-scrollbar px-6 pb-24 space-y-2">
          <!-- Adult Item -->
          <div class="group flex items-center justify-between py-4 border-b border-white/5">
            <div class="flex flex-col justify-center pr-4">
              <p class="text-white text-lg font-semibold leading-normal">Adults</p>
              <p class="text-primary/80 text-sm font-medium leading-normal">Ages 13 or above</p>
            </div>
            <div class="shrink-0">
              <div class="flex items-center gap-4">
                <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 transition active:scale-95 hover:bg-white/5">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span class="w-6 text-center text-xl font-bold text-white tabular-nums">2</span>
                <button class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(17,212,82,0.3)] transition active:scale-95 hover:bg-[#0fb345]">
                  <span class="material-symbols-outlined text-xl font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Children Item -->
          <div class="group flex items-center justify-between py-4 border-b border-white/5">
            <div class="flex flex-col justify-center pr-4">
              <p class="text-white text-lg font-semibold leading-normal">Children</p>
              <p class="text-primary/80 text-sm font-medium leading-normal">Ages 2–12</p>
            </div>
            <div class="shrink-0">
              <div class="flex items-center gap-4">
                <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/5 transition active:scale-95">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span class="w-6 text-center text-xl font-bold text-white tabular-nums">1</span>
                <button class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(17,212,82,0.3)] transition active:scale-95 hover:bg-[#0fb345]">
                  <span class="material-symbols-outlined text-xl font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Infants Item -->
          <div class="group flex items-center justify-between py-4 border-b border-white/5">
            <div class="flex flex-col justify-center pr-4">
              <div class="flex items-center gap-2">
                <p class="text-white text-lg font-semibold leading-normal">Infants</p>
                <span class="material-symbols-outlined text-white/40 text-[18px]">info</span>
              </div>
              <p class="text-primary/80 text-sm font-medium leading-normal">Under 2</p>
            </div>
            <div class="shrink-0">
              <div class="flex items-center gap-4">
                <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 transition active:scale-95 hover:bg-white/5">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span class="w-6 text-center text-xl font-bold text-white tabular-nums">0</span>
                <button class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark border border-white/10 text-primary transition active:scale-95 hover:bg-white/5">
                  <span class="material-symbols-outlined text-xl font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Pets Item -->
          <div class="group flex items-center justify-between py-4 border-b border-white/5">
            <div class="flex flex-col justify-center pr-4">
              <p class="text-white text-lg font-semibold leading-normal">Pets</p>
              <p class="text-primary/80 text-sm font-medium leading-normal">Service animals welcome</p>
            </div>
            <div class="shrink-0">
              <div class="flex items-center gap-4">
                <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 transition active:scale-95 hover:bg-white/5">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span class="w-6 text-center text-xl font-bold text-white tabular-nums">0</span>
                <button class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark border border-white/10 text-primary transition active:scale-95 hover:bg-white/5">
                  <span class="material-symbols-outlined text-xl font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Disclaimer -->
          <div class="mt-6 flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
            <span class="material-symbols-outlined text-primary mt-0.5">eco</span>
            <p class="text-xs text-white/60 leading-relaxed">
              Infants and pets don't count toward the guest limit at most eco-campsites. Please check specific listing rules.
            </p>
          </div>
        </div>
        
        <!-- Sticky Footer Action -->
        <div class="absolute bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-md border-t border-white/10 p-6 z-30">
          <button data-navigate="/booking/price" class="w-full flex items-center justify-between bg-primary hover:bg-[#0fb345] text-background-dark text-lg font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-primary/20 group">
            <span>Continue</span>
            <div class="flex items-center gap-2">
              <span class="bg-background-dark/10 px-2 py-0.5 rounded text-base font-semibold">3 guests</span>
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
}
