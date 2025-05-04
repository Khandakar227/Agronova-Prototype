"use client";
import { cropRecommendationOptions, serverUrl } from "@/libs/const";
import { getCropDetails } from "@/libs/gemini";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  soilDepth: string;
  soilTexture: string;
  soilFertility: string;
  soilSalinity: string;
  soilDrainage: string;
  temperature: string;
  rainfall: string;
  lightIntensity: string;
  soilPH: string;
}

interface FormProps {
  setCrop: (crop: string) => void;
  setCropDetail: (cropDetail: { name: string; description: string } | null) => void;
}

const CropRecommendationForm = ({ setCrop, setCropDetail }: FormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    soilDepth: "medium (50-150 cm)",
    soilTexture: "medium",
    soilFertility: "moderate",
    soilSalinity: "medium (4-10 dS/m)",
    soilDrainage: "medium (4-10 dS/m)",
    temperature: "21",
    rainfall: "0",
    lightIntensity: "clear skies",
    soilPH: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setCrop("");
      setCropDetail(null);
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };

      const res = await fetch(`${serverUrl}/predict-crop`, options)
      const data = await res.json();
      console.log(data);
      setCrop(data.predicted_crop);

      const cropDetails = await getCropDetails(data.predicted_crop);
      setCropDetail(cropDetails.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-xl w-full mx-auto p-4  dark:bg-dark shadow-md shadow-green-700 bg-green-200 rounded-md dark:shadow-md dark:shadow-green-600"
      onSubmit={handleSubmit}
    >
      {Object.entries(cropRecommendationOptions).map(([key, values]) => (
        <div className="mb-4" key={key}>
          <label
            htmlFor={key}
            className="block text-xs font-medium text-gray-700 dark:bg-dark dark:text-gray-200"
          >
            {key === "soilDepth" && "Soil Depth"}
            {key === "soilTexture" && "Soil Texture"}
            {key === "soilFertility" && "Soil Fertility"}
            {key === "soilSalinity" && "Soil Salinity"}
            {key === "soilDrainage" && "Soil Drainage"}
            {key === "lightIntensity" && "Light Intensity"}
          </label>
          <select
            id={key}
            name={key}
            value={formData[key as keyof FormData]}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            required
          >
            <option value="">Select...</option>
            {values.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="mb-4">
        <label
          htmlFor="temperature"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Temperature (°C)
        </label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="rainfall"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Rainfall (mm)
        </label>
        <input
          type="number"
          id="rainfall"
          name="rainfall"
          value={formData.rainfall}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="soilPH"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Soil pH (0-14)
        </label>
        <input
          type="number"
          id="soilPH"
          name="soilPH"
          value={formData.soilPH}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          min="0"
          max="14"
          step={0.001}
          required
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-green-600 dark:bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        {
          loading ? 'Please wait' : 'Submit'
        }
      </button>
    </form>
  );
};

export default CropRecommendationForm;
