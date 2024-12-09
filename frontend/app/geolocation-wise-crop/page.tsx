"use client"
import { useEffect, useState } from "react";
import GoogleMapComponent from "@/components/Geolocation";
import Navbar from "@/components/common/Navbar";
import { serverUrl } from "@/libs/const";
import { ChevronRight } from "lucide-react";

type Suitability = "Not Suitable" | "Moderately Suitable" | "Suitable" | "Very Suitable";

const suitabilityMapping = {
  "Not Suitable": {bn:"অনুপযুক্ত", color: "rgba(239, 68, 68, 1)", textColor: "black"},
  "Moderately Suitable": {bn:"মধ্যমভাবে উপযুক্ত", color: "rgba(253, 224, 71, 1)", textColor: "black"},
  "Suitable": {bn:"উপযুক্ত", color: "rgb(0 216 81)", textColor: "black"},
  "Very Suitable": {bn:"অত্যন্ত উপযুক্ত", color: "rgba(21, 128, 61, 1)", textColor: "white"},
}

const crops_names_bn = {
  'Chilli': "মরিচ",
  'Boro Rice': "বোর ধান",
  'Aman Rice': "আমন ধান",
  'Jute': "পাট",
  'Ground Nut': "বাদাম",
  'Onion Garlic': "পেঁয়াজ ও রসুন",
  'Gram': "ছোলা",
  'Sugarcane': "আখ",
  'Wheat': "গম",
  'Maize': "ভুট্টা",
  'Mustard': "সরিষা",
  'Lentil': "মসুর ডাল",
  'Potato': "আলু",
  'Aus Rice': "আউস ধান",
}

const GeolocationPage = ()=> {
  const [visible, setVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    location: number[];
    name: string;
  } | null>(null);
  const [suitability, setSuitability] = useState<{[key:string]:Suitability} | null>(null);

  useEffect(() => {
    setSuitability(null);
    setVisible(true);
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
        setSuitability(response.predicted_suitability);
      })
      .catch(err => console.error(err));
  }, [selectedLocation])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-less-dark">
      <Navbar/>
      {/* Page Header */}
      <header className="text-center py-6 bg-green-700 text-white">
        <h1 className="text-3xl font-bold">জিওলোকেশন ভিত্তিক সেবা</h1>
        <p className="mt-2">আপনার অবস্থানের উপর ভিত্তি করে নির্ভুল কৃষি পরামর্শ এবং আবহাওয়ার আপডেট প্রদান।</p>
      </header>

      {/* Google Map Component */}
      <div className="container mx-auto px-4 py-8 dark:bg-less-dark">
        <GoogleMapComponent
          onLocationSelect={(data) => setSelectedLocation(data)}
          mapVisible={true}
        />

        {/* Location Display */}
        {selectedLocation && (
          <div className="p-6 bg-white dark:bg-[#1c1c1c] dark:text-gray-50 rounded-lg shadow-lg fixed top-20 right-0">
            <button className="rounded-2xl p-1 shadow border bg-green-100" onClick={() =>setVisible(!visible)}>
              <ChevronRight />
            </button>
            {
              visible ? (
                <>
              <h2 className="text-lg font-bold">{selectedLocation.name}</h2>
              <p className="text-xs">অবস্থান: {selectedLocation.location[0]}, {selectedLocation.location[1]}</p>
              <div className="pt-4">
                <h3 className="text-lg font-bold">প্রস্তাবিত ফসল সমূহ</h3>
                <ul className="overflow-auto max-h-[450px]">
                  {suitability && Object.keys(suitability).map((crop, index) => (
                    <li key={index} className="border-b flex items-center justify-between text-sm py-1">
                      <p>{crops_names_bn[crop as keyof typeof crops_names_bn]}</p>
                      <p className={`px-2 py-1 rounded`} style={{ backgroundColor: suitabilityMapping[suitability[crop]].color, color: suitabilityMapping[suitability[crop]]?.textColor}}>
                        {suitabilityMapping[suitability[crop]].bn}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
                </>
              ) : ""
            }
            </div>
        )}
      </div>
    </div>
  );
}
export default GeolocationPage;
