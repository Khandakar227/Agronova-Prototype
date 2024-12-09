import ChatComponent from "@/components/ChatComponent";
import Navbar from "@/components/common/Navbar";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="relative bg-green-50 dark:bg-dark dark:text-white"> 
      <Navbar/>
      <HeroSection/>
      <FeaturesSection />
      <ChatComponent/>
    </div>
  );
}
