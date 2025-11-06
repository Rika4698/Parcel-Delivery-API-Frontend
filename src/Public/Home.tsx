import HeroSection from "@/components/Public/HomePage/HeroSection";
import HowItWorks from "@/components/Public/HomePage/HowItWorks";
import TestimonialsSection from "@/components/Public/HomePage/TestimonialsSection";




function Home(){
    return(
        <div>
            <HeroSection/>
            <HowItWorks/>
            <TestimonialsSection/>

        </div>
    );
}

export default Home;