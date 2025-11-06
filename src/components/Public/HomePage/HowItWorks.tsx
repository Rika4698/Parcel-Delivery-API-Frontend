import {
    Package,
    Truck,
    CheckCircle,
    PackageCheck 
  
} from 'lucide-react';


const HowItWorks = () => {
   
const steps =[
  {
    step: "01",
    title: "Create Parcel",
    description: "Enter your package details and recipient information",
    icon: <Package className="h-6 w-6" />,
  },
  {
    step: "02",
    title: "Pick Up",
    description: "Our agent picks up your parcel from the sender",
    icon: <PackageCheck className="h-6 w-6" />, 
  },
  {
    step: "03",
    title: "Track Progress",
    description: "Monitor your parcel's journey in real-time",
    icon: <Truck className="h-6 w-6" />,
  },
  {
    step: "04",
    title: "Delivered",
    description: "Receive your package safely and securely",
    icon: <CheckCircle className="h-6 w-6" />,
  },
];

    

    return (
        <div className="min-h-screen">
            <section className="py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
                <div className="w-11/12 max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Getting your parcels delivered is simple with our streamlined process
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center space-y-6">
                                <div className="relative">
                                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-400 dark:to-blue-400 rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{step.step}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-10 left-full   w-full h-0.5 bg-gray-200 dark:bg-gray-600 -translate-x-1/2"></div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-blue-700/10 dark:bg-blue-400/10  text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


       
        </div>
    );
};

export default HowItWorks;