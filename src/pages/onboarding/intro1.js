/**
 * Onboarding Intro Card 1 - Find your next outdoor escape
 */
export function intro1Page() {
  return `
    <div class="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden">
      <!-- Full-Bleed Background Image -->
      <div class="absolute inset-0 z-0">
        <div class="h-full w-full bg-center bg-no-repeat bg-cover transform scale-105" 
             style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBo2UOtiCMp4vU2Z_iyKcc6FjxwQZJe225RIj62tCiNRJPL1WGv1WzBaNvIkzejOnvqM0bj4Yf_d2P9i-2dYbwFApelMAr0QPbDwkV6A1-_obyY9eTEqV8slk0HRDjpRUxDz9ZsSU8XWRY9HJjNQQb0rkUnSGTkpyZgQiAvaod1zcLTkkRaAvXMlg5BYXmuKwy8dwzko-OqsoY6gG1MVJ2WrkYNAK38QUhKUky0LUvCPuKgewlMTrxalFMHr7xmV-qBC-CSif06qQjn");'>
        </div>
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80');"></div>
        <div class="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-background-dark"></div>
        <div class="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/80 to-transparent opacity-90"></div>
      </div>
      
      <!-- Top Navigation Area -->
      <div class="relative z-20 flex w-full justify-end px-6 pt-14">
        <button data-navigate="/onboarding/2" class="rounded-full bg-black/20 backdrop-blur-md px-4 py-2 text-sm font-semibold text-white/90 hover:bg-black/40 hover:text-white transition-all active:scale-95 border border-white/10">
          Skip
        </button>
      </div>
      
      <!-- Bottom Content Area -->
      <div class="relative z-20 mt-auto flex flex-col px-6 pb-12 pt-6 w-full max-w-md mx-auto">
        <h1 class="text-white tracking-tight text-[40px] font-extrabold leading-[1.1] text-left pb-4 drop-shadow-sm">
          Find your next <br/>
          <span class="text-primary">outdoor escape</span>
        </h1>
        
        <p class="text-gray-200 text-[17px] font-normal leading-relaxed pb-8 text-left max-w-[90%]">
          Discover unique campsites and cabins across Canada. From rustic cabins to backcountry sites, explore the best stays.
        </p>
        
        <!-- Interactive Footer Row -->
        <div class="flex w-full items-center justify-between">
          <!-- Page Indicators -->
          <div class="flex flex-row items-center gap-2">
            <div class="h-2 w-8 rounded-full bg-primary shadow-[0_0_12px_rgba(17,212,82,0.4)]"></div>
            <div class="h-2 w-2 rounded-full bg-white/30"></div>
            <div class="h-2 w-2 rounded-full bg-white/30"></div>
          </div>
          
          <!-- Next Button -->
          <button data-navigate="/onboarding/2" class="flex min-w-[110px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 px-6 bg-primary text-[#0d1b12] text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 hover:bg-[#15e05a] hover:shadow-primary/40 active:scale-95 transition-all">
            <span>Next</span>
            <span class="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
          </button>
        </div>
        
        <div class="h-2"></div>
      </div>
    </div>
  `;
}
