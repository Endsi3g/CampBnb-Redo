/**
 * Sign In Page
 */
export function signinPage() {
    return `
    <div class="relative flex flex-col min-h-screen w-full">
      <div class="relative w-full h-[38vh] min-h-[300px] shrink-0">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFqdK1y4mtadD2w9Ut04Ypjz3xfMqfHFbf8FCzk2pFv_Dhcxs13EtA0zp-7nFVkhXFnF5iaat_VfUbEsqdL7wyXXmaFHsK-zJ-WHdUwHGSb_tRld6TyV_I4ainXjnW1DgSVrCyDkiEH9OUtOqjXUehbpeRrUyNCQn2atLnZmlf1mMSrFDj3wzzg0K3zCrx4Z5oOoij0uVZ0N1ChowtHwN-T5xe73BnDJ6TSn-vrEWe4NdHosGrzLMkfjWwPZQVWen13sb6cFV9Pefa');"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-background-dark/50 to-background-dark"></div>
        
        <div class="absolute inset-0 flex flex-col items-center justify-center z-10 pb-8">
          <div class="size-16 rounded-2xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl mb-4 border border-white/20 transform -rotate-6">
            <span class="material-symbols-outlined text-background-dark text-4xl">camping</span>
          </div>
          <h1 class="text-3xl font-bold text-white tracking-tight drop-shadow-md">CampBnB</h1>
          <p class="text-gray-200 font-medium text-sm tracking-wide bg-black/20 px-3 py-1 rounded-full backdrop-blur-md mt-2 border border-white/10">Find your wild.</p>
        </div>
        
        <div class="absolute top-0 left-0 p-4 pt-12 z-20">
          <button data-back class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors border border-white/10">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
        </div>
      </div>
      
      <div class="flex flex-col px-6 -mt-6 relative z-10 flex-1 pb-8">
        <div class="flex flex-col gap-1 mb-8">
          <h2 class="text-2xl font-bold text-white">Welcome back</h2>
          <p class="text-secondary-text text-sm">Sign in to book your next adventure.</p>
        </div>
        
        <form class="flex flex-col gap-5" onsubmit="event.preventDefault()">
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="email">Email address</label>
            <div class="relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input class="w-full bg-[#1E2E23] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium shadow-sm" id="email" placeholder="you@example.com" type="email"/>
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="password">Password</label>
            <div class="relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input class="w-full bg-[#1E2E23] border border-white/10 rounded-xl pl-11 pr-12 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium shadow-sm" id="password" placeholder="••••••••" type="password"/>
              <button class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1" type="button">
                <span class="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>
          
          <div class="flex justify-end -mt-1">
            <a data-navigate="/forgot-password" class="text-sm font-semibold text-secondary-text hover:text-primary transition-colors cursor-pointer">Forgot password?</a>
          </div>
          
          <button data-navigate="/home" class="w-full bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2" type="button">
            Sign In
          </button>
        </form>
        
        <div class="relative flex py-8 items-center">
          <div class="flex-grow border-t border-white/10"></div>
          <span class="flex-shrink-0 mx-4 text-gray-500 text-xs font-medium uppercase tracking-wider">Or continue with</span>
          <div class="flex-grow border-t border-white/10"></div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-2 bg-[#1E2E23] border border-white/10 hover:bg-white/5 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] group shadow-sm">
            <svg class="size-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.15-.15-2.15z"></path>
            </svg>
            Google
          </button>
          <button class="flex items-center justify-center gap-2 bg-[#1E2E23] border border-white/10 hover:bg-white/5 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] group shadow-sm">
            <svg class="size-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.79 3.49 1.88-3.1 1.8-2.54 6.27.53 7.58-.59 1.6-1.5 3.03-2.61 4.56zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"></path>
            </svg>
            Apple
          </button>
        </div>
        
        <div class="mt-auto pt-8 flex items-center justify-center pb-safe">
          <p class="text-gray-400 text-sm">
            Don't have an account? 
            <a data-navigate="/signup" class="text-primary font-bold hover:underline ml-1 cursor-pointer">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
