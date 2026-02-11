import { Role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { ArrowRight, Search, Package, Zap, Shield, MapPin, Truck } from "lucide-react";
import { useNavigate } from "react-router";

export default function HeroSection() {
  const navigate = useNavigate();
  const { data } = useUserInfoQuery(undefined);

  const handleGetStarted = () => {
    if (data?.data) {
      if (data.data.role === Role.admin || data.data.role === Role.superAdmin) {
        navigate("/admin");
      } else if (data.data.role === Role.sender) {
        navigate("/sender");
      } else {
        navigate("/receiver");
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 text-gray-800 dark:text-gray-200 overflow-hidden min-h-screen">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-[20%] w-80 h-80 bg-indigo-400/15 dark:bg-indigo-500/15 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path 
            d="M0,300 Q400,200 800,300 T1600,300" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-draw-line"
          />
          <path 
            d="M0,500 Q600,400 1200,500 T2400,500" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-draw-line-delayed"
          />
        </svg>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          
          <div className="max-w-7xl mx-auto w-full mt-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="text-center lg:text-left order-1 lg:order-1">
                
                {/* Stats Bar - Animated */}
                <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start opacity-0 animate-fade-in-up">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">50k+ Deliveries</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-sm">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Same Day</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-indigo-200/50 dark:border-indigo-700/50 shadow-sm">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Secure</span>
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight opacity-0 animate-fade-in-up animation-delay-200">
                  <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
                    Fast & Secure
                  </span>
                  <br />
                  <span className="text-gray-800 dark:text-gray-100">
                    Parcel Delivery
                  </span>
                  <br />
                  <span className="text-gray-700 dark:text-gray-200 flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                    <span>Across</span>
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-500 to-red-500 bg-clip-text text-transparent">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600 dark:text-green-400 inline animate-bounce-slow" />
                      Bangladesh
                    </span>
                  </span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 lg:mb-10 leading-relaxed opacity-0 animate-fade-in-up animation-delay-400 font-medium">
                  Send, track, and receive parcels anywhere in Bangladesh — trusted by thousands, 
                  powered by technology, delivered with care.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 lg:mb-16 opacity-0 animate-fade-in-up animation-delay-600">
                  <button
                    title="Register or Dashboard"
                    onClick={handleGetStarted}
                    className="group relative flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative flex items-center gap-2">
                      Get Started 
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>

                  <button
                    onClick={() => navigate("/track-parcel")}
                    className="group flex items-center justify-center border-2 border-blue-300 dark:border-purple-500/50 hover:border-blue-600 dark:hover:border-purple-400 text-blue-700 dark:text-purple-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Track Parcel
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 opacity-0 animate-fade-in-up animation-delay-800">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-800"><img className=" rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/12.jpg" alt="Client"/></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-gray-800"><img className=" rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client"/></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white dark:border-gray-800"><img className=" rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/45.jpg" alt="Client"/></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                        5k+
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">Happy Customers</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Right Image/Illustration */}
              <div className="relative order-2 lg:order-2 opacity-0 animate-fade-in-up animation-delay-400">
                
                {/* Delivery Truck Illustration */}
                <div className="relative">
                  {/* Main Illustration Container */}
                  <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border border-blue-200/30 dark:border-purple-500/30 shadow-2xl">
                    
                    {/* Animated Delivery Truck SVG */}
                    <div className="relative animate-float-slow">
                      <svg viewBox="0 0 400 300" className="w-full h-40 lg:h-auto" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="truckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                          <linearGradient id="packageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                        
                        {/* Road */}
                        <rect x="0" y="220" width="400" height="80" fill="#cbd5e1" opacity="0.3"/>
                        <line x1="0" y1="260" x2="400" y2="260" stroke="#94a3b8" strokeWidth="4" strokeDasharray="20,15" className="animate-road-line"/>
                        
                        {/* Truck Body */}
                        <g className="animate-truck-bounce">
                          {/* Cargo container */}
                          <rect x="120" y="140" width="140" height="80" rx="8" fill="url(#truckGradient)" />
                          <rect x="130" y="150" width="40" height="40" rx="4" fill="#fff" opacity="0.2"/>
                          <rect x="180" y="150" width="40" height="40" rx="4" fill="#fff" opacity="0.2"/>
                          
                          {/* Cabin */}
                          <path d="M 260 160 L 260 200 L 320 200 L 320 180 L 300 160 Z" fill="url(#truckGradient)"/>
                          <rect x="270" y="170" width="20" height="20" rx="2" fill="#e0f2fe" opacity="0.8"/>
                          
                          {/* Wheels */}
                          <circle cx="160" cy="220" r="18" fill="#1e293b"/>
                          <circle cx="160" cy="220" r="12" fill="#475569"/>
                          <circle cx="280" cy="220" r="18" fill="#1e293b"/>
                          <circle cx="280" cy="220" r="12" fill="#475569"/>
                          
                          {/* Package on top */}
                          <g className="animate-package-float">
                            <rect x="175" y="100" width="50" height="40" rx="4" fill="url(#packageGradient)"/>
                            <path d="M 175 120 L 200 100 L 225 120" stroke="#fff" strokeWidth="2" fill="none"/>
                            <line x1="200" y1="100" x2="200" y2="140" stroke="#fff" strokeWidth="2"/>
                          </g>
                        </g>
                        
                        {/* Speed lines */}
                        <line x1="80" y1="150" x2="100" y2="150" stroke="#94a3b8" strokeWidth="3" opacity="0.5" className="animate-speed-line-1"/>
                        <line x1="70" y1="170" x2="95" y2="170" stroke="#94a3b8" strokeWidth="3" opacity="0.5" className="animate-speed-line-2"/>
                        <line x1="60" y1="190" x2="90" y2="190" stroke="#94a3b8" strokeWidth="3" opacity="0.5" className="animate-speed-line-3"/>
                      </svg>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute -top-4 -left-4 bg-green-500 text-white p-3 rounded-2xl shadow-lg animate-bounce-slow">
                      <Truck className="w-6 h-6" />
                    </div>
                    
                    <div className="absolute -bottom-4 -right-4 bg-purple-500 text-white p-3 rounded-2xl shadow-lg animate-float-delayed">
                      <Package className="w-6 h-6" />
                    </div>

                    <div className="hidden md:block absolute top-1/4 -right-6 bg-yellow-400 text-gray-800 px-3 py-2 rounded-lg shadow-lg text-xs font-bold animate-pulse">
                      Express!
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -z-10 top-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                  <div className="absolute -z-10 bottom-8 -right-8 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
}