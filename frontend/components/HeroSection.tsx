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
        <h1 className="text-2xl font-bold py-4">কৃষকের জন্য স্মার্ট সমাধান</h1>
        <p className="text-5xl font-bold py-4">কৃষিতে সাফল্যের নতুন দিশা!</p>
        <p className="text-xl py-4 max-w-2xl">
          কৃষিদিশারি আপনার বিশ্বস্ত সহযোগী, যা আধুনিক প্রযুক্তির সাহায্যে কৃষি
          কাজকে আরও সহজ এবং লাভজনক করে তুলতে প্রস্তুত।
        </p>
        <div className="mx-auto text-center pt-10">
          <ChevronsDown size={28} className="animate-bounce"/>
        </div>
      </div>
    </section>
  );
}
