/**
 * Sign Up / Create Account Page
 */
export function signupPage() {
    return `
    <div class="relative z-10 flex flex-col flex-grow w-full max-w-md mx-auto p-6 pt-8 pb-4 safe-pb h-full min-h-screen">
      <!-- Background -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div class="absolute -top-[10%] -right-[10%] w-[70%] h-[50%] bg-primary/5 rounded-full blur-[100px]"></div>
        <div class="absolute top-[40%] -left-[20%] w-[80%] h-[50%] bg-[#2C5E43]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <header class="relative z-10 flex items-center justify-between mb-8">
        <button data-back class="size-11 flex items-center justify-center rounded-full bg-surface-dark border border-white/5 text-white hover:bg-white/10 active:scale-95 transition-all">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="hidden sm:block text-sm font-semibold text-secondary-text tracking-wide">CAMPBNB</div>
      </header>
      
      <div class="relative z-10 mb-8 flex flex-col gap-2">
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
        <p class="text-secondary-text text-base">Start your journey into the wild. Join our community of eco-conscious explorers.</p>
      </div>
      
      <form action="#" class="relative z-10 flex flex-col gap-5 flex-grow" onsubmit="event.preventDefault()">
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-300 ml-1" for="fullname">Full Name</label>
          <div class="relative group">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">person</span>
            </div>
            <input class="w-full bg-surface-dark border border-white/5 rounded-xl py-4 pl-11 pr-4 text-white placeholder-gray-500/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" id="fullname" placeholder="e.g. Alex Johnson" type="text"/>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-300 ml-1" for="signup-email">Email</label>
          <div class="relative group">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <input class="w-full bg-surface-dark border border-white/5 rounded-xl py-4 pl-11 pr-4 text-white placeholder-gray-500/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" id="signup-email" placeholder="name@example.com" type="email"/>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-300 ml-1" for="signup-password">Password</label>
          <div class="relative group">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <input class="w-full bg-surface-dark border border-white/5 rounded-xl py-4 pl-11 pr-12 text-white placeholder-gray-500/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" id="signup-password" placeholder="Min. 8 characters" type="password"/>
            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors" type="button">
              <span class="material-symbols-outlined text-[20px]">visibility_off</span>
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-semibold text-gray-300 ml-1" for="confirm-password">Confirm Password</label>
          <div class="relative group">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
              <span class="material-symbols-outlined text-[20px]">lock_reset</span>
            </div>
            <input class="w-full bg-surface-dark border border-white/5 rounded-xl py-4 pl-11 pr-12 text-white placeholder-gray-500/80 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all shadow-sm" id="confirm-password" placeholder="Re-enter password" type="password"/>
          </div>
        </div>
        
        <div class="mt-2 flex items-start gap-3 px-1">
          <div class="relative flex items-center pt-1">
            <input class="peer size-5 cursor-pointer appearance-none rounded border border-white/20 bg-surface-dark checked:bg-primary checked:border-primary transition-all shadow-sm" id="terms" type="checkbox"/>
            <span class="pointer-events-none absolute left-1/2 top-1/2 mt-0.5 -translate-x-1/2 -translate-y-1/2 text-background-dark opacity-0 peer-checked:opacity-100 material-symbols-outlined text-[16px] font-bold">check</span>
          </div>
          <label class="text-sm text-gray-400 leading-snug cursor-pointer select-none" for="terms">
            I agree to the <a class="text-primary hover:underline hover:text-green-400 font-medium transition-colors" href="#">Terms of Service</a> and <a class="text-primary hover:underline hover:text-green-400 font-medium transition-colors" href="#">Privacy Policy</a>.
          </label>
        </div>
        
        <div class="flex-grow min-h-[2rem]"></div>
        
        <div class="flex flex-col gap-6 mt-4">
          <button data-navigate="/home" class="w-full bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-[17px] py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(17,212,82,0.4)] transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" type="button">
            Create Account
            <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <div class="flex items-center justify-center gap-1.5 text-sm text-gray-400">
            <span>Already have an account?</span>
            <a data-navigate="/signin" class="text-primary font-bold hover:underline hover:text-green-400 transition-colors cursor-pointer">Log in</a>
          </div>
        </div>
      </form>
    </div>
  `;
}
