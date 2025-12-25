/**
 * Forgot Password Page
 */
export function forgotPasswordPage() {
    return `
    <div class="min-h-screen flex flex-col">
      <div class="px-6 py-4 flex items-center">
        <button data-back class="flex items-center justify-center size-10 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      
      <div class="flex-1 flex flex-col px-6 pt-4 pb-8 w-full max-w-md mx-auto justify-start">
        <div class="mb-8 self-start">
          <div class="size-16 rounded-2xl bg-surface-dark border border-white/5 flex items-center justify-center shadow-lg shadow-black/20">
            <span class="material-symbols-outlined text-primary text-4xl">lock_reset</span>
          </div>
        </div>
        
        <div class="space-y-3 mb-10">
          <h1 class="text-3xl font-bold text-white tracking-tight">Forgot password?</h1>
          <p class="text-secondary-text text-base leading-relaxed">
            Don't worry! It happens. Please enter the email address associated with your account and we'll send you a link to reset it.
          </p>
        </div>
        
        <form class="flex flex-col gap-6" onsubmit="event.preventDefault();">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="reset-email">Email address</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">alternate_email</span>
              </div>
              <input class="w-full bg-surface-dark border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" id="reset-email" name="email" placeholder="example@email.com" required type="email"/>
            </div>
          </div>
          
          <button type="button" class="w-full bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2">
            <span>Send Reset Link</span>
            <span class="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </form>
        
        <div class="mt-auto pt-10 text-center">
          <p class="text-gray-400 text-sm">
            Remember your password? 
            <a data-navigate="/signin" class="text-primary font-semibold hover:underline decoration-primary ml-1 cursor-pointer">Log in</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
