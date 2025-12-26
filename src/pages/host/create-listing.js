/**
 * Create Listing Page
 */
import { listings } from '../../api.js';
import { waitForElement } from '../../lib/dom.js';

export function createListingPage() {
    let formData = {
        title: '',
        description: '',
        price: '',
        type: 'TENT',
        location: '',
        province: 'AB',
        maxGuests: 4,
        amenities: [],
        images: []
    };

    // Add logic to handle image URL input (temporary until real upload)

    function render() {
        const container = document.getElementById('create-listing-container');
        if (!container) return;

        container.innerHTML = `
            <div class="px-5 py-6 pb-24">
                <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Listing</h1>
                
                <form id="create-listing-form" class="space-y-6">
                    <!-- Title & Desc -->
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input type="text" name="title" required minlength="5" placeholder="Cozy Cabin by the Lake" 
                                class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                value="${formData.title}">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea name="description" required minlength="20" rows="4" placeholder="Describe your spot..." 
                                class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50">${formData.description}</textarea>
                        </div>
                    </div>
                    
                    <!-- Type & Price -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                            <select name="type" class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50">
                                <option value="TENT" ${formData.type === 'TENT' ? 'selected' : ''}>Tent Site</option>
                                <option value="CABIN" ${formData.type === 'CABIN' ? 'selected' : ''}>Cabin</option>
                                <option value="RV_SPOT" ${formData.type === 'RV_SPOT' ? 'selected' : ''}>RV Spot</option>
                                <option value="GLAMPING" ${formData.type === 'GLAMPING' ? 'selected' : ''}>Glamping</option>
                                <option value="BACKCOUNTRY" ${formData.type === 'BACKCOUNTRY' ? 'selected' : ''}>Backcountry</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Price / Night</label>
                            <input type="number" name="price" required min="1" placeholder="50" 
                                class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                value="${formData.price}">
                        </div>
                    </div>
                    
                    <!-- Location -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Location (City/Area)</label>
                            <input type="text" name="location" required minlength="3" placeholder="Canmore" 
                                class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                                value="${formData.location}">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Province</label>
                            <select name="province" class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50">
                                <option value="AB" ${formData.province === 'AB' ? 'selected' : ''}>Alberta</option>
                                <option value="BC" ${formData.province === 'BC' ? 'selected' : ''}>British Columbia</option>
                                <option value="ON" ${formData.province === 'ON' ? 'selected' : ''}>Ontario</option>
                                <option value="QC" ${formData.province === 'QC' ? 'selected' : ''}>Quebec</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Guests -->
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Max Guests</label>
                        <input type="number" name="maxGuests" required min="1" max="20" placeholder="4" 
                            class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                            value="${formData.maxGuests}">
                    </div>
                    
                    <!-- Image URL (Temp) -->
                    <div>
                        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                        <input type="url" name="imageUrl" required placeholder="https://..." 
                            class="w-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50"
                            value="${formData.images[0] || ''}">
                        <p class="text-xs text-gray-500 mt-1">Paste a valid image URL (e.g. from Unsplash)</p>
                    </div>
                    
                    <!-- Error Msg -->
                    <div id="form-error" class="hidden p-3 rounded-xl bg-red-500/10 text-red-500 text-sm text-center"></div>

                    <!-- Submit -->
                    <button type="submit" id="submit-btn" class="w-full bg-primary text-background-dark font-bold text-lg py-4 rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]">
                        Publish Listing
                    </button>
                </form>
            </div>
        `;

        attachListeners();
    }

    function attachListeners() {
        // Form inputs
        const form = document.getElementById('create-listing-form');
        if (!form) return;

        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.name === 'imageUrl') {
                    formData.images = [e.target.value];
                } else {
                    formData[e.target.name] = e.target.value;
                }
            });
        });

        // Submit
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;

            // Basic validation
            if (!formData.title || !formData.price || formData.images.length === 0) {
                showError('Please fill in all required fields');
                return;
            }

            // Format data
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                maxGuests: parseInt(formData.maxGuests),
                // Hardcode coords for now or randomize slightly around Banff
                latitude: 51.1784 + (Math.random() - 0.5) * 0.1,
                longitude: -115.5708 + (Math.random() - 0.5) * 0.1,
                amenities: ['Wifi', 'Parking', 'Fire Pit'] // Default amenities
            };

            try {
                btn.disabled = true;
                btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span>';

                await listings.create(payload);

                // Success
                window.location.hash = '/host/dashboard';

            } catch (err) {
                console.error(err);
                showError(err.message || 'Failed to create listing');
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }

    function showError(msg) {
        const el = document.getElementById('form-error');
        if (el) {
            el.textContent = msg;
            el.classList.remove('hidden');
        }
    }

    waitForElement('#create-listing-container')
        .then(() => render())
        .catch(err => {
            console.error('Failed to initialize create page:', err);
            let container = document.getElementById('create-listing-container');
            if (!container) {
                // Create fallback container if original is missing
                container = document.createElement('div');
                container.id = 'create-listing-container';
                // Append to main app container if possible, or body
                const app = document.getElementById('app');
                if (app) app.appendChild(container);
                else document.body.appendChild(container);
            }

            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                    <p class="text-gray-400">Failed to load page</p>
                    <button id="retry-create-btn" class="mt-4 text-primary font-semibold">Retry</button>
                </div>
            `;

            const retryBtn = container.querySelector('#retry-create-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => window.location.reload());
            }
        });

    return `
    <div class="min-h-screen bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div class="flex items-center px-4 py-3">
          <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mr-2">
            <span class="material-symbols-outlined text-gray-900 dark:text-white">arrow_back</span>
          </button>
          <h1 class="text-lg font-bold text-gray-900 dark:text-white">New Listing</h1>
        </div>
      </header>
      
      <div id="create-listing-container">
        <div class="flex justify-center p-12">
            <span class="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
        </div>
      </div>
    </div>
    `;
}
