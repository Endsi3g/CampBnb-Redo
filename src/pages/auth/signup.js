/**
 * Sign Up Page
 */
import { auth } from '../../api.js';

export function signupPage() {
  // Set up form handler after render
  setTimeout(() => {
    const form = document.querySelector('#signup-form');
    const submitBtn = document.querySelector('#signup-btn');
    const errorDiv = document.querySelector('#signup-error');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const terms = document.querySelector('#terms').checked;

        if (!name || !email || !password) {
          showError('Please fill in all fields');
          return;
        }

        if (password.length < 8) {
          showError('Password must be at least 8 characters');
          return;
        }

        if (!terms) {
          showError('Please agree to the Terms and Privacy Policy');
          return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="animate-spin material-symbols-outlined">progress_activity</span> Creating account...';
        hideError();

        try {
          await auth.register(email, password, name);
          window.location.hash = '/home';
        } catch (error) {
          showError(error.message || 'Registration failed');
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Create Account';
        }
      });
    }

    function showError(message) {
      if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
      }
    }

    function hideError() {
      if (errorDiv) {
        errorDiv.classList.add('hidden');
      }
    }
  }, 0);

  return `
    <div class="min-h-screen flex flex-col">
      <header class="flex items-center px-4 py-4 pt-12 bg-transparent absolute top-0 left-0 right-0 z-10">
        <button data-back class="flex items-center justify-center size-10 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors border border-white/10">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
      </header>
      
      <div class="flex-1 flex flex-col px-6 pt-24 pb-8">
        <div class="flex flex-col gap-1 mb-8">
          <h1 class="text-3xl font-bold text-white">Create Account</h1>
          <p class="text-secondary-text text-sm">Join thousands of happy campers.</p>
        </div>
        
        <!-- Error Message -->
        <div id="signup-error" class="hidden mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm"></div>
        
        <form id="signup-form" class="flex flex-col gap-5">
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="name">Full Name</label>
            <div class="relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">person</span>
              </div>
              <input class="w-full bg-[#1E2E23] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium shadow-sm" id="name" placeholder="Jane Doe" type="text" required/>
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="email">Email address</label>
            <div class="relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input class="w-full bg-[#1E2E23] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium shadow-sm" id="email" placeholder="you@example.com" type="email" required/>
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-300 ml-1" for="password">Password</label>
            <div class="relative group">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input class="w-full bg-[#1E2E23] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium shadow-sm" id="password" placeholder="••••••••" type="password" minlength="8" required/>
            </div>
            <p class="text-xs text-gray-500 ml-1">Must be at least 8 characters</p>
          </div>
          
          <label class="flex items-start gap-3 cursor-pointer group mt-2">
            <input type="checkbox" id="terms" class="mt-1 size-5 rounded border-white/20 bg-[#1E2E23] text-primary focus:ring-primary focus:ring-offset-0"/>
            <span class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              I agree to the <a class="text-primary hover:underline">Terms of Service</a> and <a class="text-primary hover:underline">Privacy Policy</a>
            </span>
          </label>
          
          <button id="signup-btn" class="w-full bg-primary hover:bg-[#0ebf48] text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2" type="submit">
            Create Account
          </button>
        </form>
        
        <div class="mt-auto pt-8 flex items-center justify-center pb-safe">
          <p class="text-gray-400 text-sm">
            Already have an account?
            <a data-navigate="/signin" class="text-primary font-bold hover:underline ml-1 cursor-pointer">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
