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
  Loader,
} from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { serverUrl } from "@/libs/const";

type Suitability =
  | "Not Suitable"
  | "Moderately Suitable"
  | "Suitable"
  | "Very Suitable";

const suitabilityMapping = {
  "Not Suitable": {
    en: "Not Suitable",
    color: "rgba(239, 68, 68, 1)",
    textColor: "black",
  },
  "Moderately Suitable": {
    en: "Moderately Suitable",
    color: "rgba(253, 224, 71, 1)",
    textColor: "black",
  },
  Suitable: { en: "Suitable", color: "rgb(0 216 81)", textColor: "black" },
  "Very Suitable": {
    en: "Very Suitable",
    color: "rgba(21, 128, 61, 1)",
    textColor: "white",
  },
};

const crops_names_en = {
  Chilli: "Chili",
  "Boro Rice": "Boro Rice",
  "Aman Rice": "Aman Rice",
  Jute: "Jute",
  "Ground Nut": "Ground Nut",
  "Onion Garlic": "Onion & Garlic",
  Gram: "Gram",
  Sugarcane: "Sugarcane",
  Wheat: "Wheat",
  Maize: "Maize",
  Mustard: "Mustard",
  Lentil: "Lentil",
  Potato: "Potato",
  "Aus Rice": "Aus Rice",
};

const weatherTypeEn = {
  "clear sky": "Clear Sky",
  "few clouds": "Few Clouds",
  "scattered clouds": "Scattered Clouds",
  "broken clouds": "Broken Clouds",
  "shower rain": "Shower Rain",
  rain: "Rain",
  "light rain": "Light Rain",
  thunderstorm: "Thunderstorm",
  snow: "Snow",
  mist: "Mist",
  "overcast clouds": "Overcast Clouds",
};

const GeolocationPage = () => {
  const [visible, setVisible] = useState(true);
  const [weatherVisible, setWeatherVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<{
    location: number[];
    name: string;
  } | null>(null);
  const [suitabilityVisible, setSuitabilityVisible] = useState(false);
  const [suitability, setSuitability] = useState<{
    [key: string]: Suitability;
  } | null>(null);
  const [recommendationDesc, setRecommendationDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      body: JSON.stringify({
        lon: selectedLocation.location[0],
        lat: selectedLocation.location[1],
      }),
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
          wind: `${data.wind.speed} m/s`,
          rainfall: data.rain?.["1h"] ? `${data.rain["1h"]} mm` : "0 mm",
          weatherType:
            weatherTypeEn[
              data.weather[0].description as keyof typeof weatherTypeEn
            ] || "Unknown",
        });
      })
      .catch((err) => console.error(err));
  }, [selectedLocation]);

  useEffect(() => {
    if (!selectedLocation) return;
    setRecommendationDesc("");
    setLoading(true);
    fetch(
      `/api/climate-geo?lat=${selectedLocation.location[1]}&lng=${selectedLocation.location[0]}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecommendationDesc(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-less-dark relative">
      <Navbar />
      <header className="text-center py-6 bg-green-700 text-white">
        <h1 className="text-3xl font-bold">Geolocation Based Services</h1>
        <p>
          Providing accurate agricultural advice and weather updates based on
          your location.
        </p>
      </header>

      {/* Map Component */}
      <div className="container mx-auto px-4 py-8">
        <GoogleMapComponent
          onLocationSelect={(data) => setSelectedLocation(data)}
          mapVisible={true}
        />

        {/* Suitability Sidebar */}
        {selectedLocation && (
          <>
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
                  suitabilityVisible
                    ? "absolute top-6 right-6 dark:bg-less-dark"
                    : ""
                } rounded-full p-1 bg-white shadow border`}
                onClick={() => setSuitabilityVisible(!suitabilityVisible)}
              >
                {suitabilityVisible ? (
                  <ChevronRight />
                ) : (
                  <FaSeedling size={24} />
                )}
              </button>

              {/* Suitability Information */}
              {suitabilityVisible && (
                <div className="mr-6">
                  <h2 className="font-bold">{selectedLocation.name}</h2>
                  <p>Location: {selectedLocation.location.join(", ")}</p>
                  <h3 className="font-bold pt-4">Suggested Crops</h3>
                  <ul>
                    {suitability &&
                      Object.keys(suitability).map((crop, i) => (
                        <li key={i} className="flex justify-between">
                          <span>
                            {
                              crops_names_en[
                                crop as keyof typeof crops_names_en
                              ]
                            }
                          </span>
                          <span
                            style={{
                              backgroundColor:
                                suitabilityMapping[suitability[crop]].color,
                            }}
                            className="rounded px-2 text-white"
                          >
                            {suitabilityMapping[suitability[crop]].en}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {/* Weather Sidebar */}
        {weather && (
          <div
            className={`fixed top-20 left-0  ${
              weatherVisible
                ? "w-80 p-6 bg-white dark:bg-less-dark dark:text-gray-200 shadow-lg rounded-r-lg"
                : "w-16 h-16 shadow-md shadow-green-700 bg-green-500 dark:bg-lime-500 rounded-r-full"
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
                <h3 className="font-bold mb-2 ">Weather Information</h3>
                <ul className="text-sm space-y-2">
                  <li>
                    <Thermometer className="inline-block mr-2" />
                    Temperature: {weather.temperature}
                  </li>
                  <li>
                    <Droplet className="inline-block mr-2" />
                    Humidity: {weather.humidity}
                  </li>
                  <li>
                    <Wind className="inline-block mr-2" />
                    Wind: {weather.wind}
                  </li>
                  <li>
                    <CloudRain className="inline-block mr-2" />
                    Rainfall: {weather.rainfall}
                  </li>
                  <li>
                    <Sun className="inline-block mr-2" />
                    Condition: {weather.weatherType}
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="p-4 m-4 bg-white rounded shadow-sm">
          {loading && (
            <div className="flex items-center justify-center h-16">
              <Loader className="animate-spin"/>
            </div>
          )}
          {recommendationDesc && (
            <MarkdownPreview
              source={recommendationDesc}
              style={{ backgroundColor: "transparent", color: "black" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GeolocationPage;
