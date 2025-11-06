import CTASection from "@/components/Public/HomePage/CTASection";
import HeroSection from "@/components/Public/HomePage/HeroSection";
import HowItWorks from "@/components/Public/HomePage/HowItWorks";
import StatisticsSection from "@/components/Public/HomePage/StatisticsSection";
import TestimonialsSection from "@/components/Public/HomePage/TestimonialsSection";




function Home(){
    return(
        <div>
            <HeroSection/>
            <StatisticsSection/>
            <HowItWorks/>
            <TestimonialsSection/>
            <CTASection/>

        </div>
    );
}

export default Home;