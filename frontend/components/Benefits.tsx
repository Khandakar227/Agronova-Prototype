"use client";

import { useState } from "react";

const Benefits = () => {
  const [chatbotOpen, setChatbotOpen] = useState(true);

  const emitChatbotOpen = () => {
    const chatbotEvent = new CustomEvent("chatbot", {
      detail: { open: chatbotOpen },
    });
    document.dispatchEvent(chatbotEvent);
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <section className="py-16 bg-green-50 dark:bg-less-dark" id="benefits">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Primary Users and Beneficiaries of Krishidishari
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mx-auto max-w-3xl">
            Krishidishari is a modern technology-based platform designed especially for farmers.
            Here’s a list of its main users and beneficiaries.
          </p>
        </div>

        {/* Content and Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">Farmers:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get advice on optimal crop selection and advanced farming techniques. Access accurate agricultural data based on soil and weather, and solve farming problems via AI chatbot.
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">Agricultural Advisors:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Provide scientific information and recommendations to support farmers. Improve planning using advanced technologies.
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">Entrepreneurs:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enhance agricultural production quality using modern agri-tech and establish direct communication with farmers.
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">Rural Economy:</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Strengthen the structure of rural economies by increasing productivity through technology adoption.
            </p>
          </div>

          {/* Right Side - Images */}
          <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
              <img
                src="farmers.jpg"
                alt="Farmers getting advice"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
              <img
                src="farm-advisors.jpg"
                alt="Advisors helping farmers"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
              <img
                src="farm-entrepren.jpg"
                alt="Using technology in agriculture"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800"
              onClick={emitChatbotOpen}
            >
              <img
                src="agri-economics.webp"
                alt="Strengthening rural economy"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Benefits Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Krishidishari empowers farmers to grow better crops and contributes to building a sustainable future in agriculture.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
