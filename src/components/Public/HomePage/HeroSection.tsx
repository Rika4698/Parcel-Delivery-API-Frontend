import { Role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import { ArrowRight, Search } from "lucide-react";
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
      <div className="relative bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500 overflow-x-hidden ">
      <main>

        {/* Hero Section */}
        <section className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center px-4 text-center">

          {/* Decorative Gradient Overlay (Glow Effect) */}

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-300/30 dark:bg-blue-500/30 blur-2xl rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-purple-500/20 dark:bg-purple-700/20 blur-2xl rounded-full"></div>
          </div>

          {/* Hero Text */}
          <div className="relative z-10 mt-32">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-500 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 mb-4 leading-tight">
              Fast & Secure Parcel Delivery Across Bangladesh
            </h1>

            <p className="text-sm sm:text-lg md:text-xl font-semibold max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
              Send, track, and receive parcels anywhere in Bangladesh — trusted, smart, and stress-free.
            </p>

            {/* Buttons */}
            <div className="flex flex-row sm:flex-row gap-3 sm:gap-4 justify-center mb-10">
              <button
                onClick={handleGetStarted}
                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg px-3 sm:px-8 py-2 sm:py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() => navigate("/track-parcel")}
                className="flex items-center justify-center border-2 border-blue-500/30 dark:border-purple-400/30 hover:border-blue-700 dark:hover:border-purple-400 text-blue-700 dark:text-purple-300 bg-white/40 dark:bg-gray-800/40 font-semibold text-lg px-3 sm:px-8 py-2 sm:py-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Search className="mr-2 h-5 w-5" /> Track Parcel
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
