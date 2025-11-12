import { ArrowRight,Search,} from 'lucide-react';
import { useNavigate } from 'react-router';


const CTASection = () => {
      const navigate = useNavigate();

    return (
        <div >
 
            <section className="py-20 bg-gradient-to-r from-blue-400 to-purple-600 dark:from-blue-300  dark:to-purple-400">
                <div className="w-11/12 max-w-7xl mx-auto text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                                Ready to Get Started?
                            </h2>
                            <p className="text-lg text-gray-200 dark:text-gray-700 font-medium">
                                Join thousands of satisfied customers who trust Delivo for their delivery needs
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                            <button
                                
                                className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium border border-gray-300 rounded-xl
               bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300
               dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 shadow-md"
                                onClick={() => navigate('/register')}
                            >
                                Create Account
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </button>
                            <button
                                
                                className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium rounded-xl
               border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-blue-600  dark:hover:text-blue-400 transition-colors duration-300
                shadow-md"
                                onClick={() => navigate('/track-parcel')}
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Track Parcel
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CTASection;