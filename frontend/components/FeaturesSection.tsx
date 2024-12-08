export default function FeaturesSection() {
  return (
    <div className="py-12 px-4 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold">আমাদের সেবা</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        <div className="max-w-sm bg-white p-6 border rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">ফসলের সুপারিশ</h2>
          <p className="text-green-700">
            আপনার এলাকার মাটি ও পরিবেশগত তথ্যের ভিত্তিতে কোন ফসল চাষ করা উচিত তা আমরা পরামর্শ দেই।
          </p>
        </div>
        <div className="max-w-sm bg-white p-6 border rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">জিওলোকেশন ভিত্তিক সেবা</h2>
          <p className="text-green-700">
            আপনার অবস্থানের উপর ভিত্তি করে নির্ভুল কৃষি পরামর্শ এবং আবহাওয়ার আপডেট প্রদান।
          </p>
        </div>
        <div className="max-w-sm bg-white p-6 border rounded-lg shadow-lg text-center " >
          <h2 className="text-2xl font-semibold mb-4 ">এআই চ্যাটবট</h2>
          <p className="text-green-700">
            আপনার কৃষি সম্পর্কিত যেকোনো প্রশ্নের উত্তর পেতে আমাদের এআই চ্যাটবট ব্যবহার করুন।
          </p>
        </div>
        <div className="max-w-sm bg-white p-6 border rounded-lg shadow-lg text-center " >
          <h2 className="text-2xl font-semibold mb-4 ">পরামর্শ অনুযায়ী সার প্রদান</h2>
          <p className="text-green-700">
          জমির মাটির গুনাগুন এবং ফসলের উপর ভিত্তি করে সঠিক সার নির্বাচন করুন।
          </p>
        </div>
      </div>
    </div>
  )
}
