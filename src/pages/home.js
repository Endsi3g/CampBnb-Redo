/**
 * Home / Explore Page
 */
import { bottomNav } from '../components/bottom-nav.js';

export function homePage() {
    return `
    <div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
      <!-- Header / Greeting -->
      <div class="px-4 pt-12 pb-2 flex justify-between items-center">
        <div>
          <p class="text-sm font-medium text-gray-400">Good evening,</p>
          <h1 class="text-2xl font-bold tracking-tight text-white">Find your wild</h1>
        </div>
        <div class="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/30" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCr_iMASV60IjyhTzFzUeGAP13KidyUyO2GDJews-B4R7i9vZ2kr9_tHLW3whb87Ja1VOO6Vwerew_aRg-Ye2fiNWf-UkLt7IO-sNvacPM_OJjcmnKEsOkOLZmYzCCqOkjBA3by6iI4yxO13icPRGgoeJZdeg8N3z9d0J5zC5w1P2adt3RAiD5_mckOBEnEi17FOLBi40Ir3_l9tpfUuKzUQNIIO1S6Tfi4GcnWX0A1XCGNnfZJFiz72a3ajVSpsQ2ybykhuFk7-sBx');"></div>
      </div>
      
      <!-- Search Bar -->
      <div class="px-4 py-3 sticky top-0 z-20 bg-background-dark/95 backdrop-blur-sm">
        <label class="flex flex-col h-14 w-full shadow-lg shadow-black/20">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full bg-surface-dark group transition-colors focus-within:ring-2 focus-within:ring-primary/50">
            <div class="text-primary flex border-none items-center justify-center pl-4 rounded-l-xl">
              <span class="material-symbols-outlined text-[24px]">search</span>
            </div>
            <input data-navigate="/search" class="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 border-none bg-transparent h-full placeholder:text-gray-400 px-4 rounded-l-none text-base font-normal leading-normal cursor-pointer" placeholder="Where do you want to camp?" readonly value=""/>
            <div class="flex items-center justify-center pr-4">
              <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[20px]">tune</span>
              </div>
            </div>
          </div>
        </label>
      </div>
      
      <!-- Context Chips -->
      <div class="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark border border-white/5 active:bg-primary/20 px-4 transition-colors">
          <span class="material-symbols-outlined text-gray-300 text-[18px]">location_on</span>
          <span class="text-gray-200 text-sm font-medium">Anywhere</span>
        </button>
        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark border border-white/5 active:bg-primary/20 px-4 transition-colors">
          <span class="material-symbols-outlined text-gray-300 text-[18px]">calendar_today</span>
          <span class="text-gray-200 text-sm font-medium">Any week</span>
        </button>
        <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark border border-white/5 active:bg-primary/20 px-4 transition-colors">
          <span class="material-symbols-outlined text-gray-300 text-[18px]">group</span>
          <span class="text-gray-200 text-sm font-medium">Add guests</span>
        </button>
      </div>
      
      <!-- Category Filters -->
      <div class="pt-2 pb-6">
        <div class="flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x">
          <!-- Active Item -->
          <button class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(17,212,82,0.3)] transition-transform group-active:scale-95">
              <span class="material-symbols-outlined text-background-dark text-[28px]">camping</span>
            </div>
            <span class="text-primary text-xs font-semibold">Tent</span>
          </button>
          <!-- Inactive Items -->
          <button class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">rv_hookup</span>
            </div>
            <span class="text-gray-400 text-xs font-medium">RV Spots</span>
          </button>
          <button class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">cottage</span>
            </div>
            <span class="text-gray-400 text-xs font-medium">Cabins</span>
          </button>
          <button class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">beach_access</span>
            </div>
            <span class="text-gray-400 text-xs font-medium">Glamping</span>
          </button>
          <button class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">forest</span>
            </div>
            <span class="text-gray-400 text-xs font-medium">Backcountry</span>
          </button>
        </div>
      </div>
      
      <!-- Featured / Popular Section -->
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between px-4">
          <h3 class="text-white text-xl font-bold leading-tight">Popular near you</h3>
          <a class="text-primary text-sm font-semibold cursor-pointer">See all</a>
        </div>
        
        <!-- Card 1 -->
        <div class="px-4">
          <div data-navigate="/listing/1" class="group relative flex flex-col items-stretch justify-start rounded-2xl bg-surface-dark overflow-hidden shadow-lg shadow-black/20 hover:shadow-primary/5 transition-all cursor-pointer">
            <div class="relative w-full aspect-[4/3] bg-gray-800">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKayLfsEU86yJL59j8CoQpQmK6AsHFhfPKk9sOc--tZq78QvG_bimkDMY8E7EPhh4hQFIl2H83MRYAJaNUU4pgGGONn-vdadTnDmVuR_7N9NB61Vjy1JDD9hRnTuZ1oQaa00EPCYXqp6Ta-FdBtVUBQf5MYMy6o-sFCFdVB9DfhXJYz2w9ZcGf1l2jBOT3x95Up92rD__ydqNeq2N_rnvmTwvSQTZxo_fbh-1QxwHdyC83f6UU3t6LzDchu2i5a2M47r3xY9wGGk0l");'></div>
              <button class="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-colors z-10">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              <div class="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[14px] icon-filled">star</span>
                <span class="text-white text-xs font-bold">4.9</span>
              </div>
            </div>
            <div class="flex flex-col gap-1 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-white text-lg font-bold leading-tight">Lake Louise Campground</h4>
                  <p class="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    Banff, AB
                  </p>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-primary text-lg font-bold">$45</span>
                  <span class="text-gray-500 text-xs">/ night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 2 -->
        <div class="px-4">
          <div data-navigate="/listing/2" class="group relative flex flex-col items-stretch justify-start rounded-2xl bg-surface-dark overflow-hidden shadow-lg shadow-black/20 hover:shadow-primary/5 transition-all cursor-pointer">
            <div class="relative w-full aspect-[4/3] bg-gray-800">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbVI21qDnx7aDX_CueMbEkQ_sgzrvtP_u_f2_dFaJsryQ_KacqQwgAAFQZ_USYTx_exWBsyGYvx3Qdfp6TB1kiWurFO9RPtTtCO85I6cAb7BK25SmhkajRT5C-N-4RB4uIUrnqgO245bgg8FXtxDBrxlKMx6nz6CgE6l9sH5cXxdmbqXbCwSSbXkxQaCwfDNKK7HKcc-0FA0elSmqhuP7X6GUBEYkh5TjBceGUtG-jmwuazQON2AOiB3mT0VOT_OGth8mGRvmbwsMM");'></div>
              <button class="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-colors z-10">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              <div class="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[14px] icon-filled">star</span>
                <span class="text-white text-xs font-bold">4.8</span>
              </div>
            </div>
            <div class="flex flex-col gap-1 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-white text-lg font-bold leading-tight">Whispering Pines Cabin</h4>
                  <p class="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    Jasper, AB
                  </p>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-primary text-lg font-bold">$120</span>
                  <span class="text-gray-500 text-xs">/ night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 3 -->
        <div class="px-4 pb-8">
          <div data-navigate="/listing/3" class="group relative flex flex-col items-stretch justify-start rounded-2xl bg-surface-dark overflow-hidden shadow-lg shadow-black/20 hover:shadow-primary/5 transition-all cursor-pointer">
            <div class="relative w-full aspect-[4/3] bg-gray-800">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4jzBplWFghB8NdDCWXMMVzQP-e6CWCWp28jXwhVSmwUoA6c19LrgVLbRyRy4FKCnYiNVxkacdsNQB_f7XQcIVFK3Vd8Aer3hyjUK6u8J5m7Q5ZasAcZWVgAcPTqPeUcZQPM69KjIbf2bNul72qZDDXgJkBG3MAWlegMG2NNimyfbXiCDWGzhrn8vnFeZzYSMroCOg6hh4nZKj0BltqhmeIKLjL8ki0agkwXMy1VkIFiB6JAtOkC_2B21yK7RvQISv8WxFRu-IWrqz");'></div>
              <button class="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary hover:text-background-dark transition-colors z-10">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </button>
              <div class="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[14px] icon-filled">star</span>
                <span class="text-white text-xs font-bold">4.5</span>
              </div>
            </div>
            <div class="flex flex-col gap-1 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-white text-lg font-bold leading-tight">Lakeside RV Park</h4>
                  <p class="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    Kelowna, BC
                  </p>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-primary text-lg font-bold">$60</span>
                  <span class="text-gray-500 text-xs">/ night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="h-6"></div>
      
      ${bottomNav('explore')}
    </div>
  `;
}
