import ChatComponent from "@/components/ChatComponent";
import Navbar from "@/components/common/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="relative"> 
      <Navbar/>
      <HeroSection/>
      <FeaturesSection />
      <ChatComponent/>
    </div>
  );
}
