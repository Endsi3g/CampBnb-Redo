/**
 * Listing Details Page
 */
export function listingDetailsPage(params = {}) {
    return `
    <div class="relative flex flex-col min-h-screen w-full pb-24">
      <!-- Hero Section with Image -->
      <div class="relative w-full h-[55vh] shrink-0">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFqdK1y4mtadD2w9Ut04Ypjz3xfMqfHFbf8FCzk2pFv_Dhcxs13EtA0zp-7nFVkhXFnF5iaat_VfUbEsqdL7wyXXmaFHsK-zJ-WHdUwHGSb_tRld6TyV_I4ainXjnW1DgSVrCyDkiEH9OUtOqjXUehbpeRrUyNCQn2atLnZmlf1mMSrFDj3wzzg0K3zCrx4Z5oOoij0uVZ0N1ChowtHwN-T5xe73BnDJ6TSn-vrEWe4NdHosGrzLMkfjWwPZQVWen13sb6cFV9Pefa');"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-dark"></div>
        
        <!-- Top Navigation -->
        <div class="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-20">
          <button data-back class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex gap-3">
            <button class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors">
              <span class="material-symbols-outlined">ios_share</span>
            </button>
            <button class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors group">
              <span class="material-symbols-outlined group-active:text-primary transition-colors">favorite</span>
            </button>
          </div>
        </div>
        
        <!-- Listing Header Content -->
        <div class="absolute bottom-0 left-0 right-0 p-5 pb-2 z-10 flex flex-col gap-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-1 rounded-full bg-primary/90 text-background-dark text-xs font-bold tracking-wide uppercase shadow-lg">Superhost</span>
            <div class="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
              <span class="material-symbols-outlined text-primary text-[16px] icon-filled">star</span>
              <span class="text-sm font-semibold text-white">4.95</span>
              <span class="text-xs text-gray-300">(128)</span>
            </div>
          </div>
          <h1 class="text-3xl font-bold text-white leading-tight shadow-sm">The Whispering Pines A-Frame</h1>
          <div class="flex items-center gap-1 text-gray-200">
            <span class="material-symbols-outlined text-[18px]">location_on</span>
            <span class="text-sm font-medium">Muskoka, Ontario, Canada</span>
          </div>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="flex flex-col px-5 pt-6 gap-8">
        <!-- Amenities Section -->
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-end">
            <h2 class="text-xl font-bold text-white">Amenities</h2>
            <a class="text-primary text-sm font-semibold hover:underline cursor-pointer">View all</a>
          </div>
          <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5">
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">local_fire_department</span>
              </div>
              <span class="text-xs text-gray-300 font-medium">Fire pit</span>
            </div>
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">wifi</span>
              </div>
              <span class="text-xs text-gray-300 font-medium">Fast Wifi</span>
            </div>
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">water</span>
              </div>
              <span class="text-xs text-gray-300 font-medium">Lake access</span>
            </div>
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">pets</span>
              </div>
              <span class="text-xs text-gray-300 font-medium">Pet friendly</span>
            </div>
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="size-16 rounded-2xl bg-[#1E2E23] flex items-center justify-center border border-white/5">
                <span class="material-symbols-outlined text-primary text-3xl">kitchen</span>
              </div>
              <span class="text-xs text-gray-300 font-medium">Kitchen</span>
            </div>
          </div>
        </div>
        
        <div class="h-px bg-white/10 w-full"></div>
        
        <!-- Description -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3 mb-1">
            <div class="size-10 rounded-full bg-gray-600 overflow-hidden shrink-0">
              <img alt="Host" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi2Ykyg2hD9LAGlHiru0qcoz79dkixhEEO9O0VWXuHTP7SQh-0BM0VAmTgBJDUE9UaV9xa8EJ2t8CftPRFcIXNksDR9OiDewf7tQr3a_JmKEhZ6fj2yJr6kYGmqT-JFXKWBJHJPludkj4fFCaMYyk74OOcHxHLdMAH4upJcrgsNhjv0NDNVyMy7sOTKao-F63vYMboy3TXAtTRr_PvHNEhQK9pHQr84mPKAr9ds-oPOMcKeY6r7pM5aeGUs9GZ_Bx20HQtA4uM1uYa"/>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">Hosted by Sarah</span>
              <span class="text-xs text-secondary-text">Joined May 2019</span>
            </div>
          </div>
          <h2 class="text-xl font-bold text-white">About this place</h2>
          <p class="text-gray-300 text-base leading-relaxed line-clamp-4">
            Escape to this cozy, eco-friendly retreat nestled in the heart of Muskoka. The Whispering Pines A-Frame offers a serene getaway with modern comforts and rustic charm. Wake up to the sound of birds, enjoy your morning coffee by the private dock, and spend your evenings stargazing by the fire pit. Perfect for couples or solo adventurers looking to reconnect with nature.
          </p>
          <button class="flex items-center gap-1 text-primary font-bold text-sm self-start hover:underline">
            Read more <span class="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>
        
        <!-- Map Section -->
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold text-white">Where you'll be</h2>
          <div class="w-full h-48 rounded-2xl overflow-hidden relative bg-gray-800">
            <div class="w-full h-full bg-cover bg-center opacity-80" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc9ZcacsjuVdscNEmT0PGuiWxuxNGgxisTRT8ZHeWK0NwxhGiqZNgFghxJVMf8NwTSwyf9eNitFPXCGCowYWaVYg9TNXDzd5kkHcThtdDVzNFXytiukRljgLmBFjl_XqhGB0oKI_EEBS36h9f63d7qTQVBsfoLgqF9Br5euJYAwIrws1AcDKH4hmIoNuk2tIq7KHL5TjqN8BeuSbrqM-998nwxaeM0V9SR8uPk0jU80BtLsX9sXlipYL0q2p30E8UPBy6qkOoARZ0r');"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div class="size-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <div class="size-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div class="flex flex-col">
              <span class="font-bold text-white">Muskoka Lakes</span>
              <span class="text-sm text-gray-400">Ontario, Canada</span>
            </div>
          </div>
        </div>
        
        <!-- Reviews Snippet -->
        <div class="flex flex-col gap-4 pb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary icon-filled">star</span>
            <h2 class="text-xl font-bold text-white">4.95 <span class="text-gray-400 font-normal text-lg">(128 reviews)</span></h2>
          </div>
          <div class="flex overflow-x-auto gap-4 scrollbar-hide -mx-5 px-5 pb-4">
            <!-- Review Card 1 -->
            <div class="min-w-[280px] p-4 rounded-xl bg-[#1E2E23] border border-white/5 flex flex-col gap-3">
              <div class="flex gap-3 items-center">
                <div class="size-10 rounded-full bg-gray-500 overflow-hidden">
                  <img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC1PecBzJD6Da9_jAo2kGwIHtz9lJi8-IiiHChiRQhe7am3B7KZA3pEE6S3oEHL2eoiE0bKsB7nPsWV0e33czke_xcLP_9Anza9VEoCaWdVRknhEqxhzfquT6CzxsDXrH98ZDIQhyXoW0ez4DjUHiKS3dJL30YuL1hN1_gz_bmK1ER-X6IbPqRcZBqphjc7r8Id4RO8ozY-tGeaMolQ8-RIaAV_b2-ejEDODtPeIe4IHDM5_111khhhg8TZ1ttsu2rDlHyzv19Sb2R"/>
                </div>
                <div>
                  <div class="font-bold text-white text-sm">James</div>
                  <div class="text-xs text-gray-400">October 2023</div>
                </div>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">
                Absolutely stunning location. The cabin was exactly as described, super clean and cozy. We loved the fire pit!
              </p>
            </div>
            <!-- Review Card 2 -->
            <div class="min-w-[280px] p-4 rounded-xl bg-[#1E2E23] border border-white/5 flex flex-col gap-3">
              <div class="flex gap-3 items-center">
                <div class="size-10 rounded-full bg-gray-500 overflow-hidden">
                  <img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH-ZjEeTtQlCCliK11cuAjgd9U7ppaOpM5A0O3VoTG3OuNs6A9z1b9CFgmYUqpJGRmSUyl3ZwdVfKgGo2JAuhE6KSL6LdQdRg17Xtu8C0pJaic7kGGI4_DLVOPiJBphpOPRSsbSqGlxRqjMbigbLE-mLhcFzT8P2mKksa0iJm3ZZVZzjNrT7JNs8fXNjPAtQPGikRRzTIrMJHdIWbes8FtdoRg9UNTLOEXZ2xITghTgkgB15otwsooy4MpRZ2uCg0yx5-hSGFB2pU3"/>
                </div>
                <div>
                  <div class="font-bold text-white text-sm">Elena</div>
                  <div class="text-xs text-gray-400">September 2023</div>
                </div>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed line-clamp-3">
                A perfect weekend getaway. The host was very responsive and the amenities were top notch.
              </p>
            </div>
          </div>
          <button class="w-full py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
            Show all 128 reviews
          </button>
        </div>
        
        <div class="h-8"></div>
      </div>
      
      <!-- Sticky Bottom Bar -->
      <div class="fixed bottom-0 left-0 right-0 bg-[#102216]/95 backdrop-blur-lg border-t border-white/5 px-5 py-4 z-50 safe-pb">
        <div class="flex items-center justify-between max-w-lg mx-auto w-full">
          <div class="flex flex-col">
            <div class="flex items-end gap-1">
              <span class="text-xl font-bold text-white">$145</span>
              <span class="text-sm text-gray-400 font-medium mb-1">CAD / night</span>
            </div>
            <span class="text-xs text-secondary-text underline decoration-secondary-text/50">Oct 12 - 17</span>
          </div>
          <button data-navigate="/booking/dates" class="bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  `;
}
