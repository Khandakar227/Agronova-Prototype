"use client"
import Link from "next/link"
import { useState } from "react";

export default function FeaturesSection() {
  const [chatbotOpen, setChatbotOpen] = useState(true);
  const emitChatbotOpen = () => {
    const chatbotEvent = new CustomEvent("chatbot", {
      detail: { open: chatbotOpen },
    });
    document.dispatchEvent(chatbotEvent);
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <div className="py-12 px-4 " id="features">
      <div className="text-center">
        <h1 className="text-4xl font-bold">আমাদের সেবা</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        <Link href="/geolocation-wise-crop" className="max-w-sm bg-white p-6 border rounded-lg shadow text-center hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">জিওলোকেশন ভিত্তিক সেবা</h2>
          <p className="text-green-700">
            আপনার অবস্থানের উপর ভিত্তি করে নির্ভুল কৃষি পরামর্শ এবং আবহাওয়ার আপডেট প্রদান।
          </p>
        </Link>
        <Link href="/crop-recommendation" className="max-w-sm bg-white p-6 border rounded-lg shadow text-center hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">ফসলের সুপারিশ</h2>
          <p className="text-green-700">
            আপনার এলাকার মাটি ও পরিবেশগত তথ্যের ভিত্তিতে কোন ফসল চাষ করা উচিত তা আমরা পরামর্শ দেই।
          </p>
        </Link>
        <Link href="/fertilizer-suggest" className="max-w-sm bg-white p-6 border rounded-lg shadow text-center hover:shadow-lg" >
          <h2 className="text-2xl font-semibold mb-4 ">পরামর্শ অনুযায়ী সার প্রদান</h2>
          <p className="text-green-700">
          জমির মাটির গুনাগুন এবং ফসলের উপর ভিত্তি করে সঠিক সার নির্বাচন করুন।
          </p>
        </Link>
        <div onClick={emitChatbotOpen} className="cursor-pointer max-w-sm bg-white p-6 border rounded-lg shadow text-center hover:shadow-lg" >
          <h2 className="text-2xl font-semibold mb-4 ">এআই চ্যাটবট</h2>
          <p className="text-green-700">
            আপনার কৃষি সম্পর্কিত যেকোনো প্রশ্নের উত্তর পেতে আমাদের এআই চ্যাটবট ব্যবহার করুন।
          </p>
        </div>
      </div>
    </div>
  )
}
