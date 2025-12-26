/**
 * Home / Explore Page
 * Fetches real listings from API
 */
import { bottomNav } from '../components/bottom-nav.js';
import { listings, favorites, isAuthenticated, getCurrentUser } from '../api.js';
import { waitForElement, escapeHtml } from '../lib/dom.js';

// Store current filter state
let currentFilter = 'TENT';
let listingsData = [];
let userFavorites = new Set();

/**
 * Render a listing card
 */
function renderListingCard(listing) {
  const isFavorited = userFavorites.has(listing.id);
  // Simple check for safe URL, or just basic escaping for style attribute
  const imageUrl = (listing.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800').replace(/"/g, '%22');

  return `
        <div class="px-4">
          <div data-navigate="/listing/${listing.id}" class="group relative flex flex-col items-stretch justify-start rounded-2xl bg-surface-dark overflow-hidden shadow-lg shadow-black/20 hover:shadow-primary/5 transition-all cursor-pointer">
            <div class="relative w-full aspect-4/3 bg-gray-800">
              <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style='background-image: url("${imageUrl}");'></div>
              <button data-favorite="${listing.id}" class="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center ${isFavorited ? 'text-primary' : 'text-white'} hover:bg-primary hover:text-background-dark transition-colors z-10">
                <span class="material-symbols-outlined text-[20px] ${isFavorited ? 'icon-filled' : ''}">favorite</span>
              </button>
              <div class="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[14px] icon-filled">star</span>
                <span class="text-white text-xs font-bold">${listing.rating?.toFixed(1) || '0.0'}</span>
              </div>
              ${listing.isSuperhost ? `
              <div class="absolute top-3 left-3 px-2 py-1 rounded-lg bg-primary/90 backdrop-blur-md">
                <span class="text-background-dark text-[10px] font-bold uppercase tracking-wider">Superhost</span>
              </div>
              ` : ''}
            </div>
            <div class="flex flex-col gap-1 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-white text-lg font-bold leading-tight">${escapeHtml(listing.title)}</h4>
                  <p class="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <span class="material-symbols-outlined text-[16px]">location_on</span>
                    ${escapeHtml(listing.location)}
                  </p>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-primary text-lg font-bold">$${Math.round(listing.price)}</span>
                  <span class="text-gray-500 text-xs">/ night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
}

/**
 * Render loading skeleton
 */
function renderSkeleton() {
  return `
        <div class="px-4 animate-pulse">
          <div class="rounded-2xl bg-surface-dark overflow-hidden">
            <div class="w-full aspect-4/3 bg-gray-700"></div>
            <div class="p-4 space-y-3">
              <div class="h-5 bg-gray-700 rounded w-3/4"></div>
              <div class="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
    `;
}

/**
 * Get greeting based on time of day
 */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Initialize static page events (run once)
 */
function initStaticEvents() {
  // Category filter buttons
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.filter;
      if (type === currentFilter) return;

      currentFilter = type;
      updateFilterUI();
      await loadListings();
    });
  });
}

/**
 * Initialize dynamic events (run after render)
 */
function initDynamicEvents() {
  // Favorite buttons
  document.querySelectorAll('[data-favorite]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!isAuthenticated()) {
        window.location.hash = '/signin';
        return;
      }

      const listingId = btn.dataset.favorite;
      const isFavorited = userFavorites.has(listingId);

      try {
        if (isFavorited) {
          await favorites.remove(listingId);
          userFavorites.delete(listingId);
        } else {
          await favorites.add(listingId);
          userFavorites.add(listingId);
        }

        // Update button UI
        const icon = btn.querySelector('span');
        btn.classList.toggle('text-primary', !isFavorited);
        btn.classList.toggle('text-white', isFavorited);
        icon.classList.toggle('icon-filled', !isFavorited);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    });
  });
}

/**
 * Update filter UI
 */
function updateFilterUI() {
  document.querySelectorAll('[data-filter]').forEach(btn => {
    const isActive = btn.dataset.filter === currentFilter;
    const container = btn.querySelector('.filter-icon');
    const label = btn.querySelector('.filter-label');

    if (container) {
      container.classList.toggle('bg-primary', isActive);
      container.classList.toggle('text-background-dark', isActive);
      container.classList.toggle('shadow-[0_0_15px_rgba(17,212,82,0.3)]', isActive);
      container.classList.toggle('bg-surface-dark', !isActive);
      container.classList.toggle('text-gray-400', !isActive);
      container.classList.toggle('border', !isActive);
      container.classList.toggle('border-white/5', !isActive);
    }
    if (label) {
      label.classList.toggle('text-primary', isActive);
      label.classList.toggle('font-semibold', isActive);
      label.classList.toggle('text-gray-400', !isActive);
      label.classList.toggle('font-medium', !isActive);
    }
  });
}

/**
 * Load listings from API
 */
async function loadListings() {
  const listingsContainer = document.querySelector('#listings-container');
  if (!listingsContainer) return;

  // Show loading
  listingsContainer.innerHTML = renderSkeleton() + renderSkeleton() + renderSkeleton();

  try {
    const response = await listings.search({ type: currentFilter, limit: 10 });
    listingsData = response.data || response || [];

    if (listingsData.length === 0) {
      listingsContainer.innerHTML = `
                <div class="px-4 py-12 text-center">
                    <span class="material-symbols-outlined text-4xl text-gray-600 mb-2">search_off</span>
                    <p class="text-gray-400">No listings found for this category</p>
                </div>
            `;
    } else {
      listingsContainer.innerHTML = listingsData.map(renderListingCard).join('');
    }

    initDynamicEvents();
  } catch (error) {
    console.error('Error loading listings:', error);
    listingsContainer.innerHTML = `
            <div class="px-4 py-12 text-center">
                <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                <p class="text-gray-400">Failed to load listings</p>
                <button id="retry-listings-btn" class="mt-4 text-primary font-semibold">Try Again</button>
            </div>
        `;
    const retryBtn = listingsContainer.querySelector('#retry-listings-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => loadListings());
    }
  }
}

// Expose to window for inline onclick handlers
window.loadListings = loadListings;

/**
 * Load user favorites
 */
async function loadFavorites() {
  if (!isAuthenticated()) return;

  try {
    const response = await favorites.list();
    const favs = response.data || response || [];
    userFavorites = new Set(favs.map(f => f.listingId || f.id));
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
}

export async function homePage() {
  const user = await getCurrentUser();
  const greeting = getGreeting();


  // Delay loading listings to allow render first
  waitForElement('#listings-container')
    .then(async () => {
      // Ensure favorites are loaded first so heart icons resolve correctly
      await loadFavorites();
      initStaticEvents();
      loadListings();
    })
    .catch(err => {
      console.error('Failed to initialize home page:', err);
    });

  return `
    <div class="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24">
      <!-- Header / Greeting -->
      <div class="px-4 pt-12 pb-2 flex justify-between items-center">
        <div>
          <p class="text-sm font-medium text-gray-400">${greeting},</p>
          <h1 class="text-2xl font-bold tracking-tight text-white">Find your wild</h1>
        </div>
        <div data-navigate="/profile" class="cursor-pointer h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/30" style="background-image: url('${user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'Guest') + '&background=1E2E23&color=11D452'}');"></div>
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
          <button data-filter="TENT" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(17,212,82,0.3)] transition-transform group-active:scale-95 text-background-dark">
              <span class="material-symbols-outlined text-[28px]">camping</span>
            </div>
            <span class="filter-label text-primary text-xs font-semibold">Tent</span>
          </button>
          <button data-filter="RV_SPOT" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">rv_hookup</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">RV Spots</span>
          </button>
          <button data-filter="CABIN" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">cottage</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">Cabins</span>
          </button>
          <button data-filter="GLAMPING" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">beach_access</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">Glamping</span>
          </button>
          <button data-filter="BACKCOUNTRY" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">forest</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">Backcountry</span>
          </button>
          <button data-filter="TREEHOUSE" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">park</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">Treehouse</span>
          </button>
          <button data-filter="YURT" class="flex flex-col items-center gap-2 min-w-[72px] snap-start group">
            <div class="filter-icon h-14 w-14 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:bg-surface-dark-hover transition-colors group-active:scale-95">
              <span class="material-symbols-outlined text-[28px]">holiday_village</span>
            </div>
            <span class="filter-label text-gray-400 text-xs font-medium">Yurt</span>
          </button>
        </div>
      </div>
      
      <!-- Listings Section -->
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between px-4">
          <h3 class="text-white text-xl font-bold leading-tight">Popular near you</h3>
          <a data-navigate="/search" class="text-primary text-sm font-semibold cursor-pointer">See all</a>
        </div>
        
        <!-- Dynamic Listings Container -->
        <div id="listings-container" class="flex flex-col gap-6">
          ${renderSkeleton()}
          ${renderSkeleton()}
          ${renderSkeleton()}
        </div>
      </div>
      
      <div class="h-6"></div>
      
      ${bottomNav('explore')}
    </div>
      `;
}
