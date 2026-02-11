import { Package} from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950">
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      </div>

      {/* Main Loading Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        
        {/* Animated Truck */}
        <div className="relative">
          {/* Road */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-road-shimmer"></div>
          </div>

          {/* Truck Animation Container */}
          <div className="relative animate-truck-drive">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-blue-200/50 dark:border-purple-500/30">
              
              {/* Truck SVG */}
              <svg width="120" height="80" viewBox="0 0 120 80" className="animate-truck-bounce">
                <defs>
                  <linearGradient id="truckGradientLoading" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                
                {/* Truck body */}
                <rect x="30" y="25" width="50" height="30" rx="4" fill="url(#truckGradientLoading)" />
                
                {/* Cabin */}
                <path d="M 80 30 L 80 45 L 95 45 L 95 38 L 88 30 Z" fill="url(#truckGradientLoading)" />
                <rect x="83" y="33" width="8" height="8" rx="1" fill="#e0f2fe" opacity="0.8" />
                
                {/* Package on truck */}
                <g className="animate-package-bounce">
                  <rect x="50" y="12" width="18" height="15" rx="2" fill="#f59e0b" />
                  <path d="M 50 19.5 L 59 12 L 68 19.5" stroke="#fff" strokeWidth="1.5" fill="none" />
                  <line x1="59" y1="12" x2="59" y2="27" stroke="#fff" strokeWidth="1.5" />
                </g>
                
                {/* Wheels */}
                <g className="animate-wheel-spin">
                  <circle cx="50" cy="55" r="8" fill="#1e293b" />
                  <circle cx="50" cy="55" r="5" fill="#475569" />
                  <line x1="50" y1="50" x2="50" y2="60" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="45" y1="55" x2="55" y2="55" stroke="#94a3b8" strokeWidth="1" />
                </g>
                <g className="animate-wheel-spin">
                  <circle cx="80" cy="55" r="8" fill="#1e293b" />
                  <circle cx="80" cy="55" r="5" fill="#475569" />
                  <line x1="80" y1="50" x2="80" y2="60" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="75" y1="55" x2="85" y2="55" stroke="#94a3b8" strokeWidth="1" />
                </g>
              </svg>

              {/* Floating Package Icon */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-purple-500 to-indigo-500 p-2 rounded-xl shadow-lg animate-float">
                <Package className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
            Loading Delivo
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-progress"></div>
          </div>

          {/* Loading Dots */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Please wait</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-200"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animation-delay-400"></span>
            </div>
          </div>
        </div>

        {/* Brand Badge */}
        {/* <div className=" flex items-center gap-2 opacity-60">
          <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-12">Fast & Secure Delivery</span>
        </div> */}
      </div>

    
    </div>
  );
}