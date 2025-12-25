/**
 * Search Results + Map Page
 */
export function searchPage() {
    return `
    <div class="bg-background-dark font-display text-white overflow-hidden h-screen w-full flex flex-col">
      <!-- Top Navigation & Filters -->
      <header class="z-30 w-full bg-background-dark/95 backdrop-blur-md pt-safe-top pb-2 shadow-lg border-b border-white/5 absolute top-0 left-0">
        <!-- Search Bar -->
        <div class="px-4 py-2 pt-12">
          <label class="flex flex-col w-full h-12">
            <div class="flex w-full flex-1 items-stretch rounded-xl h-full shadow-inner bg-[#1A2E22]">
              <div class="text-[#92c9a4] flex border-none items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#5e856b] px-4 rounded-l-none border-l-0 pl-3 text-base font-medium leading-normal" placeholder="Where to?" readonly value="Banff, AB • Jul 12-14"/>
              <div class="text-[#92c9a4] flex border-none items-center justify-center pr-4 rounded-r-xl border-l-0">
                <span class="material-symbols-outlined bg-[#23482f] p-1.5 rounded-full text-white cursor-pointer hover:bg-primary hover:text-black transition-colors">tune</span>
              </div>
            </div>
          </label>
        </div>
        
        <!-- Filter Chips -->
        <div class="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
          <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full border border-primary/30 bg-primary text-black pl-4 pr-3 shadow-md shadow-primary/10">
            <p class="text-sm font-bold leading-normal">Price</p>
            <span class="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </button>
          <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#23482f] border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-white text-sm font-medium leading-normal">Dates</p>
            <span class="material-symbols-outlined text-white text-[20px]">keyboard_arrow_down</span>
          </button>
          <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#23482f] border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-white text-sm font-medium leading-normal">Type</p>
            <span class="material-symbols-outlined text-white text-[20px]">keyboard_arrow_down</span>
          </button>
          <button class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#23482f] border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-white text-sm font-medium leading-normal">Amenities</p>
            <span class="material-symbols-outlined text-white text-[20px]">keyboard_arrow_down</span>
          </button>
        </div>
      </header>
      
      <!-- Interactive Map -->
      <main class="relative w-full h-[55%] bg-[#151c18] z-0 mt-28">
        <div class="absolute inset-0 w-full h-full opacity-60">
          <img class="w-full h-full object-cover filter brightness-[0.7] saturate-[0.6] sepia-[0.3] hue-rotate-[45deg]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArJpbXNg977B2doP6TaUI__YNy0tdzh7YoNmo6kPW-bjTGQOKRTdfKkRv_3HM-cIrOlPLBeKzJuoRFqw6Z6x9XpMuLPdqAxnXUNBUudH3qDHo4vSQ8QJVzsM7_erD61IWEqfe7WD8VEy1PG7UwHPI-55nBaaooyv_DVQ2CTxWSX29x1lHjYVIZcNnp_hSooDkfdCW6F-amrObaxZY6XXg60nRWDR28AU1SInmwo_baiD2bEpJRqmtI0ExB6ty0-ELHaZstSmbElgAj" alt="Map"/>
        </div>
        
        <!-- Floating "Search this area" Button -->
        <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <button class="bg-white text-black px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition">
            Search this area
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
        
        <!-- Map Pins -->
        <button class="absolute top-[30%] left-[45%] z-20 transform -translate-x-1/2 -translate-y-1/2 pin-active">
          <div class="bg-primary text-black font-extrabold text-sm px-3 py-1.5 rounded-full shadow-lg shadow-primary/40 flex items-center gap-1 transition-transform hover:scale-110">$145</div>
          <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
        </button>
        <button class="absolute top-[20%] left-[20%] z-10 transform -translate-x-1/2 -translate-y-1/2">
          <div class="bg-white text-black font-bold text-xs px-2.5 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors">$210</div>
          <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </button>
        <button class="absolute top-[50%] right-[25%] z-10 transform -translate-x-1/2 -translate-y-1/2">
          <div class="bg-white text-black font-bold text-xs px-2.5 py-1 rounded-full shadow-md hover:bg-gray-100 transition-colors">$95</div>
          <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </button>
      </main>
      
      <!-- Bottom Sheet / Results List -->
      <div class="absolute bottom-0 w-full h-[55%] bg-background-dark z-20 rounded-t-3xl shadow-sheet flex flex-col border-t border-white/5">
        <!-- Handle -->
        <div class="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div class="h-1.5 w-12 rounded-full bg-[#326744]/50"></div>
        </div>
        
        <!-- Headline -->
        <div class="px-5 pt-2 pb-3 flex justify-between items-end">
          <h3 class="text-white text-xl font-bold leading-tight">32 Stays in Alberta</h3>
          <span class="text-xs text-[#92c9a4] font-medium uppercase tracking-wider mb-1">Sort by: Relevancy</span>
        </div>
        
        <!-- Scrollable List -->
        <div class="flex-1 overflow-y-auto px-4 pb-20 no-scrollbar space-y-4">
          <!-- Result Card 1 -->
          <div data-navigate="/listing/1" class="group relative flex flex-col gap-3 rounded-2xl bg-[#1c3324] p-3 border border-primary/20 shadow-[0_0_15px_rgba(17,212,82,0.05)] transition-transform active:scale-[0.98] cursor-pointer">
            <div class="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-800">
              <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3-IPazbErvC7oCWj1XuEBPsqKmH5G9pw-0IxCuTbWO_GcoJbzmqv_mA_qtaH325oKrqKmI3F7e7sQ0hYGX031c9IhgH0dAQM6zfSeM02Ip-jZNkaeloul2nQqd4LftyAK_Fo_ofdMNa24pJxum716Ra4uD7fEFWfKxySTTK0Uzp2UhUVIrqJvhAyv_4mT2GtHwKU5gh6Fd5zuA20rffkpHcBLwUF2KQaFxw4xUEWU_fc5lDXBK3a4uDbDOSF_pg2O83796QFUVM7j" alt="Cabin"/>
              <button class="absolute right-3 top-3 rounded-full bg-black/30 p-2 text-white backdrop-blur-md hover:bg-black/50 transition">
                <span class="material-symbols-outlined text-[20px] icon-filled">favorite</span>
              </button>
              <div class="absolute left-3 top-3 rounded-lg bg-primary/90 px-2 py-1 backdrop-blur-sm">
                <p class="text-[10px] font-bold uppercase tracking-wider text-black">Rare Find</p>
              </div>
            </div>
            <div class="px-1 pb-1">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-lg font-bold text-white leading-tight">Rustic Rocky Mountain Cabin</h3>
                <div class="flex items-center gap-1 bg-[#112217] px-1.5 py-0.5 rounded-md">
                  <span class="material-symbols-outlined text-primary text-[14px]">star</span>
                  <span class="text-xs font-bold text-white">4.9</span>
                  <span class="text-[10px] text-gray-400">(128)</span>
                </div>
              </div>
              <p class="text-sm text-[#92c9a4] mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                Jasper, AB
              </p>
              <div class="flex items-center justify-between border-t border-white/5 pt-3">
                <div class="flex items-end gap-1">
                  <span class="text-xl font-bold text-primary">$145</span>
                  <span class="text-sm font-medium text-gray-400 mb-1">CAD / night</span>
                </div>
                <button class="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-colors">View Details</button>
              </div>
            </div>
          </div>
          
          <!-- Result Card 2 -->
          <div data-navigate="/listing/2" class="group relative flex flex-col gap-3 rounded-2xl bg-[#1A2E22] p-3 border border-transparent transition-transform active:scale-[0.98] cursor-pointer">
            <div class="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-800">
              <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiGi6coCXvgI6JCLYXXs0A2D3FkWLEApT1cx59FlrC35bazhLBF-oZSwCnntMV9Mjl6AT1XGn-kEWHruFwxbTx_wTuppYj5OnNK2OMDKNJUUfpD4XO_T98L55gP3t3WyduZInVgv2lvKDWO7rhDqew2OAxx-BzHtvwmByCUWAG93vHD72pSED9Iryc-ItOrr0G2Oc5x233ucG9LJxnBolc3qomrdjLS8t3GF_jXORHg28tpmfmAJrslCKXRW89XTY9K5eefvONLcyj" alt="Glamping"/>
              <button class="absolute right-3 top-3 rounded-full bg-black/30 p-2 text-white backdrop-blur-md hover:bg-black/50 transition">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </button>
            </div>
            <div class="px-1 pb-1">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-lg font-bold text-white leading-tight">Eco-Glamping at Lake Louise</h3>
                <div class="flex items-center gap-1 bg-[#112217] px-1.5 py-0.5 rounded-md">
                  <span class="material-symbols-outlined text-primary text-[14px]">star</span>
                  <span class="text-xs font-bold text-white">4.8</span>
                  <span class="text-[10px] text-gray-400">(85)</span>
                </div>
              </div>
              <p class="text-sm text-[#92c9a4] mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                Banff, AB
              </p>
              <div class="flex items-center justify-between border-t border-white/5 pt-3">
                <div class="flex items-end gap-1">
                  <span class="text-xl font-bold text-white">$210</span>
                  <span class="text-sm font-medium text-gray-400 mb-1">CAD / night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
