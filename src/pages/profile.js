/**
 * Profile & Favorites Page
 */
import { bottomNav } from '../components/bottom-nav.js';

export function profilePage() {
    return `
    <div class="pb-24">
      <header class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div class="flex items-center justify-between px-4 py-3">
          <h1 class="text-xl font-bold tracking-tight">My Profile</h1>
          <button data-navigate="/settings" class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </header>
      
      <section class="px-4 pt-6 pb-2">
        <div class="flex flex-col items-center">
          <div class="relative group">
            <div class="w-28 h-28 rounded-full border-4 border-primary/20 p-1">
              <div class="w-full h-full rounded-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUGQ8D_vpzwRq__wUY8J0w4rgmuM4KPEHwTiokQ1IIs3BwqgOZaelrm7CgeNqltA_FIKcmMjJNrbJEhJoW7uEP9WdDP0nyL-QMnaXclnGRsQs4CMTBhIgpzRr94v0zpZels_flRxTF8MS5WsYk0MVktuejFZbFotY-D8ntaWlLV2eEbF_p1IBgxSwKJMz_bJq4Ge9QOXDdHQ4ghpGNnAI-geZyOJZFAOhPiBl-5m7ajuvVCXCbce6XSMdgVPCh_vk-2i70pxga68gK');"></div>
            </div>
            <button class="absolute bottom-0 right-0 bg-surface-dark border border-white/10 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-background-dark transition-colors">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <div class="mt-4 text-center">
            <h2 class="text-2xl font-bold">Alex B.</h2>
            <div class="flex items-center gap-2 justify-center mt-1">
              <span class="material-symbols-outlined text-primary text-sm icon-filled">verified</span>
              <p class="text-slate-500 dark:text-slate-400 font-medium text-sm">Super Camper • Joined 2021</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="px-4 py-6">
        <div class="flex gap-3">
          <div class="flex-1 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span class="text-2xl font-bold text-slate-900 dark:text-white">12</span>
            <span class="text-xs font-medium text-slate-500 dark:text-primary/80 uppercase tracking-wide mt-1">Trips</span>
          </div>
          <div class="flex-1 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <span class="text-2xl font-bold text-slate-900 dark:text-white">8</span>
            <span class="text-xs font-medium text-slate-500 dark:text-primary/80 uppercase tracking-wide mt-1">Reviews</span>
          </div>
          <div class="flex-1 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
            <div class="flex items-center gap-1">
              <span class="text-2xl font-bold text-slate-900 dark:text-white">24</span>
              <span class="material-symbols-outlined text-primary text-base icon-filled">forest</span>
            </div>
            <span class="text-xs font-medium text-slate-500 dark:text-primary/80 uppercase tracking-wide mt-1">Trees</span>
          </div>
        </div>
      </section>
      
      <!-- Tab Section -->
      <section class="px-4 mb-6 sticky top-[60px] z-40">
        <div class="bg-slate-200 dark:bg-surface-dark p-1 rounded-full flex relative border border-slate-300 dark:border-white/5">
          <button class="flex-1 py-2.5 rounded-full bg-white dark:bg-primary text-slate-900 dark:text-background-dark font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg icon-filled">favorite</span>
            Favorites
          </button>
          <button class="flex-1 py-2.5 rounded-full text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-lg">calendar_month</span>
            Upcoming
          </button>
        </div>
      </section>
      
      <!-- Saved Spots -->
      <section class="mb-8">
        <div class="px-4 mb-3 flex items-center justify-between">
          <h3 class="text-lg font-bold">Saved Spots</h3>
          <a class="text-sm text-primary font-semibold hover:underline cursor-pointer">View all</a>
        </div>
        <div class="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar snap-x snap-mandatory">
          <!-- Card 1 -->
          <div data-navigate="/listing/1" class="snap-center shrink-0 w-[280px] bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm group cursor-pointer">
            <div class="h-44 w-full bg-cover bg-center relative" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDT7wtpC98a-fvWNJiO5kvC5VOQY1NJOiiRYccC9eIztqu4W1DbpI5C1iVrmrLwhby_V1UaeD1F_htxQNcEN5xepiIZYpRpKareUOBnLtIzi6h84AqUaqyq8oTrkJR5gy4UMbI8vye_Lj79EFCDbRB4B4xIlCnIyKu9RzLOSQTyLZAYUmpoI-Z7v4ychJq8JVeYbmrPIbm61ytDUfXXpFy-0E6OLRHaYDu5z0knKjmUGIPNYAoilyY6NG7-extKjVde3D-6HH7ncPJh');">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <button class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-primary hover:bg-black/60 transition-all">
                <span class="material-symbols-outlined text-lg icon-filled">favorite</span>
              </button>
              <div class="absolute bottom-3 left-3">
                <span class="px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-background-dark uppercase tracking-wider">Superhost</span>
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-lg leading-tight text-slate-900 dark:text-white">Banff Lakefront</h4>
                <div class="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-bold text-sm">
                  <span class="material-symbols-outlined text-yellow-400 text-sm icon-filled">star</span>
                  4.9
                </div>
              </div>
              <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-3">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Alberta, Canada
              </div>
              <div class="flex items-center justify-between mt-2 pt-3 border-t border-slate-100 dark:border-white/5">
                <div>
                  <span class="text-lg font-bold text-primary">$120</span>
                  <span class="text-xs text-slate-400">/ night</span>
                </div>
                <button class="text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors">Book</button>
              </div>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div data-navigate="/listing/2" class="snap-center shrink-0 w-[280px] bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-sm group cursor-pointer">
            <div class="h-44 w-full bg-cover bg-center relative" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZEE5vdTcs6L_f4bohVHsFMvjcSY4t-NkPQUQGoINhZdwiLisc9FKmdjHYsDKFV8NxYZVHjRShJ8cQeB66Jj7jwUoRNfI0ZWbAZujqD5CrN0t8faInHk5e1kFtet0hrYV0G-pM8g-7XfKuO8L1WoLnxJZDBPgCKHnsaL-wSvvC-Mqd5S_BQmH4YsRZip-pnVSOvqwnPlQ9k65-AXwOmptgOi9dZqGzBaiXSKBvC_Dzwa5KDhBWlcE0m1kOZRI9aHa3TNmTYJARAFcA');">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <button class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full text-primary hover:bg-black/60 transition-all">
                <span class="material-symbols-outlined text-lg icon-filled">favorite</span>
              </button>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-1">
                <h4 class="font-bold text-lg leading-tight text-slate-900 dark:text-white">Jasper Yurt</h4>
                <div class="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-bold text-sm">
                  <span class="material-symbols-outlined text-yellow-400 text-sm icon-filled">star</span>
                  4.8
                </div>
              </div>
              <div class="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-3">
                <span class="material-symbols-outlined text-sm">location_on</span>
                Jasper, Canada
              </div>
              <div class="flex items-center justify-between mt-2 pt-3 border-t border-slate-100 dark:border-white/5">
                <div>
                  <span class="text-lg font-bold text-primary">$85</span>
                  <span class="text-xs text-slate-400">/ night</span>
                </div>
                <button class="text-xs font-bold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white px-3 py-1.5 rounded-lg transition-colors">Book</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Upcoming Adventures -->
      <section class="px-4 mb-8">
        <h3 class="text-lg font-bold mb-3">Upcoming Adventures</h3>
        <div class="flex flex-col gap-3">
          <div class="bg-white dark:bg-surface-dark p-3 rounded-2xl border border-slate-200 dark:border-white/5 flex gap-4 items-center shadow-sm">
            <div class="w-20 h-20 rounded-xl bg-cover bg-center shrink-0" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvqN0j8uyb0HADxGqdiXY3ORsZMYhI_ovXvW3CT3RZN6j-TFj1sGx961SyeFSAfUrb9TLFqt76FS3I85plBBM2V70rwEkmFcVf3Vqr9jeW7jBsz25NEIl8uTbkvBxY9GdsKHBT6u8AEdjLITlJG_TZsT5FMq8YfbP_Fea_NWYtAl8ue_oOKvGFBuXBZeLSTg3DIl0y4l2PmeD39szCwqWIHj3RlgsbjrLXW2MhWrRfLKuT7nvZYpP-dvibI7yQAXuPBz2kuWlrCs-3');"></div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-slate-900 dark:text-white truncate">Tofino Surf Shack</h4>
              <p class="text-sm font-medium text-primary mt-0.5">Nov 12 - 14 • Confirmed</p>
              <div class="flex items-center gap-3 mt-2">
                <button class="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">Directions</button>
                <button class="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      ${bottomNav('profile')}
    </div>
  `;
}
