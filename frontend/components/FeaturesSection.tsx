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
    <div className="py-12 px-4" id="features">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our Services</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        <Link href="/geolocation-wise-crop" className="max-w-sm bg-white p-6 rounded-lg shadow text-center hover:shadow-lg dark:bg-less-dark dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Geolocation-Based Services</h2>
          <p className="text-green-700 dark:text-green-200">
            Get accurate agricultural advice and weather updates based on your location.
          </p>
        </Link>

        <Link href="/crop-recommendation" className="max-w-sm bg-white p-6 rounded-lg shadow text-center hover:shadow-lg dark:bg-less-dark dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Crop Recommendation</h2>
          <p className="text-green-700 dark:text-green-200">
            We suggest the most suitable crops to grow based on your area's soil and environmental data.
          </p>
        </Link>

        <Link href="/fertilizer-suggest" className="max-w-sm bg-white p-6 rounded-lg shadow text-center hover:shadow-lg dark:bg-less-dark dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Fertilizer Suggestions</h2>
          <p className="text-green-700 dark:text-green-200">
            Choose the right fertilizer based on soil quality and the type of crop.
          </p>
        </Link>

        <div onClick={emitChatbotOpen} className="cursor-pointer max-w-sm bg-white p-6 rounded-lg shadow text-center hover:shadow-lg dark:bg-less-dark dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">AI Chatbot</h2>
          <p className="text-green-700 dark:text-green-200">
            Use our AI chatbot to get answers to any of your agriculture-related questions.
          </p>
        </div>

        <Link href="/plant-disease" className="cursor-pointer max-w-sm bg-white p-6 rounded-lg shadow text-center hover:shadow-lg dark:bg-less-dark dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Plant Disease Detection</h2>
          <p className="text-green-700 dark:text-green-200">
            Upload a photo of the plant's leaf to instantly detect potential diseases.
          </p>
        </Link>
      </div>
    </div>
  )
}
