/**
 * Bottom Navigation Component
 * @param {string} active - Active tab: 'explore' | 'saved' | 'trips' | 'profile'
 */
export function bottomNav(active = 'explore') {
    const tabs = [
        { id: 'explore', icon: 'explore', label: 'Explore', route: '/home' },
        { id: 'saved', icon: 'favorite', label: 'Saved', route: '/profile' },
        { id: 'trips', icon: 'luggage', label: 'Trips', route: '/profile' },
        { id: 'profile', icon: 'account_circle', label: 'Profile', route: '/profile' },
    ];

    return `
    <div class="fixed bottom-0 left-0 w-full z-50">
      <div class="absolute inset-0 bg-background-dark/80 backdrop-blur-lg border-t border-white/5"></div>
      <div class="relative flex justify-around items-center h-[88px] pb-6 px-2">
        ${tabs.map(tab => `
          <button data-navigate="${tab.route}" class="flex flex-col items-center justify-center w-full gap-1 ${active === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-300'} transition-colors">
            <span class="material-symbols-outlined text-[28px] ${active === tab.id ? 'icon-filled' : ''}">${tab.icon}</span>
            <span class="text-[10px] font-medium">${tab.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
