
import { Package, Phone, MapPin, CheckCircle, } from 'lucide-react';


const StatisticsSection = () => {

    const stats = [
        { number: "10,000+", label: "Deliveries Completed", icon: <Package className="h-8 w-8" /> },
        { number: "99.9%", label: "Success Rate", icon: <CheckCircle className="h-8 w-8" /> },
        { number: "24/7", label: "Customer Support", icon: <Phone className="h-8 w-8" /> },
        { number: "50+", label: "Cities Covered", icon: <MapPin className="h-8 w-8" /> }
    ];




    return (
        <div >

            <section className="py-20 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 dark:from-stone-900 dark:via-slate-800 dark:to-stone-900">
                <div className="w-11/12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-500/20 dark:to-purple-400/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    {stat.icon}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</p>
                                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>




        </div>
    );
};

export default StatisticsSection;