import Navbar from "@/components/common/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection />
    </div>
  );
}
