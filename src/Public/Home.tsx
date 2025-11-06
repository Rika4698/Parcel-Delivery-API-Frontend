import CTASection from "@/components/Public/HomePage/CTASection";
import FeaturesSection from "@/components/Public/HomePage/FeaturesSection";
import HeroSection from "@/components/Public/HomePage/HeroSection";
import HowItWorks from "@/components/Public/HomePage/HowItWorks";
import StatisticsSection from "@/components/Public/HomePage/StatisticsSection";
import TestimonialsSection from "@/components/Public/HomePage/TestimonialsSection";




function Home(){
    return(
        <div>
            <HeroSection/>
            <FeaturesSection/>
            <StatisticsSection/>
            <HowItWorks/>
            <TestimonialsSection/>
            <CTASection/>

        </div>
    );
}

export default Home;