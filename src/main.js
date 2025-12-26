/**
 * CampBnB PWA - Main Entry Point
 */
import './styles/index.css';
import { router } from './router.js';

// Import Pages
import { intro1Page } from './pages/onboarding/intro1.js';
import { intro2Page } from './pages/onboarding/intro2.js';
import { intro3Page } from './pages/onboarding/intro3.js';
import { signinPage } from './pages/auth/signin.js';
import { signupPage } from './pages/auth/signup.js';
import { forgotPasswordPage } from './pages/auth/forgot-password.js';
import { homePage } from './pages/home.js';
import { mapPage } from './pages/map.js';
import { searchPage } from './pages/search.js';
import { listingDetailsPage } from './pages/listing-details.js';
import { datePickerPage } from './pages/booking/date-picker.js';
import { guestSelectorPage } from './pages/booking/guest-selector.js';
import { priceBreakdownPage } from './pages/booking/price-breakdown.js';
import { confirmationPage } from './pages/booking/confirmation.js';
import { profilePage } from './pages/profile.js';
import { settingsPage } from './pages/settings.js';
import { writeReviewPage } from './pages/write-review.js';
import { hostDashboardPage } from './pages/host/dashboard.js';
import { createListingPage } from './pages/host/create-listing.js';

// Register all routes
router
  // Onboarding
  .register('/', intro1Page)
  .register('/onboarding/1', intro1Page)
  .register('/onboarding/2', intro2Page)
  .register('/onboarding/3', intro3Page)

  // Authentication
  .register('/signin', signinPage)
  .register('/signup', signupPage)
  .register('/forgot-password', forgotPasswordPage)

  // Main App
  .register('/home', homePage)
  .register('/map', mapPage)
  .register('/search', searchPage)
  .register('/listing/:id', listingDetailsPage)

  // Booking Flow
  .register('/booking/dates', datePickerPage)
  .register('/booking/guests', guestSelectorPage)
  .register('/booking/price', priceBreakdownPage)
  .register('/booking/confirmation', confirmationPage)

  // Profile & Settings
  .register('/profile', profilePage)
  .register('/trips', () => import('./pages/trips.js').then(m => m.tripsPage()))
  .register('/saved', () => import('./pages/saved.js').then(m => m.savedPage()))
  .register('/settings', settingsPage)
  .register('/host/dashboard', hostDashboardPage)
  .register('/host/listings/new', createListingPage)
  .register('/host/listings/:id', (params) => import('./pages/host/edit-listing.js').then(m => m.editListingPage(params)))
  .register('/host/bookings', () => import('./pages/host/bookings.js').then(m => m.hostBookingsPage()));

// Register service worker for PWA support (production only)
// vite-plugin-pwa generates sw.js only in production builds
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  });
}

// Detect if app is running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.body.classList.add('pwa-installed');
}

console.log('🏕️ CampBnB PWA initialized');

