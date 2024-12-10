"use client";
import { useEffect, useState } from "react";
import GoogleMapComponent from "@/components/Geolocation";
import Navbar from "@/components/common/Navbar";
import { WiDaySunny, WiCloudy } from "react-icons/wi"; 
import { FaSeedling } from "react-icons/fa";
import {
  ChevronRight,
  ChevronLeft,
  Sun,
  Droplet,
  Wind,
  CloudRain,
  Thermometer,
} from "lucide-react";
import { serverUrl } from "@/libs/const";

type Suitability = "Not Suitable" | "Moderately Suitable" | "Suitable" | "Very Suitable";

const suitabilityMapping = {
  "Not Suitable": { bn: "অনুপযুক্ত", color: "rgba(239, 68, 68, 1)", textColor: "black" },
  "Moderately Suitable": { bn: "মধ্যমভাবে উপযুক্ত", color: "rgba(253, 224, 71, 1)", textColor: "black" },
  "Suitable": { bn: "উপযুক্ত", color: "rgb(0 216 81)", textColor: "black" },
  "Very Suitable": { bn: "অত্যন্ত উপযুক্ত", color: "rgba(21, 128, 61, 1)", textColor: "white" },
};

const crops_names_bn = {
  Chilli: "মরিচ",
  "Boro Rice": "বোর ধান",
  "Aman Rice": "আমন ধান",
  Jute: "পাট",
  "Ground Nut": "বাদাম",
  "Onion Garlic": "পেঁয়াজ ও রসুন",
  Gram: "ছোলা",
  Sugarcane: "আখ",
  Wheat: "গম",
  Maize: "ভুট্টা",
  Mustard: "সরিষা",
  Lentil: "মসুর ডাল",
  Potato: "আলু",
  "Aus Rice": "আউস ধান",
};

const weatherTypeBn = {
  "clear sky": "পরিষ্কার আকাশ",
  "few clouds": "হালকা মেঘ",
  "scattered clouds": "বিক্ষিপ্ত মেঘ",
  "broken clouds": "ফাটা মেঘ",
  "shower rain": "বৃষ্টির ঝাপটা",
  rain: "বৃষ্টি",
  "light rain": "হালকা বৃষ্টি",
  thunderstorm: "বজ্রপাত",
  snow: "তুষারপাত",
  mist: "কুয়াশা",
  "overcast clouds": "ঘন মেঘ",
};

const GeolocationPage = () => {
  const [visible, setVisible] = useState(true);
  const [weatherVisible, setWeatherVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    location: number[];
    name: string;
  } | null>(null);
  const [suitabilityVisible, setSuitabilityVisible] = useState(false);
  const [suitability, setSuitability] = useState<{ [key: string]: Suitability } | null>(null);
  
  const [weather, setWeather] = useState<{
    temperature: string;
    humidity: string;
    wind: string;
    rainfall: string;
    weatherType: string;
  } | null>(null);

  useEffect(() => {
    setSuitability(null);
    setWeather(null);
    setVisible(true);

    if (!selectedLocation || !selectedLocation.location) return;

    // Fetch suitability data
    const suitabilityOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lon: selectedLocation.location[0], lat: selectedLocation.location[1] }),
    };
    fetch(`${serverUrl}/predict-suitability`, suitabilityOptions)
      .then((response) => response.json())
      .then((response) => setSuitability(response.predicted_suitability))
      .catch((err) => console.error(err));

    // Fetch weather data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLocation.location[1]}&lon=${selectedLocation.location[0]}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          temperature: `${data.main.temp}°C`,
          humidity: `${data.main.humidity}%`,
          wind: `${data.wind.speed} মিটার/সেকেন্ড`,
          rainfall: data.rain?.["1h"] ? `${data.rain["1h"]} মিমি` : "0 মিমি",
          weatherType: weatherTypeBn[data.weather[0].description] || "অজানা",
        });
      })
      .catch((err) => console.error(err));
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-less-dark relative">
      <Navbar />
      <header className="text-center py-6 bg-green-700 text-white">
        <h1 className="text-3xl font-bold">জিওলোকেশন ভিত্তিক সেবা</h1>
        <p>আপনার অবস্থানের উপর ভিত্তি করে নির্ভুল কৃষি পরামর্শ এবং আবহাওয়ার আপডেট প্রদান।</p>
      </header>

      {/* Map Component */}
      <div className="container mx-auto px-4 py-8">
        <GoogleMapComponent
          onLocationSelect={(data) => setSelectedLocation(data)}
          mapVisible={true}
        />

        {/* Suitability Sidebar */}
      {selectedLocation && (
        <div
          className={`fixed top-20 right-0 ${
            suitabilityVisible
              ? "w-80 p-6 bg-white dark:bg-less-dark dark:text-gray-50 shadow-lg rounded-l-lg"
              : "w-16 h-16 shadow-md shadow-green-700 bg-green-500 dark:bg-lime-500 rounded-l-full"
          }`}
          style={{
            overflow: suitabilityVisible ? "visible" : "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: suitabilityVisible ? "flex-end" : "center",
          }}
        >
          {/* Toggle Button */}
          <button
            className={`${
              suitabilityVisible ? "absolute top-6 right-6 dark:bg-less-dark" : ""
            } rounded-full p-1 bg-white shadow border`}
            onClick={() => setSuitabilityVisible(!suitabilityVisible)}
          >
            {suitabilityVisible ? <ChevronRight /> : <FaSeedling size={24} />}
          </button>

          {/* Suitability Information */}
          {suitabilityVisible && (
            <div className="mr-6">
              <h2 className="font-bold">{selectedLocation.name}</h2>
              <p>অবস্থান: {selectedLocation.location.join(", ")}</p>
              <h3 className="font-bold pt-4">প্রস্তাবিত ফসল</h3>
              <ul>
                {suitability &&
                  Object.keys(suitability).map((crop, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {crops_names_bn[crop as keyof typeof crops_names_bn]}
                      </span>
                      <span
                        style={{
                          backgroundColor:
                            suitabilityMapping[suitability[crop]].color,
                        }}
                        className="rounded px-2 text-white"
                      >
                        {suitabilityMapping[suitability[crop]].bn}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}

       {/* Weather Sidebar */}
{weather && (
  <div
    className={`fixed top-20 left-0  ${
      weatherVisible ? "w-80 p-6 bg-white dark:bg-less-dark dark:text-gray-200 shadow-lg rounded-r-lg" : "w-16 h-16 bg-green-500 dark:bg-lime-500 rounded-r-full"
    }`}
    style={{
      overflow: weatherVisible ? "visible" : "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: weatherVisible ? "flex-start" : "center",
    }}
  >
    {/* Toggle Button */}
    <button
      className={`${
        weatherVisible ? "absolute top-6 left-3 dark:bg-less-dark" : ""
      } rounded-full p-1 bg-white shadow border`}
      onClick={() => setWeatherVisible(!weatherVisible)}
    >
      {weatherVisible ? <ChevronLeft /> : <WiCloudy size={24} />} 
    </button>

    {/* Weather Information (only visible when expanded) */}
    {weatherVisible && (
      <div className="ml-6 pl-3">
        <h3 className="font-bold mb-2 ">আবহাওয়া তথ্য</h3>
        <ul className="text-sm space-y-2">
          <li>
            <Thermometer className="inline-block mr-2" />
            তাপমাত্রা: {weather.temperature}
          </li>
          <li>
            <Droplet className="inline-block mr-2" />
            আর্দ্রতা: {weather.humidity}
          </li>
          <li>
            <Wind className="inline-block mr-2" />
            বাতাস: {weather.wind} 
          </li>
          <li>
            <CloudRain className="inline-block mr-2" />
            বৃষ্টিপাত: {weather.rainfall} 
          </li>
          <li>
            <Sun className="inline-block mr-2" />
            অবস্থা: {weather.weatherType}
          </li>
        </ul>
      </div>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default GeolocationPage;
