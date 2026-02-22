
import { 
  MapPin, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Navigation,
  Phone,

} from "lucide-react";


export function RealTimeTrackingSection() {
//   const [activeTracking, setActiveTracking] = useState(0);

  const trackingSteps = [
    {
      status: "confirmed",
      icon: CheckCircle,
      title: "Order Confirmed",
      time: "10:30 AM",
      location: "Dhaka Hub",
      description: "Your package has been confirmed and is being prepared",
      completed: true
    },
    {
      status: "picked",
      icon: Package,
      title: "Package Picked Up",
      time: "11:45 AM",
      location: "Collection Center",
      description: "Our driver has collected your package",
      completed: true
    },
    {
      status: "transit",
      icon: Truck,
      title: "In Transit",
      time: "2:15 PM",
      location: "En route to Chittagong",
      description: "Your package is on the way",
      completed: true,
      current: true
    },
    {
      status: "nearby",
      icon: Navigation,
      title: "Out for Delivery",
      time: "Expected 4:30 PM",
      location: "Local Distribution Center",
      description: "Package will be delivered soon",
      completed: false
    },
    {
      status: "delivered",
      icon: CheckCircle,
      title: "Delivered",
      time: "Expected 5:00 PM",
      location: "Your Address",
      description: "Package delivered successfully",
      completed: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl -top-24 -right-24 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-3xl -bottom-24 -left-24 animate-pulse [animation-delay:1s]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold mb-4 animate-pulse">
            🔴 LIVE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4  py-2">
            Demo Package Tracking
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track your package every step of the way with live GPS updates
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Live Map Visualization */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border-2 border-blue-200 dark:border-purple-800">
              {/* Mock Map */}
              <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-2xl overflow-hidden mb-6">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                {/* Route Line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <path
                    d="M 80 320 Q 200 250, 320 80"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="8 4"
                    className="animate-dash"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Start Point */}
                <div className="absolute bottom-16 left-16 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-blue-200 dark:border-blue-700">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Dhaka Hub</span>
                    </div>
                  </div>
                </div>

                {/* Truck (Moving) */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                </div>

                {/* End Point */}
                <div className="absolute top-16 right-16 transform translate-x-1/2 translate-y-1/2">
                  <div className="relative w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-purple-200 dark:border-purple-700">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Chittagong</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl border border-blue-200 dark:border-purple-800">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                  👨‍✈️
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 dark:text-white">Karim Ahmed</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Driver - ID: DRV-2847</p>
                </div>
                <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:shadow-lg transition-all">
                  <Phone className="w-5 h-5" />
                </button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-purple-900">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    127 km
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Distance</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-purple-900">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    2h 15m
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">ETA</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-purple-900">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                    65 km/h
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Speed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div
                key={index}
                className={`relative flex gap-4 p-6 rounded-2xl transition-all duration-300 ${
                  step.current
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-purple-500/30 '
                    : step.completed
                    ? 'bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-purple-900'
                    : 'bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 opacity-60'
                }`}
              >
                {/* Timeline Line */}
                {index < trackingSteps.length - 1 && (
                  <div
                    className={`absolute left-[2.5rem] top-[4.5rem] w-0.5 h-16 ${
                      step.completed
                        ? 'bg-gradient-to-b from-blue-500 to-purple-600'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  ></div>
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                  step.current
                    ? 'bg-white text-purple-600 shadow-xl animate-pulse'
                    : step.completed
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-bold text-lg ${
                      step.current ? 'text-white' : 'text-gray-800 dark:text-white'
                    }`}>
                      {step.title}
                    </h3>
                    {step.current && (
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-4 text-sm mb-2 ${
                    step.current ? 'text-white/90' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {step.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {step.location}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    step.current ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  
    </section>
  );
}