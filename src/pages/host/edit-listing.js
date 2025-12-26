/**
 * Edit Listing Page
 */
import { listings, isAuthenticated } from '../../api.js';
import { waitForElement } from '../../lib/dom.js';

export function editListingPage(params) {
    if (!isAuthenticated()) {
        window.location.hash = '/signin';
        return;
    }
    const listingId = params?.id;
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

    async function loadData() {
        if (!listingId) return;

        try {
            const listing = await listings.get(listingId);
            formData = {
                ...listing,
                price: listing.price,
                maxGuests: listing.maxGuests,
                // Ensure array fields exist
                amenities: listing.amenities || [],
                images: listing.images || []
            };
            render();
        } catch (e) {
            console.error(e);
            showError('Failed to load listing details');
        }
    }

    function render() {
        const container = document.getElementById('edit-listing-container');
        if (!container) return;

        container.innerHTML = `
            <div class="px-5 py-6 pb-24">
                <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Listing</h1>
                
                <form id="edit-listing-form" class="space-y-6">
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

                    <!-- Actions -->
                    <div class="flex gap-3 pt-4">
                        <button type="button" id="delete-btn" class="flex-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold text-lg py-4 rounded-2xl transition-all active:scale-[0.98]">
                            Delete
                        </button>
                        <button type="submit" id="submit-btn" class="flex-2 bg-primary text-background-dark font-bold text-lg py-4 rounded-2xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        `;

        attachListeners();
    }

    function attachListeners() {
        // Form inputs
        const form = document.getElementById('edit-listing-form');
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

        // Delete
        document.getElementById('delete-btn')?.addEventListener('click', async () => {
            if (!confirm('Are you sure you want to delete this listing?')) return;
            try {
                await listings.delete(listingId);
                window.location.hash = '/host/dashboard';
            } catch (err) {
                showError(err.message || 'Failed to delete listing');
            }
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
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                type: formData.type,
                location: formData.location,
                province: formData.province,
                maxGuests: parseInt(formData.maxGuests),
                amenities: formData.amenities, // Keep existing for now
                images: formData.images,
                latitude: formData.latitude,
                longitude: formData.longitude
            };

            try {
                btn.disabled = true;
                btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span>';

                await listings.update(listingId, payload);

                // Success
                window.location.hash = '/host/dashboard';

            } catch (err) {
                console.error(err);
                showError(err.message || 'Failed to update listing');
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

    waitForElement('#edit-listing-container')
        .then(() => loadData())
        .catch(err => {
            console.error('Failed to initialize edit page:', err);
            // Find or create container in the document body
            let container = document.getElementById('edit-listing-container');
            if (!container) {
                // If container doesn't exist, try to find the parent or use body
                const parent = document.querySelector('.min-h-screen') || document.body;
                container = document.createElement('div');
                container.id = 'edit-listing-container';
                parent.appendChild(container);
            }

            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
                    <p class="text-gray-400">Failed to load editor</p>
                    <button id="retry-edit-btn" class="mt-4 text-primary font-semibold">Retry</button>
                </div>
            `;

            const retryBtn = container.querySelector('#retry-edit-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => window.location.reload());
            }
        });

    return `
    <div class="min-h-screen bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div class="flex items-center px-4 py-3">
          <button onclick="window.location.hash='/host/dashboard'" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors mr-2">
            <span class="material-symbols-outlined text-gray-900 dark:text-white">close</span>
          </button>
          <h1 class="text-lg font-bold text-gray-900 dark:text-white">Edit Listing</h1>
        </div>
      </header>
      
      <div id="edit-listing-container">
        <div class="flex justify-center p-12">
            <span class="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
        </div>
      </div>
    </div>
    `;
}
