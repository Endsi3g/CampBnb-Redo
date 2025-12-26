/**
 * Map Page
 * Visualizes listings on a map
 */
import { bottomNav } from '../components/bottom-nav.js';
import { listings } from '../api.js';
import { waitForElement, escapeHtml } from '../lib/dom.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

let mapInstance = null;

export async function mapPage() {
    // Load listings
    let allListings = [];
    try {
        const response = await listings.search({ limit: 50 });
        allListings = response.data || response || [];
    } catch (error) {
        console.error('Failed to load listings for map', error);
    }

    // Initialize map when DOM is ready
    waitForElement('#map').then(() => {
        initMap(allListings);
    });

    return `
    <div class="relative flex h-full min-h-screen w-full flex-col">
      <!-- Header -->
      <div class="absolute top-0 left-0 w-full z-[1000] p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
         <h1 class="text-2xl font-bold tracking-tight text-white drop-shadow-md">Explore Map</h1>
      </div>

      <!-- Map Container -->
      <div id="map" class="w-full flex-1 bg-gray-800 z-0"></div>

      ${bottomNav('map')}
    </div>
  `;
}


function initMap(mapListings) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Cleanup existing instance
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }

    // Default center: Banff coordinates
    const mapCenter = [51.1784, -115.5708];

    mapInstance = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView(mapCenter, 5);

    // Add Dark Mode Tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(mapInstance);

    // Add markers
    mapListings.forEach(listing => {
        // Use latitude/longitude from DB or fallback to coordinates object if legacy
        let lat = listing.latitude;
        let lng = listing.longitude;

        if (typeof lat === 'undefined' || typeof lng === 'undefined') {
            if (listing.coordinates) {
                lat = listing.coordinates.lat;
                lng = listing.coordinates.lng;
            }
        }

        if (!lat || !lng) return;

        const title = escapeHtml(listing.title);
        const price = escapeHtml(listing.price);
        const image = listing.images?.[0] || ''; // URL, assumes trusted source or handled by browser image standard

        // Custom popup
        const popupContent = `
            <div class="flex flex-col gap-2 min-w-[200px]">
                <div class="w-full aspect-video bg-cover bg-center rounded-lg" style="background-image: url('${image.replace(/'/g, "\\'")}')"></div>
                <div>
                    <h3 class="font-bold text-gray-900 leading-tight">${title}</h3>
                    <p class="text-primary font-bold">$${price} <span class="text-gray-500 font-normal">/ night</span></p>
                </div>
                <button data-navigate="/listing/${listing.id}" class="w-full bg-primary text-white py-1.5 rounded-lg text-sm font-semibold mt-1">View</button>
            </div>
        `;

        const marker = L.marker([lat, lng])
            .addTo(mapInstance)
            .bindPopup(popupContent, {
                className: 'custom-popup',
                closeButton: false
            });

        // Scoped event handling
        marker.on('popupopen', (e) => {
            const popupNode = e.popup.getElement();
            if (popupNode) {
                popupNode.querySelectorAll('[data-navigate]').forEach(el => {
                    el.onclick = (evt) => {
                        evt.preventDefault();
                        window.location.hash = el.dataset.navigate;
                    };
                });
            }
        });
    });
}
