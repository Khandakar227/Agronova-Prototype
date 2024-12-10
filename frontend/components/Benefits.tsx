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
            কৃষিদিশারির প্রধান ব্যবহারকারী এবং উপকারভোগী
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mx-auto max-w-3xl">
            কৃষিদিশারি একটি আধুনিক প্রযুক্তি-ভিত্তিক প্ল্যাটফর্ম, যা বিশেষত কৃষকদের জন্য তৈরি।
            এর ব্যবহারকারী এবং উপকারভোগীদের তালিকা এখানে দেওয়া হল।
          </p>
        </div>

        {/* Content and Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">কৃষকগণ:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              সঠিক ফসল নির্বাচন এবং উন্নত চাষাবাদের কৌশল সম্পর্কে পরামর্শ পান। মাটি এবং আবহাওয়া অনুযায়ী
              নির্ভুল কৃষি তথ্য এবং এআই চ্যাটবটের মাধ্যমে কৃষি সমস্যার সমাধান।
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">কৃষি পরামর্শদাতা:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              কৃষকদের সহায়তার জন্য বৈজ্ঞানিক তথ্য এবং সুপারিশ প্রদান। উন্নত প্রযুক্তি ব্যবহার করে কৃষি
              পরিকল্পনার উন্নতি।
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">উদ্যোক্তাগণ:</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              আধুনিক কৃষি প্রযুক্তি ও তথ্য ব্যবহার করে কৃষি উৎপাদনের মান বৃদ্ধি এবং কৃষকদের সাথে সরাসরি
              যোগাযোগ স্থাপনের সুযোগ।
            </p>

            <h3 className="text-2xl font-bold text-gray-700 dark:text-green-400 mb-4">গ্রামীণ অর্থনীতি:</h3>
            <p className="text-gray-600 dark:text-gray-300">
              প্রযুক্তির প্রয়োগের মাধ্যমে উৎপাদনশীলতা বৃদ্ধি এবং গ্রামীণ অর্থনীতির কাঠামোকে শক্তিশালী
              করা।
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
            কৃষিদিশারি কৃষকদের উন্নত ফসল ফলানোর সুযোগ দেয় এবং কৃষি খাতে একটি টেকসই ভবিষ্যত গড়ে তুলতে
            সাহায্য করে।
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
