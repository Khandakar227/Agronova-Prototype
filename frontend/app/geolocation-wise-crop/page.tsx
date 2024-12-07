"use client"
import { useEffect, useState } from "react";
import GoogleMapComponent from "@/components/Geolocation";

const GeolocationPage = ()=> {
  const [selectedLocation, setSelectedLocation] = useState<{
    location: number[];
    name: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <header className="text-center py-6 bg-green-700 text-white">
        <h1 className="text-3xl font-bold">জিওলোকেশন ভিত্তিক সেবা</h1>
        <p className="mt-2">আপনার অবস্থানের উপর ভিত্তি করে নির্ভুল কৃষি পরামর্শ এবং আবহাওয়ার আপডেট প্রদান।</p>
      </header>

      {/* Google Map Component */}
      <div className="container mx-auto px-4 py-8">
        <GoogleMapComponent
          onLocationSelect={(data) => setSelectedLocation(data)}
          mapVisible={true}
        />

        {/* Location Display */}
        {selectedLocation && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">আপনার নির্বাচিত অবস্থান</h2>
            <p className="text-gray-800">
              <strong>ঠিকানা:</strong> {selectedLocation.name}
            </p>
            <p className="text-gray-800">
              <strong>অক্ষাংশ ও দ্রাঘিমাংশ:</strong>{" "}
              {selectedLocation.location[1].toFixed(5)}, {selectedLocation.location[0].toFixed(5)}
            </p>

            {/* Placeholder for Agricultural Advice */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700 mb-2">কৃষি পরামর্শ:</h3>
              <p className="text-gray-700">
                
              </p>
            </div>

            {/* Placeholder for Weather Update */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-700 mb-2">আবহাওয়ার আপডেট:</h3>
              <p className="text-gray-700">
               
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default GeolocationPage;
