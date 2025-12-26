/**
 * Listing Details Page
 * Fetches listing data from API
 */
import { listings, favorites, reviews, isAuthenticated, getCurrentUser } from '../api.js';
import { waitForElement, escapeHtml } from '../lib/dom.js';

let listingData = null;
let isFavorited = false;

/**
 * Render amenity icon
 */
function getAmenityIcon(amenity) {
  const icons = {
    'wifi': 'wifi',
    'fire pit': 'local_fire_department',
    'firepit': 'local_fire_department',
    'lake': 'water',
    'lake access': 'water',
    'pet friendly': 'pets',
    'pets': 'pets',
    'kitchen': 'kitchen',
    'parking': 'local_parking',
    'shower': 'shower',
    'electricity': 'bolt',
    'bbq': 'outdoor_grill',
    'hot tub': 'hot_tub',
    'heating': 'thermostat',
    'air conditioning': 'ac_unit',
    'stargazing': 'star'
  };
  const key = amenity.toLowerCase();
  return icons[key] || 'check_circle';
}

/**
 * Render a review card
 */
function renderReviewCard(review) {
  const date = new Date(review.createdAt);
  const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const userName = escapeHtml(review.user?.name || 'Anonymous');
  const userAvatar = (review.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'User')}&background=374151&color=fff`).replace(/"/g, '%22');

  return `
        <div class="min-w-[280px] p-4 rounded-xl bg-[#1E2E23] border border-white/5 flex flex-col gap-3">
          <div class="flex gap-3 items-center">
            <div class="size-10 rounded-full bg-gray-500 overflow-hidden">
              <img alt="${userName}" class="w-full h-full object-cover" src="${userAvatar}"/>
            </div>
            <div>
              <div class="font-bold text-white text-sm">${userName}</div>
              <div class="text-xs text-gray-400">${monthYear}</div>
            </div>
          </div>
          <div class="flex gap-1 mb-1">
            ${Array(5).fill(0).map((_, i) => `
              <span class="material-symbols-outlined text-sm ${i < review.rating ? 'text-primary icon-filled' : 'text-gray-600'}">star</span>
            `).join('')}
          </div>
          <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">${escapeHtml(review.comment)}</p>
        </div>
    `;
}

/**
 * Render loading skeleton
 */
function renderSkeleton() {
  return `
    <div class="relative flex flex-col min-h-screen w-full pb-24 animate-pulse">
      <div class="relative w-full h-[55vh] bg-gray-800"></div>
      <div class="flex flex-col px-5 pt-6 gap-8">
        <div class="h-8 bg-gray-700 rounded w-2/3"></div>
        <div class="h-4 bg-gray-700 rounded w-1/3"></div>
        <div class="flex gap-4">
          ${[1, 2, 3, 4].map(() => '<div class="size-16 bg-gray-700 rounded-2xl"></div>').join('')}
        </div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-700 rounded"></div>
          <div class="h-4 bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
    `;
}

/**
 * Initialize page events
 */
function initListingEvents() {
  // Favorite toggle
  const favBtn = document.querySelector('#favorite-btn');
  if (favBtn) {
    favBtn.addEventListener('click', async () => {
      if (!isAuthenticated()) {
        window.location.hash = '/signin';
        return;
      }

      try {
        if (isFavorited) {
          await favorites.remove(listingData.id);
          isFavorited = false;
        } else {
          await favorites.add(listingData.id);
          isFavorited = true;
        }

        const icon = favBtn.querySelector('span');
        icon.classList.toggle('icon-filled', isFavorited);
        icon.classList.toggle('text-primary', isFavorited);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    });
  }

  // Book now button - store listing data
  const bookBtn = document.querySelector('#book-btn');
  if (bookBtn && listingData) {
    bookBtn.addEventListener('click', () => {
      sessionStorage.setItem('booking_listing', JSON.stringify(listingData));
    });
  }
}

/**
 * Load listing data from API
 */
async function loadListing(listingId) {
  const container = document.querySelector('#listing-container');
  if (!container) return;

  try {
    const data = await listings.get(listingId);
    listingData = data;
    isFavorited = data.isFavorited || false;

    // Fetch reviews
    let reviewsData = [];
    try {
      const reviewsResponse = await reviews.list(listingId);
      reviewsData = reviewsResponse.data || reviewsResponse || [];
    } catch (e) {
      console.log('No reviews yet');
    }

    const hostJoinDate = new Date(data.host?.createdAt);
    const hostJoinStr = hostJoinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const mainImage = (data.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800').replace(/"/g, '%22');
    const hostAvatar = (data.host?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.host?.name || 'Host')}&background=374151&color=fff`).replace(/"/g, '%22');
    const hostName = escapeHtml(data.host?.name || 'Unknown');

    container.innerHTML = `
    <div class="relative flex flex-col min-h-screen w-full pb-24">
      <!-- Hero Section with Image -->
      <div class="relative w-full h-[55vh] shrink-0">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${mainImage}');"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <!-- Top Navigation -->
        <div class="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-20">
          <button data-back class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex gap-3">
            <button class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
              <span class="material-symbols-outlined">ios_share</span>
            </button>
            <button id="favorite-btn" class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors group">
              <span class="material-symbols-outlined ${isFavorited ? 'icon-filled text-primary' : ''} group-active:text-primary transition-colors">favorite</span>
            </button>
          </div>
        </div>
        
        <!-- Listing Header Content -->
        <div class="absolute bottom-0 left-0 right-0 p-5 pb-2 z-10 flex flex-col gap-1">
          <div class="flex items-center gap-2 mb-1">
            ${data.isSuperhost ? `<span class="px-2.5 py-1 rounded-full bg-primary/90 text-background-dark text-xs font-bold tracking-wide uppercase shadow-lg">Superhost</span>` : ''}
            <div class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <span class="material-symbols-outlined text-primary text-[16px] icon-filled">star</span>
              <span class="text-sm font-semibold text-white">${data.rating?.toFixed(2) || '0.00'}</span>
              <span class="text-xs text-gray-300">(${data.reviewCount || 0})</span>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-white leading-tight shadow-sm">${escapeHtml(data.title)}</h1>
          <div class="flex items-center gap-1 text-gray-200">
            <span class="material-symbols-outlined text-[18px]">location_on</span>
            <span class="text-sm font-medium">${escapeHtml(data.location)}, ${escapeHtml(data.province)}</span>
          </div>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex flex-col px-5 pt-6 gap-8">
        <!-- Property Info -->
        <div class="flex items-center gap-4 text-gray-300 text-sm">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">group</span>
            <span>${data.maxGuests} guests</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">bed</span>
            <span>${data.beds || 1} bed${(data.beds || 1) > 1 ? 's' : ''}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">bathroom</span>
            <span>${data.bathrooms || 1} bath</span>
          </div>
        </div>
        
        <!-- Amenities Section -->
        ${data.amenities && data.amenities.length > 0 ? `
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-end">
            <h2 class="text-xl font-bold text-white">Amenities</h2>
          </div>
          <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            ${data.amenities.slice(0, 6).map(amenity => `
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">${getAmenityIcon(amenity)}</span>
              </div>
              <span class="text-xs text-gray-300 font-medium text-center">${escapeHtml(amenity)}</span>
            </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="h-px bg-white/10 w-full"></div>
        
        <!-- Description -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3 mb-1">
            <div class="size-10 rounded-full bg-gray-600 overflow-hidden shrink-0">
              <img alt="${hostName}" class="w-full h-full object-cover" src="${hostAvatar}"/>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">Hosted by ${hostName}</span>
              <span class="text-xs text-secondary-text">Joined ${hostJoinStr}</span>
            </div>
          </div>
          <h2 class="text-xl font-bold text-white">About this place</h2>
          <p class="text-gray-300 text-base leading-relaxed">${escapeHtml(data.description)}</p>
        </div>
        
        <!-- Map Section -->
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold text-white">Where you'll be</h2>
          <div class="w-full h-48 rounded-2xl overflow-hidden relative bg-gray-800">
            <div class="w-full h-full bg-cover bg-center opacity-80" style="background-image: url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${data.longitude},${data.latitude},10,0/400x200?access_token=pk.placeholder');"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div class="size-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <div class="size-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div class="flex flex-col">
              <span class="font-bold text-white">${escapeHtml(data.location)}</span>
              <span class="text-sm text-gray-400">${escapeHtml(data.province)}, Canada</span>
            </div>
          </div>
        </div>
        
        <!-- Reviews Section -->
        <div class="flex flex-col gap-4 pb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary icon-filled">star</span>
            <h2 class="text-xl font-bold text-white">${data.rating?.toFixed(2) || '0.00'} <span class="text-gray-400 font-normal text-lg">(${data.reviewCount || 0} reviews)</span></h2>
          </div>
          ${reviewsData.length > 0 ? `
          <div class="flex overflow-x-auto gap-4 scrollbar-hide -mx-5 px-5 pb-4">
            ${reviewsData.slice(0, 5).map(renderReviewCard).join('')}
          </div>
          ${data.reviewCount > 5 ? `
          <button class="w-full py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
            Show all ${data.reviewCount} reviews
          </button>
          ` : ''}
          ` : `
          <div class="py-8 text-center text-gray-400">
            <span class="material-symbols-outlined text-3xl mb-2">rate_review</span>
            <p>No reviews yet</p>
          </div>
          `}
        </div>
        
        <div class="h-8"></div>
      </div>
      
      <!-- Sticky Bottom Bar -->
      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/95 backdrop-blur-md border-t border-white/5 z-40 pb-safe-bottom">
        <div class="flex items-center justify-between max-w-lg mx-auto w-full">
          <div class="flex flex-col">
            <div class="flex items-end gap-1">
              <span class="text-xl font-bold text-white">$${Math.round(data.price)}</span>
              <span class="text-sm text-gray-400 font-medium mb-1">${data.currency || 'CAD'} / night</span>
            </div>
            <span class="text-xs text-secondary-text">Select dates for total</span>
          </div>
          <button id="book-btn" data-navigate="/booking/dates" class="bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
        `;

    // Re-initialize router events for back button
    document.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
      });
    });

    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = el.dataset.navigate;
      });
    });

    initListingEvents();

  } catch (error) {
    console.error('Error loading listing:', error);
    container.innerHTML = `
            <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
                <h1 class="text-2xl font-bold mb-2 text-white">Listing Not Found</h1>
                <p class="text-gray-400 mb-6">We couldn't find this listing.</p>
                <button data-navigate="/home" class="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold">
                    Go Home
                </button>
            </div>
        `;

    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = el.dataset.navigate;
      });
    });
  }
}

export function listingDetailsPage(params = {}) {
  const listingId = params.id;

  // Load listing after render
  waitForElement('#listing-container').then(() => loadListing(listingId));

  return `
    <div id="listing-container">
      ${renderSkeleton()}
    </div>
    `;
}

let listingData = null;
let isFavorited = false;

/**
 * Render amenity icon
 */
function getAmenityIcon(amenity) {
  const icons = {
    'wifi': 'wifi',
    'fire pit': 'local_fire_department',
    'firepit': 'local_fire_department',
    'lake': 'water',
    'lake access': 'water',
    'pet friendly': 'pets',
    'pets': 'pets',
    'kitchen': 'kitchen',
    'parking': 'local_parking',
    'shower': 'shower',
    'electricity': 'bolt',
    'bbq': 'outdoor_grill',
    'hot tub': 'hot_tub',
    'heating': 'thermostat',
    'air conditioning': 'ac_unit',
    'stargazing': 'star'
  };
  const key = amenity.toLowerCase();
  return icons[key] || 'check_circle';
}

/**
 * Render a review card
 */
function renderReviewCard(review) {
  const date = new Date(review.createdAt);
  const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return `
        <div class="min-w-[280px] p-4 rounded-xl bg-[#1E2E23] border border-white/5 flex flex-col gap-3">
          <div class="flex gap-3 items-center">
            <div class="size-10 rounded-full bg-gray-500 overflow-hidden">
              <img alt="${review.user?.name}" class="w-full h-full object-cover" src="${review.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'User')}&background=374151&color=fff`}"/>
            </div>
            <div>
              <div class="font-bold text-white text-sm">${review.user?.name || 'Anonymous'}</div>
              <div class="text-xs text-gray-400">${monthYear}</div>
            </div>
          </div>
          <div class="flex gap-1 mb-1">
            ${Array(5).fill(0).map((_, i) => `
              <span class="material-symbols-outlined text-sm ${i < review.rating ? 'text-primary icon-filled' : 'text-gray-600'}">star</span>
            `).join('')}
          </div>
          <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">${review.comment}</p>
        </div>
    `;
}

/**
 * Render loading skeleton
 */
function renderSkeleton() {
  return `
    <div class="relative flex flex-col min-h-screen w-full pb-24 animate-pulse">
      <div class="relative w-full h-[55vh] bg-gray-800"></div>
      <div class="flex flex-col px-5 pt-6 gap-8">
        <div class="h-8 bg-gray-700 rounded w-2/3"></div>
        <div class="h-4 bg-gray-700 rounded w-1/3"></div>
        <div class="flex gap-4">
          ${[1, 2, 3, 4].map(() => '<div class="size-16 bg-gray-700 rounded-2xl"></div>').join('')}
        </div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-700 rounded"></div>
          <div class="h-4 bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    </div>
    `;
}

/**
 * Initialize page events
 */
function initListingEvents() {
  // Favorite toggle
  const favBtn = document.querySelector('#favorite-btn');
  if (favBtn) {
    favBtn.addEventListener('click', async () => {
      if (!isAuthenticated()) {
        window.location.hash = '/signin';
        return;
      }

      try {
        if (isFavorited) {
          await favorites.remove(listingData.id);
          isFavorited = false;
        } else {
          await favorites.add(listingData.id);
          isFavorited = true;
        }

        const icon = favBtn.querySelector('span');
        icon.classList.toggle('icon-filled', isFavorited);
        icon.classList.toggle('text-primary', isFavorited);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    });
  }

  // Book now button - store listing data
  const bookBtn = document.querySelector('#book-btn');
  if (bookBtn && listingData) {
    bookBtn.addEventListener('click', () => {
      sessionStorage.setItem('booking_listing', JSON.stringify(listingData));
    });
  }
}

/**
 * Load listing data from API
 */
async function loadListing(listingId) {
  const container = document.querySelector('#listing-container');
  if (!container) return;

  try {
    const data = await listings.get(listingId);
    listingData = data;
    isFavorited = data.isFavorited || false;

    // Fetch reviews
    let reviewsData = [];
    try {
      const reviewsResponse = await reviews.list(listingId);
      reviewsData = reviewsResponse.data || reviewsResponse || [];
    } catch (e) {
      console.log('No reviews yet');
    }

    const hostJoinDate = new Date(data.host?.createdAt);
    const hostJoinStr = hostJoinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    container.innerHTML = `
    <div class="relative flex flex-col min-h-screen w-full pb-24">
      <!-- Hero Section with Image -->
      <div class="relative w-full h-[55vh] shrink-0">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${data.images?.[0] || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'}');"></div>
        <div class="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <!-- Top Navigation -->
        <div class="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-20">
          <button data-back class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex gap-3">
            <button class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
              <span class="material-symbols-outlined">ios_share</span>
            </button>
            <button id="favorite-btn" class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors group">
              <span class="material-symbols-outlined ${isFavorited ? 'icon-filled text-primary' : ''} group-active:text-primary transition-colors">favorite</span>
            </button>
          </div>
        </div>
        
        <!-- Listing Header Content -->
        <div class="absolute bottom-0 left-0 right-0 p-5 pb-2 z-10 flex flex-col gap-1">
          <div class="flex items-center gap-2 mb-1">
            ${data.isSuperhost ? `<span class="px-2.5 py-1 rounded-full bg-primary/90 text-background-dark text-xs font-bold tracking-wide uppercase shadow-lg">Superhost</span>` : ''}
            <div class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <span class="material-symbols-outlined text-primary text-[16px] icon-filled">star</span>
              <span class="text-sm font-semibold text-white">${data.rating?.toFixed(2) || '0.00'}</span>
              <span class="text-xs text-gray-300">(${data.reviewCount || 0})</span>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-white leading-tight shadow-sm">${data.title}</h1>
          <div class="flex items-center gap-1 text-gray-200">
            <span class="material-symbols-outlined text-[18px]">location_on</span>
            <span class="text-sm font-medium">${data.location}, ${data.province}</span>
          </div>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex flex-col px-5 pt-6 gap-8">
        <!-- Property Info -->
        <div class="flex items-center gap-4 text-gray-300 text-sm">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">group</span>
            <span>${data.maxGuests} guests</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">bed</span>
            <span>${data.beds || 1} bed${(data.beds || 1) > 1 ? 's' : ''}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px]">bathroom</span>
            <span>${data.bathrooms || 1} bath</span>
          </div>
        </div>
        
        <!-- Amenities Section -->
        ${data.amenities && data.amenities.length > 0 ? `
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-end">
            <h2 class="text-xl font-bold text-white">Amenities</h2>
          </div>
          <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            ${data.amenities.slice(0, 6).map(amenity => `
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">${getAmenityIcon(amenity)}</span>
              </div>
              <span class="text-xs text-gray-300 font-medium text-center">${amenity}</span>
            </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="h-px bg-white/10 w-full"></div>
        
        <!-- Description -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3 mb-1">
            <div class="size-10 rounded-full bg-gray-600 overflow-hidden shrink-0">
              <img alt="${data.host?.name}" class="w-full h-full object-cover" src="${data.host?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.host?.name || 'Host')}&background=374151&color=fff`}"/>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">Hosted by ${data.host?.name || 'Unknown'}</span>
              <span class="text-xs text-secondary-text">Joined ${hostJoinStr}</span>
            </div>
          </div>
          <h2 class="text-xl font-bold text-white">About this place</h2>
          <p class="text-gray-300 text-base leading-relaxed">${data.description}</p>
        </div>
        
        <!-- Map Section -->
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold text-white">Where you'll be</h2>
          <div class="w-full h-48 rounded-2xl overflow-hidden relative bg-gray-800">
            <div class="w-full h-full bg-cover bg-center opacity-80" style="background-image: url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${data.longitude},${data.latitude},10,0/400x200?access_token=pk.placeholder');"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div class="size-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <div class="size-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div class="flex flex-col">
              <span class="font-bold text-white">${data.location}</span>
              <span class="text-sm text-gray-400">${data.province}, Canada</span>
            </div>
          </div>
        </div>
        
        <!-- Reviews Section -->
        <div class="flex flex-col gap-4 pb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary icon-filled">star</span>
            <h2 class="text-xl font-bold text-white">${data.rating?.toFixed(2) || '0.00'} <span class="text-gray-400 font-normal text-lg">(${data.reviewCount || 0} reviews)</span></h2>
          </div>
          ${reviewsData.length > 0 ? `
          <div class="flex overflow-x-auto gap-4 scrollbar-hide -mx-5 px-5 pb-4">
            ${reviewsData.slice(0, 5).map(renderReviewCard).join('')}
          </div>
          ${data.reviewCount > 5 ? `
          <button class="w-full py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
            Show all ${data.reviewCount} reviews
          </button>
          ` : ''}
          ` : `
          <div class="py-8 text-center text-gray-400">
            <span class="material-symbols-outlined text-3xl mb-2">rate_review</span>
            <p>No reviews yet</p>
          </div>
          `}
        </div>
        
        <div class="h-8"></div>
      </div>
      
      <!-- Sticky Bottom Bar -->
      <div class="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/95 backdrop-blur-md border-t border-white/5 z-40 pb-safe-bottom">
        <div class="flex items-center justify-between max-w-lg mx-auto w-full">
          <div class="flex flex-col">
            <div class="flex items-end gap-1">
              <span class="text-xl font-bold text-white">$${Math.round(data.price)}</span>
              <span class="text-sm text-gray-400 font-medium mb-1">${data.currency || 'CAD'} / night</span>
            </div>
            <span class="text-xs text-secondary-text">Select dates for total</span>
          </div>
          <button id="book-btn" data-navigate="/booking/dates" class="bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
        `;

    // Re-initialize router events for back button
    document.querySelectorAll('[data-back]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
      });
    });

    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = el.dataset.navigate;
      });
    });

    initListingEvents();

  } catch (error) {
    console.error('Error loading listing:', error);
    container.innerHTML = `
            <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error_outline</span>
                <h1 class="text-2xl font-bold mb-2 text-white">Listing Not Found</h1>
                <p class="text-gray-400 mb-6">We couldn't find this listing.</p>
                <button data-navigate="/home" class="bg-primary text-background-dark px-6 py-3 rounded-xl font-bold">
                    Go Home
                </button>
            </div>
        `;

    document.querySelectorAll('[data-navigate]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = el.dataset.navigate;
      });
    });
  }
}

export function listingDetailsPage(params = {}) {
  const listingId = params.id;

  // Load listing after render
  setTimeout(() => loadListing(listingId), 50);

  return `
    <div id="listing-container">
      ${renderSkeleton()}
    </div>
    `;
}
