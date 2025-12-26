/**
 * Search Results + Map Page
 * Fetches listings from API with filters
 */
import { listings, favorites } from '../api.js';
import { router } from '../router.js';

let searchResults = [];
let filters = {
  search: '',
  minPrice: '',
  maxPrice: '',
  type: '',
  page: 1,
  limit: 20
};

/**
 * Render a result card
 */
function renderResultCard(listing) {
  return `
          <div data-navigate="/listing/${listing.id}" class="group relative flex flex-col gap-3 rounded-2xl bg-[#1c3324] p-3 border border-primary/20 shadow-[0_0_15px_rgba(17,212,82,0.05)] transition-transform active:scale-[0.98] cursor-pointer">
            <div class="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-800">
              <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="${listing.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'}" alt="${listing.title}"/>
              <div class="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 backdrop-blur-sm">
                <p class="text-[10px] font-bold uppercase tracking-wider text-white">${listing.type?.replace('_', ' ') || 'Stay'}</p>
              </div>
              <button data-toggle-fav="${listing.id}" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all z-20">
                <span class="material-symbols-outlined text-lg ${listing.isFavorited ? 'icon-filled text-primary' : ''}">favorite</span>
              </button>
            </div>
            <div class="px-1 pb-1">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-lg font-bold text-white leading-tight">${listing.title}</h3>
                <div class="flex items-center gap-1 bg-[#112217] px-1.5 py-0.5 rounded-md">
                  <span class="material-symbols-outlined text-primary text-[14px] icon-filled">star</span>
                  <span class="text-xs font-bold text-white">${listing.rating?.toFixed(1) || '0.0'}</span>
                  <span class="text-[10px] text-gray-400">(${listing.reviewCount || 0})</span>
                </div>
              </div>
              <p class="text-sm text-secondary-text mb-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">location_on</span>
                ${listing.location}, ${listing.province}
              </p>
              <div class="flex items-center justify-between border-t border-white/5 pt-3">
                <div class="flex items-end gap-1">
                  <span class="text-xl font-bold text-primary">$${Math.round(listing.price)}</span>
                  <span class="text-sm font-medium text-gray-400 mb-1">CAD / night</span>
                </div>
                <button class="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold transition-colors">View Details</button>
              </div>
            </div>
          </div>
    `;
}

/**
 * Render map pin
 */
function renderMapPin(listing) {
  // Generate random position for demo if lat/long is missing or 0
  // Centered around 51.1784° N, 115.5708° W (Banff) approx
  const lat = listing.latitude || 20 + Math.random() * 60;
  const lng = listing.longitude || 20 + Math.random() * 40;

  // Convert to percentage for demo (this is fake mapping for visual only since we don't have real map library yet)
  // In a real app we'd use Mapbox/Google Maps markers
  const top = 20 + Math.random() * 60;
  const left = 20 + Math.random() * 60;

  return `
        <button data-navigate="/listing/${listing.id}" class="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 hover:z-20 group" style="top: ${top}%; left: ${left}%">
          <div class="bg-white text-black font-bold text-xs px-2.5 py-1 rounded-full shadow-md hover:bg-primary transition-colors group-hover:scale-110">$${Math.round(listing.price)}</div>
          <div class="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-[6px] border-t-white absolute -bottom-1 left-1/2 -translate-x-1/2 group-hover:border-t-primary"></div>
        </button>
    `;
}

/**
 * Perform search
 */
async function search() {
  const listContainer = document.querySelector('#results-list');
  const mapContainer = document.querySelector('#map-pins');
  const countLabel = document.querySelector('#results-count');

  if (!listContainer) return;

  // Loading state
  listContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12">
            <span class="material-symbols-outlined animate-spin text-3xl text-primary mb-2">progress_activity</span>
            <p class="text-gray-400 text-sm">Finding best spots...</p>
        </div>
    `;

  try {
    const response = await listings.search(filters);
    searchResults = response.data || response || [];

    if (countLabel) {
      countLabel.textContent = `${searchResults.length} Stays Found`;
    }

    if (searchResults.length === 0) {
      listContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-4xl text-gray-600 mb-2">search_off</span>
                    <h3 class="text-white font-bold text-lg">No matches found</h3>
                    <p class="text-gray-400 text-sm max-w-xs mx-auto">Try adjusting your filters or search for a different location.</p>
                </div>
            `;
      if (mapContainer) mapContainer.innerHTML = '';
    } else {
      listContainer.innerHTML = searchResults.map(renderResultCard).join('');
      if (mapContainer) {
        mapContainer.innerHTML = searchResults.map(renderMapPin).join('');
      }
    }

    // Re-attach listeners
    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        // Prevent if clicking fav
        if (e.target.closest('[data-toggle-fav]')) return;
        window.location.hash = el.dataset.navigate;
      });
    });

    // Favorite Toggles
    document.querySelectorAll('[data-toggle-fav]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.toggleFav;
        const icon = btn.querySelector('span');
        const isFav = icon.classList.contains('text-primary'); // Current state

        try {
          if (isFav) {
            await favorites.remove(id);
            icon.classList.remove('icon-filled', 'text-primary');
          } else {
            await favorites.add(id);
            icon.classList.add('icon-filled', 'text-primary');
          }
        } catch (err) {
          console.error('Fav toggle failed', err);
        }
      });
    });

  } catch (error) {
    console.error('Search error:', error);
    listContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                <p class="text-gray-400">Failed to load results</p>
            </div>
        `;
  }
}

/**
 * Initialize
 */
function initSearchEvents() {
  const searchInput = document.querySelector('#search-input');

  if (searchInput) {
    // Debounce search
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      filters.search = e.target.value;
      timeout = setTimeout(search, 500);
    });

    // Focus on load if empty
    if (!filters.search) {
      searchInput.focus();
    }
  }

  // Filter toggles (simple implementation for now)
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle UI active state
      btn.classList.toggle('bg-primary');
      btn.classList.toggle('text-black');
      btn.classList.toggle('border-primary/30');
      btn.classList.toggle('bg-[#23482f]');
      btn.classList.toggle('text-white');
      btn.classList.toggle('border-white/5');

      // Note: In real app would open filter modal
      // For now just triggering reload to simulate
      search();
    });
  });
}

export function searchPage(params = {}) {
  // Parse query params if any
  const query = new URLSearchParams(window.location.hash.split('?')[1]);
  if (query.has('q')) filters.search = query.get('q');

  setTimeout(initSearchEvents, 50);
  setTimeout(search, 100);

  return `
    <div class="bg-background-dark font-display text-white overflow-hidden h-screen w-full flex flex-col">
      <!-- Top Navigation & Filters -->
      <header class="z-30 w-full bg-background-dark/95 backdrop-blur-md pt-4 pb-2 shadow-lg border-b border-white/5 absolute top-0 left-0">
        <!-- Search Bar -->
        <div class="px-4 py-2 pt-8 flex gap-3 items-center">
          <button data-navigate="/home" class="flex items-center justify-center size-10 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <label class="flex flex-col w-full h-12">
            <div class="flex w-full flex-1 items-stretch rounded-xl h-full shadow-inner bg-surface-dark">
              <div class="text-secondary-text flex border-none items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span class="material-symbols-outlined">search</span>
              </div>
              <input id="search-input" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#5e856b] px-4 rounded-l-none border-l-0 pl-3 text-base font-medium leading-normal" placeholder="Where to?" value="${filters.search}"/>
              <div class="text-secondary-text flex border-none items-center justify-center pr-4 rounded-r-xl border-l-0">
                <span class="material-symbols-outlined bg-[#23482f] p-1.5 rounded-full text-white cursor-pointer hover:bg-primary hover:text-black transition-colors">tune</span>
              </div>
            </div>
          </label>
        </div>
        
        <!-- Filter Chips -->
        <div class="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
          <button class="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark/50 border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-sm font-medium leading-normal">Price</p>
            <span class="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </button>
          <button class="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark/50 border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-sm font-medium leading-normal">Type</p>
            <span class="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </button>
          <button class="filter-chip flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark/50 border border-white/5 pl-4 pr-3 hover:bg-[#2d5c3c] transition-colors">
            <p class="text-sm font-medium leading-normal">Amenities</p>
            <span class="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </button>
        </div>
      </header>
      
      <!-- Interactive Map -->
      <main class="relative w-full h-[55%] bg-[#151c18] z-0 mt-28">
        <div class="absolute inset-0 w-full h-full opacity-60">
          <img class="w-full h-full object-cover filter brightness-[0.7] saturate-[0.6] sepia-[0.3] hue-rotate-45" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArJpbXNg977B2doP6TaUI__YNy0tdzh7YoNmo6kPW-bjTGQOKRTdfKkRv_3HM-cIrOlPLBeKzJuoRFqw6Z6x9XpMuLPdqAxnXUNBUudH3qDHo4vSQ8QJVzsM7_erD61IWEqfe7WD8VEy1PG7UwHPI-55nBaaooyv_DVQ2CTxWSX29x1lHjYVIZcNnp_hSooDkfdCW6F-amrObaxZY6XXg60nRWDR28AU1SInmwo_baiD2bEpJRqmtI0ExB6ty0-ELHaZstSmbElgAj" alt="Map"/>
        </div>
        
        <!-- Floating "Search this area" Button -->
        <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <button class="bg-white text-black px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition">
            Search this area
            <span class="material-symbols-outlined text-[16px]">refresh</span>
          </button>
        </div>
        
        <!-- Map Pins Container -->
        <div id="map-pins">
            <!-- Pins inserted here -->
        </div>
      </main>
      
      <!-- Bottom Sheet / Results List -->
      <div class="absolute bottom-0 w-full h-[55%] bg-background-dark z-20 rounded-t-3xl shadow-sheet flex flex-col border-t border-white/5">
        <!-- Handle -->
        <div class="w-full flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div class="h-1.5 w-12 rounded-full bg-[#326744]/50"></div>
        </div>
        
        <!-- Headline -->
        <div class="px-5 pt-2 pb-3 flex justify-between items-end">
          <h3 id="results-count" class="text-white text-xl font-bold leading-tight">Searching...</h3>
          <span class="text-xs text-secondary-text font-medium uppercase tracking-wider mb-1">Sort by: Relevancy</span>
        </div>
        
        <!-- Scrollable List -->
        <div id="results-list" class="flex-1 overflow-y-auto px-4 pb-20 no-scrollbar space-y-4">
          <!-- Results inserted here -->
        </div>
      </div>
    </div>
  `;
}
