/**
 * Guest Selector Page
 */
export function guestSelectorPage() {
  // Load listing data
  let listing = null;
  try {
    listing = JSON.parse(sessionStorage.getItem('booking_listing'));
  } catch (e) { }

  if (!listing) {
    setTimeout(() => window.location.hash = '/home', 100);
    return '';
  }

  const maxGuests = listing.maxGuests || 4;

  // Default or loaded state
  let guests = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  };

  try {
    const saved = JSON.parse(sessionStorage.getItem('booking_guests'));
    if (saved) guests = { ...guests, ...saved };
  } catch (e) { }

  function updateTotal() {
    return guests.adults + guests.children;
  }

  function renderUI() {
    const total = updateTotal();
    const canAdd = total < maxGuests;

    // Update counts
    document.getElementById('count-adults').textContent = guests.adults;
    document.getElementById('count-children').textContent = guests.children;
    document.getElementById('count-infants').textContent = guests.infants;
    document.getElementById('count-pets').textContent = guests.pets;

    // Update button states
    updateBtnState('btn-remove-adults', guests.adults > 1);
    updateBtnState('btn-add-adults', canAdd);

    updateBtnState('btn-remove-children', guests.children > 0);
    updateBtnState('btn-add-children', canAdd);

    updateBtnState('btn-remove-infants', guests.infants > 0);
    updateBtnState('btn-add-infants', true); // Usually infants don't count towards max

    updateBtnState('btn-remove-pets', guests.pets > 0);
    updateBtnState('btn-add-pets', true); // Pets logic depends on rules, assume limitless for now

    // Footer text
    document.getElementById('footer-guests').textContent = `${total} guest${total !== 1 ? 's' : ''}`;
  }

  function updateBtnState(id, enabled) {
    const btn = document.getElementById(id);
    if (!btn) return;

    if (enabled) {
      btn.classList.remove('opacity-50', 'cursor-not-allowed');
      if (btn.classList.contains('bg-transparent')) {
        // outline button
        btn.classList.add('hover:bg-white/5', 'active:scale-95');
      } else {
        // filled button
        btn.classList.add('hover:bg-[#0fb345]', 'active:scale-95');
      }
    } else {
      btn.classList.add('opacity-50', 'cursor-not-allowed');
      btn.classList.remove('hover:bg-white/5', 'active:scale-95', 'hover:bg-[#0fb345]');
    }
  }

  function initEvents() {
    // Handle logic
    const setupCounter = (type, addId, removeId) => {
      document.getElementById(addId)?.addEventListener('click', () => {
        const total = updateTotal();
        if ((type === 'adults' || type === 'children') && total >= maxGuests) return;

        guests[type]++;
        renderUI();
      });

      document.getElementById(removeId)?.addEventListener('click', () => {
        if (guests[type] <= 0) return;
        if (type === 'adults' && guests.adults <= 1) return;

        guests[type]--;
        renderUI();
      });
    };

    setupCounter('adults', 'btn-add-adults', 'btn-remove-adults');
    setupCounter('children', 'btn-add-children', 'btn-remove-children');
    setupCounter('infants', 'btn-add-infants', 'btn-remove-infants');
    setupCounter('pets', 'btn-add-pets', 'btn-remove-pets');

    // Save
    document.getElementById('save-btn')?.addEventListener('click', () => {
      sessionStorage.setItem('booking_guests', JSON.stringify(guests));
      window.location.hash = '/booking/price';
    });

    // Back/Close handle
    document.querySelector('.handle-close')?.addEventListener('click', () => window.history.back());
  }

  setTimeout(() => {
    initEvents();
    renderUI();
  }, 50);

  return `
    <div class="relative h-screen w-full overflow-hidden flex flex-col items-center justify-end md:justify-center">
      <!-- Backdrop Image & Scrim -->
      <div class="absolute inset-0 z-0">
        <img alt="Camping tent" class="h-full w-full object-cover" src="${listing.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'}"/>
        <div class="pointer-events-none fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background-dark via-background-dark/80 to-background-dark/40 backdrop-blur-[2px]"></div>
      </div>
      
      <!-- Main Content -->
      <div class="relative z-10 w-full max-w-md bg-background-dark rounded-t-[32px] md:rounded-[32px] shadow-2xl border-t border-white/5 md:border md:mb-8 overflow-hidden flex flex-col max-h-[90vh]">
        <!-- Handle -->
        <div class="handle-close w-full flex justify-center pt-4 pb-2 bg-background-dark sticky top-0 z-20 cursor-pointer">
          <div class="h-1.5 w-12 rounded-full bg-white/20"></div>
        </div>
        
        <!-- Title Header -->
        <div class="px-6 pb-6 pt-2 bg-background-dark sticky top-8 z-20">
          <h1 class="text-3xl font-bold tracking-tight text-white mb-2">Who is coming?</h1>
          <p class="text-white/60 text-sm">Max ${maxGuests} guests allowed.</p>
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
                <button id="btn-remove-adults" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 bg-transparent transition">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span id="count-adults" class="w-6 text-center text-xl font-bold text-white tabular-nums">${guests.adults}</span>
                <button id="btn-add-adults" class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(17,212,82,0.3)] transition">
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
                <button id="btn-remove-children" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 bg-transparent transition">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span id="count-children" class="w-6 text-center text-xl font-bold text-white tabular-nums">${guests.children}</span>
                <button id="btn-add-children" class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_0_15px_rgba(17,212,82,0.3)] transition">
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
                <button id="btn-remove-infants" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 bg-transparent transition">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span id="count-infants" class="w-6 text-center text-xl font-bold text-white tabular-nums">${guests.infants}</span>
                <button id="btn-add-infants" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark border border-white/10 text-primary transition active:scale-95 hover:bg-white/5">
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
                <button id="btn-remove-pets" class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50 bg-transparent transition">
                  <span class="material-symbols-outlined text-xl">remove</span>
                </button>
                <span id="count-pets" class="w-6 text-center text-xl font-bold text-white tabular-nums">${guests.pets}</span>
                <button id="btn-add-pets" class="flex h-10 w-10 items-center justify-center rounded-full bg-surface-dark border border-white/10 text-primary transition active:scale-95 hover:bg-white/5">
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
          <button id="save-btn" class="w-full flex items-center justify-between bg-primary hover:bg-[#0fb345] text-background-dark text-lg font-bold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-primary/20 group">
            <span>Continue</span>
            <div class="flex items-center gap-2">
              <span id="footer-guests" class="bg-background-dark/10 px-2 py-0.5 rounded text-base font-semibold">1 guest</span>
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    `;
}
