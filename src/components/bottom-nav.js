/**
 * Bottom Navigation Component
 */
export function bottomNav(activeTab) {
  const tabs = [
    { icon: 'explore', label: 'Explore', href: '/home', id: 'home' },
    { icon: 'map', label: 'Map', href: '/map', id: 'map' },
    { icon: 'favorite', label: 'Saved', href: '/saved', id: 'saved' },
    { icon: 'calendar_month', label: 'Trips', href: '/trips', id: 'trips' },
    { icon: 'account_circle', label: 'Profile', href: '/profile', id: 'profile' }
  ];

  return `
    <nav class="fixed bottom-0 left-0 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-white/5 pb-safe-bottom z-50 transition-transform duration-300">
      <div class="flex justify-around items-center px-2 py-3">
        ${tabs.map(tab => {
    // Determine active state - 'profile' is active for saved/trips too if we are in profile page
    // But we can be more specific if we want, or just stick to 'profile' highlighting
    // For now, if activeTab is 'profile', we highlight profile.
    // But if we are in 'saved' tab, we might want to highlight 'saved'.
    // The current implementation of profile passes 'profile' as activeTab.
    // Let's rely on the passed activeTab.

    const isActive = tab.id === activeTab;

    return `
            <button data-navigate="${tab.href}" class="flex flex-col items-center gap-1 min-w-[64px] group opacity-100">
              <span class="material-symbols-outlined text-[26px] transition-all duration-300 ${isActive ? 'text-primary icon-filled scale-110 drop-shadow-[0_0_12px_rgba(17,212,82,0.4)]' : 'text-slate-400 group-hover:text-primary/70'}">
                ${tab.icon}
              </span>
              <span class="text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-primary/70'}">
                ${tab.label}
              </span>
            </button>
            `;
  }).join('')}
      </div>
    </nav>
    <script>
      // Re-attach navigation listeners if needed (though usually handled by page)
      // This is just a string return, so the page must handle it
    </script>
    `;
}
