"use client"
import { useEffect, useState } from "react";
import GoogleMapComponent from "@/components/Geolocation";
import Navbar from "@/components/common/Navbar";
import { serverUrl } from "@/libs/const";

const GeolocationPage = ()=> {
  const [selectedLocation, setSelectedLocation] = useState<{
    location: number[];
    name: string;
  } | null>(null);
  const [suitability, setSuitability] = useState<any>(null);

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lon: selectedLocation?.location[0], lat: selectedLocation?.location[1]}),
    };
    if(!selectedLocation || !selectedLocation.location) return;
    fetch(`${serverUrl}/predict-suitability`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);

      })
      .catch(err => console.error(err));
  }, [selectedLocation])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
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
          <div className="p-6 bg-white rounded-lg shadow-lg fixed top-20 right-0">

          </div>
        )}
      </div>
    </div>
  );
}
export default GeolocationPage;
