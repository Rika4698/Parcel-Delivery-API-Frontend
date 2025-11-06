import { Card, CardContent } from '@/components/ui/card';
import {Package,Truck,Shield,Phone} from 'lucide-react';


const FeaturesSection = () => {

    const features = [
        {
            icon: <Package className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Real-time Tracking",
            description: "Monitor your parcels 24/7 with our advanced tracking system",
            color: "bg-blue-50 border-2 border-blue-200 dark:bg-stone-950/20 dark:border-stone-700 hover:border-blue-600 dark:hover:border-blue-400"
        },
        {
            icon: <Truck className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Fast Delivery",
            description: "Lightning-fast delivery service across the country",
            color: "bg-purple-50 border-2 border-purple-200 dark:bg-gray-950/20 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
        },
        {
            icon: <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Secure Handling",
            description: "Your packages are safe with our secure handling process",
            color: "bg-blue-50 border-2 border-blue-200 dark:bg-neutral-950/20 dark:border-neutral-700 hover:border-blue-600 dark:hover:border-blue-400"
        },
        {
            icon: <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "24/7 Support",
            description: "Round-the-clock customer assistance whenever you need it",
            color: "bg-purple-50 border-2 border-purple-200 dark:bg-slate-900 dark:border-slate-700 hover:border-purple-600 dark:hover:border-purple-400"
        }
    ];




    return (
        <div>
       
            <section className="py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
                <div className="w-11/12 max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
                            Why Choose Delivo?
                        </h2>
                        <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto">
                            We provide the most reliable and efficient parcel delivery service
                            with cutting-edge technology and exceptional customer care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className={`${feature.color} hover:shadow-lg shadow-gray-500 transition-all duration-300 group`}>
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-500/20 dark:to-blue-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                                        <p className="text-muted-foreground font-medium">{feature.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSection;