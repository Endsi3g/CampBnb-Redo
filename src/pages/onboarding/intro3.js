/**
 * Onboarding Intro Card 3 - Adventure Awaits (Final with Get Started)
 */
export function intro3Page() {
  return `
    <div class="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark">
      <!-- Full Bleed Background Image -->
      <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0OVE0mb6WHcLLsBwZxE4FO6XyGjb4yTw7Gg7UEHDxujDpPJzepZ1_W5O0JX3uACvtueTCaI-TNfPikutaRuR0Jy8VXPAyXQGpaPapwpnwF0zND7eWd9FBMDNkcAJlq1hURxD9j22cdpjWnuZnai7OC76f2zww40Kikzh2UtGW93sxgh_Xz2QuTTD0havSBcvCaAEuvLdoU0mQ49sUMe4pJbyXmHtYiytDB6uYaaYZeAvKlk3euuuLKrW3hg5oT6J_ZiLmoFLI_mol');">
      </div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/80 to-transparent opacity-90"></div>
      
      <!-- Content Container -->
      <div class="relative z-20 flex h-full flex-col justify-end px-6 pb-8">
        <!-- Text Content -->
        <div class="flex flex-col items-center text-center mb-8">
          <h1 class="mb-4 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
            Adventure Awaits
          </h1>
          <p class="max-w-[280px] text-base font-medium leading-relaxed text-gray-300">
            Discover unique stays and experiences across the Great White North.
          </p>
        </div>
        
        <!-- Progress Indicators -->
        <div class="flex w-full flex-row items-center justify-center gap-3 py-6">
          <div class="h-2 w-2 rounded-full bg-white/20 transition-colors"></div>
          <div class="h-2 w-2 rounded-full bg-white/20 transition-colors"></div>
          <div class="h-2 w-6 rounded-full bg-primary shadow-[0_0_10px_rgba(17,212,82,0.5)]"></div>
        </div>
        
        <!-- Action Buttons -->
        <div class="mt-4 flex flex-col gap-4 animate-fade-in-up">
          <button data-navigate="/home" class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary h-14 px-5 text-background-dark text-lg font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 transition-transform active:scale-95 hover:bg-[#0fc24a]">
            <span class="truncate">Get Started</span>
          </button>
          <button data-navigate="/signin" class="flex w-full cursor-pointer items-center justify-center rounded-full bg-transparent py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
            Log In
          </button>
        </div>
        
        <div class="h-8 w-full"></div>
      </div>
    </div>
  `;
}
