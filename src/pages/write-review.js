/**
 * Write Review Page
 */
import { reviews, listings } from '../api.js';

export function writeReviewPage() {
    // Get listing ID from URL
    const hash = window.location.hash;
    const query = hash.split('?')[1];
    const params = new URLSearchParams(query);
    const listingId = params.get('listingId');
    const bookingId = params.get('bookingId');

    if (!listingId) {
        setTimeout(() => window.location.hash = '/profile?tab=trips', 100);
        return '';
    }

    // State
    let listingData = null;
    let rating = 0;

    // Fetch listing details for context
    async function loadData() {
        try {
            listingData = await listings.get(listingId);
            render();
        } catch (e) {
            console.error('Failed to load listing', e);
        }
    }

    // Interaction handlers
    function initEvents() {
        // Back
        document.querySelector('[data-back]')?.addEventListener('click', () => window.history.back());

        // Stars
        document.querySelectorAll('.star-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                rating = parseInt(e.currentTarget.dataset.value);
                updateStars();
                validate();
            });
        });

        // Text
        const textarea = document.getElementById('review-comment');
        if (textarea) textarea.addEventListener('input', validate);

        // Submit
        document.getElementById('submit-review')?.addEventListener('click', async () => {
            const comment = textarea.value;
            if (rating < 1 || comment.length < 10) return;

            const btn = document.getElementById('submit-review');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span>';

            try {
                await reviews.create(listingId, { rating, comment });
                // Success
                btn.innerHTML = 'Success!';
                btn.classList.add('bg-green-600', 'hover:bg-green-700');

                setTimeout(() => {
                    window.location.hash = '/profile?tab=trips';
                }, 1000);
            } catch (error) {
                console.error('Review failed', error);
                const errorEl = document.getElementById('error-msg');
                if (errorEl) {
                    errorEl.textContent = error.message || 'Failed to submit review';
                    errorEl.classList.remove('hidden');
                }

                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }

    function updateStars() {
        document.querySelectorAll('.star-btn').forEach(btn => {
            const val = parseInt(btn.dataset.value);
            const icon = btn.querySelector('span');
            if (val <= rating) {
                icon.classList.add('icon-filled', 'text-yellow-400');
                icon.classList.remove('text-gray-300', 'dark:text-white/20');
            } else {
                icon.classList.remove('icon-filled', 'text-yellow-400');
                icon.classList.add('text-gray-300', 'dark:text-white/20');
            }
        });
    }

    function validate() {
        const comment = document.getElementById('review-comment')?.value || '';
        const btn = document.getElementById('submit-review');
        const isValid = rating >= 1 && comment.length >= 10;

        if (isValid) {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    setTimeout(() => {
        if (!listingData) loadData();
        else initEvents();
    }, 50);

    function render() {
        const container = document.getElementById('write-review-container');
        if (!container) return;

        container.innerHTML = `
          <div class="px-5 py-4">
            <!-- Listing Snippet -->
            <div class="flex items-center gap-4 mb-8 bg-surface-light dark:bg-surface-dark p-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                <div class="h-16 w-16 rounded-xl bg-cover bg-center" style="background-image: url('${listingData.images?.[0]}')"></div>
                <div>
                    <h3 class="text-gray-900 dark:text-white font-bold leading-tight line-clamp-1">${listingData.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400 text-sm">How was your stay?</p>
                </div>
            </div>
            
            <!-- Rating -->
            <div class="flex flex-col items-center gap-2 mb-8">
                <p class="text-gray-900 dark:text-white font-medium mb-1">Rate your experience</p>
                <div class="flex gap-2">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <button class="star-btn p-1 transition-transform hover:scale-110 active:scale-95" data-value="${i}">
                            <span class="material-symbols-outlined text-4xl text-gray-300 dark:text-white/20">star</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <!-- Comment -->
            <div class="mb-6 space-y-2">
                <label for="review-comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Write a review</label>
                <textarea id="review-comment" rows="6" 
                    placeholder="Share your experience..."
                    class="w-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                ></textarea>
                <p class="text-xs text-gray-400 text-right">Min 10 characters</p>
            </div>
            
            <!-- Error -->
            <div id="error-msg" class="hidden p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center"></div>
            
            <!-- Submit -->
            <button id="submit-review" disabled class="w-full flex items-center justify-center h-14 rounded-2xl bg-primary text-background-dark text-base font-bold shadow-lg shadow-primary/25 opacity-50 cursor-not-allowed transition-all hover:bg-primary/90 active:scale-[0.98]">
                Submit Review
            </button>
          </div>
        `;

        initEvents();
    }

    return `
    <div class="min-h-screen pb-20 bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div class="flex items-center px-4 py-3">
          <button data-back class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mr-2">
            <span class="material-symbols-outlined text-gray-900 dark:text-white">close</span>
          </button>
          <h1 class="text-lg font-bold text-gray-900 dark:text-white">Write a Review</h1>
        </div>
      </header>
      
      <div id="write-review-container">
        <!-- Loading Skeleton -->
        <div class="px-5 py-4 animate-pulse">
            <div class="h-24 bg-gray-200 dark:bg-surface-dark rounded-2xl mb-8"></div>
            <div class="flex justify-center gap-2 mb-8">
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-surface-dark"></div>
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-surface-dark"></div>
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-surface-dark"></div>
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-surface-dark"></div>
                <div class="h-10 w-10 rounded-full bg-gray-200 dark:bg-surface-dark"></div>
            </div>
            <div class="h-40 bg-gray-200 dark:bg-surface-dark rounded-2xl mb-6"></div>
            <div class="h-14 bg-gray-200 dark:bg-surface-dark rounded-2xl"></div>
        </div>
      </div>
    </div>
    `;
}
