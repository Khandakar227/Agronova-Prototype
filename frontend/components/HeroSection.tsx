import { ChevronsDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover bg-black"
        src="/assets/intro-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Fade effect at top and bottom */}
      <div className="absolute z-0 top-0 left-0 w-full h-screen bg-gradient-to-t from-black bg-opacity-15 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-screen bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      {/* Overlay to darken the video for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full text-white mx-auto max-w-7xl p-4 text-center z-[1]">
        <h1 className="text-2xl font-bold py-4">Smart Solutions for Farmers</h1>
        <p className="text-5xl font-bold py-4">A New Direction for Success in Agriculture!</p>
        <p className="text-xl py-4 max-w-2xl">
          KrishiDishari is your trusted companion, ready to make farming easier and more profitable with the help of modern technology.
        </p>
        <div className="mx-auto text-center pt-10">
          <ChevronsDown size={28} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
