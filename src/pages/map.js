/**
 * Map Page
 * Visualizes listings on a map
 */
import { bottomNav } from '../components/bottom-nav.js';
import { listings } from '../api.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite/Webpack
// See: https://github.com/Leaflet/Leaflet/issues/4968
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
        const response = await listings.search({ limit: 50 }); // Fetch more for map
        allListings = response.data || response || [];
    } catch (error) {
        console.error('Failed to load listings for map', error);
    }

    // Defer map initialization until after DOM update
    setTimeout(() => {
        initMap(allListings);
    }, 100);

    return `
    <div class="relative flex h-full min-h-screen w-full flex-col">
      <!-- Header -->
      <div class="absolute top-0 left-0 w-full z-1000 p-4 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
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

    // Default center (Canadaish) or first listing
    const center = mapListings.length > 0 && mapListings[0].coordinates
        ? [mapListings[0].coordinates.lat, mapListings[0].coordinates.lng]
        : [51.505, -0.09]; // Fallback if no data (London) or user location? Let's use Banff coordinates approx

    // Banff coordinates: 51.1784, -115.5708
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
        if (!listing.coordinates) return;

        const { lat, lng } = listing.coordinates;

        // Custom popup
        const popupContent = `
            <div class="flex flex-col gap-2 min-w-[200px]">
                <div class="w-full aspect-video bg-cover bg-center rounded-lg" style="background-image: url('${listing.images?.[0] || ''}')"></div>
                <div>
                    <h3 class="font-bold text-gray-900 leading-tight">${listing.title}</h3>
                    <p class="text-primary font-bold">$${listing.price} <span class="text-gray-500 font-normal">/ night</span></p>
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

        // Handle navigation from within popup (Leaflet intercepts clicks, need dirty hack or event delegation)
        marker.on('popupopen', () => {
            document.querySelectorAll('[data-navigate]').forEach(el => {
                el.onclick = (e) => {
                    e.preventDefault();
                    window.location.hash = el.dataset.navigate;
                };
            });
        });
    });
}
