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
import { searchPage } from './pages/search.js';
import { listingDetailsPage } from './pages/listing-details.js';
import { datePickerPage } from './pages/booking/date-picker.js';
import { guestSelectorPage } from './pages/booking/guest-selector.js';
import { priceBreakdownPage } from './pages/booking/price-breakdown.js';
import { confirmationPage } from './pages/booking/confirmation.js';
import { profilePage } from './pages/profile.js';
import { settingsPage } from './pages/settings.js';

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
  .register('/search', searchPage)
  .register('/listing/:id', listingDetailsPage)

  // Booking Flow
  .register('/booking/dates', datePickerPage)
  .register('/booking/guests', guestSelectorPage)
  .register('/booking/price', priceBreakdownPage)
  .register('/booking/confirmation', confirmationPage)

  // Profile & Settings
  .register('/profile', profilePage)
  .register('/settings', settingsPage);

// Register service worker for PWA support  
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('SW registered: ', registration);
      },
      (error) => {
        console.log('SW registration failed: ', error);
      }
    );
  });
}

// Detect if app is running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.body.classList.add('pwa-installed');
}

console.log('🏕️ CampBnB PWA initialized');
