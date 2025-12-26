/**
 * Onboarding Intro Card 2 - Discover Nature's Best Kept Secrets
 */
export function intro2Page() {
  return `
    <div class="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-background-dark">
      <!-- Full Bleed Background Image -->
      <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center" 
           style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLIL84DlC9a1vIA3T7pNzD5kz-G7-LC-0Dr-DHdod_-wKwhGMkcqebLXlUby3q42kCBJBy9imp7sExWuFIYyb_KFOohbRY6cF6_5-B4i5-RbCNfn4YUD-xJDvhXwbCiaDQWSxVGPodv7LDRVJc8Ns3oXNxLvS1YyHpZOQ2KEJNgEObEuxIWah3FhV2Pr2eosH3tS7Ry7SZNCkdUDY31i9DU0VgxCsc3QhJveunUpWhV-Bp9qLJGLe78-ZF3S9PXRu4BfPYzMA238mB');">
      </div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/80 to-transparent opacity-90"></div>
      
      <!-- Top Bar: Skip Action -->
      <div class="relative z-10 flex w-full items-center justify-end p-6 pt-14">
        <button data-navigate="/onboarding/3" class="group flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold tracking-wide text-white/90 transition-all hover:bg-white/10 active:scale-95">
          Skip
        </button>
      </div>
      
      <!-- Bottom Content Area -->
      <div class="relative z-10 flex w-full flex-col gap-8 p-6 pb-12">
        <!-- Text Content -->
        <div class="flex flex-col gap-4">
          <h1 class="text-left text-4xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-sm">
            Discover Nature's <br/>
            <span class="text-primary">Best Kept Secrets</span>
          </h1>
          <p class="max-w-[90%] text-left text-lg font-medium leading-relaxed text-gray-200/90">
            From rustic cabins in the Yukon to lakeside spots in Ontario, find the perfect eco-friendly escape.
          </p>
        </div>
        
        <!-- Navigation Controls -->
        <div class="flex items-center justify-between pt-2">
          <!-- Progress Indicators -->
          <div class="flex items-center gap-2">
            <div class="h-1.5 w-8 rounded-full bg-white/20 transition-all duration-300"></div>
            <div class="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(17,212,82,0.6)] transition-all duration-300"></div>
            <div class="h-1.5 w-8 rounded-full bg-white/20 transition-all duration-300"></div>
          </div>
          
          <!-- Primary Floating Action Button -->
          <button data-navigate="/onboarding/3" class="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background-dark shadow-[0_8px_20px_rgba(17,212,82,0.3)] transition-all duration-300 hover:bg-[#0ebf49] hover:shadow-[0_10px_25px_rgba(17,212,82,0.4)] active:scale-95 active:shadow-sm">
            <span class="material-symbols-outlined text-[32px] font-bold">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
