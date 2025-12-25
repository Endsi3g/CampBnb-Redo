/**
 * Settings Page
 */
export function settingsPage() {
    return `
    <div class="min-h-screen">
      <header class="flex items-center px-4 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-white/5">
        <button data-back class="mr-4 flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-900 dark:text-white">
          <span class="material-symbols-outlined" style="font-size: 24px;">arrow_back</span>
        </button>
        <h2 class="text-xl font-bold">Settings</h2>
      </header>
      
      <main class="p-4 space-y-6">
        <!-- Account Settings -->
        <section>
          <h3 class="text-sm font-bold text-slate-500 dark:text-secondary-text mb-2 px-1 uppercase tracking-wider">Account</h3>
          <div class="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden divide-y divide-slate-100 dark:divide-white/5 shadow-sm">
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">account_circle</span>
              <span class="flex-1 font-medium">Personal Information</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">lock</span>
              <span class="flex-1 font-medium">Change Password</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">credit_card</span>
              <span class="flex-1 font-medium">Payment Methods</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
          </div>
        </section>
        
        <!-- Preferences -->
        <section>
          <h3 class="text-sm font-bold text-slate-500 dark:text-secondary-text mb-2 px-1 uppercase tracking-wider">Preferences</h3>
          <div class="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden divide-y divide-slate-100 dark:divide-white/5 shadow-sm">
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center">
                <span class="material-symbols-outlined text-primary text-xl mr-4">notifications</span>
                <span class="font-medium">Push Notifications</span>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" class="peer sr-only" checked/>
                <div class="h-6 w-11 rounded-full bg-slate-200 dark:bg-white/10 after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-5 after:absolute"></div>
              </label>
            </div>
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center">
                <span class="material-symbols-outlined text-primary text-xl mr-4">dark_mode</span>
                <span class="font-medium">Dark Mode</span>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" class="peer sr-only" checked/>
                <div class="h-6 w-11 rounded-full bg-slate-200 dark:bg-white/10 after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-md after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-5 after:absolute"></div>
              </label>
            </div>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">language</span>
              <span class="flex-1 font-medium">Language</span>
              <span class="text-slate-500 dark:text-slate-400 text-sm mr-2">English</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">currency_exchange</span>
              <span class="flex-1 font-medium">Currency</span>
              <span class="text-slate-500 dark:text-slate-400 text-sm mr-2">CAD</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
          </div>
        </section>
        
        <!-- Support -->
        <section>
          <h3 class="text-sm font-bold text-slate-500 dark:text-secondary-text mb-2 px-1 uppercase tracking-wider">Support</h3>
          <div class="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden divide-y divide-slate-100 dark:divide-white/5 shadow-sm">
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">help</span>
              <span class="flex-1 font-medium">Help Center</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">chat_bubble</span>
              <span class="flex-1 font-medium">Contact Us</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">article</span>
              <span class="flex-1 font-medium">Terms of Service</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
            <a class="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary text-xl mr-4">security</span>
              <span class="flex-1 font-medium">Privacy Policy</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-xl">chevron_right</span>
            </a>
          </div>
        </section>
        
        <!-- Logout -->
        <section>
          <button data-navigate="/onboarding/1" class="w-full flex items-center justify-center gap-3 p-4 text-red-500 font-semibold bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shadow-sm">
            <span class="material-symbols-outlined text-xl">logout</span>
            Log Out
          </button>
        </section>
        
        <!-- App Version -->
        <div class="text-center py-8 text-slate-400 dark:text-slate-500">
          <p class="text-sm font-medium">CampBnB</p>
          <p class="text-xs mt-1">Version 1.0.0</p>
        </div>
      </main>
    </div>
  `;
}
