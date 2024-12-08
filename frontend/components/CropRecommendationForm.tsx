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
const CropRrecommendationForm = ({ setCrop, setCropDetail }:FormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    soilDepth: "medium (50-150 cm)",
    soilTexture: "medium",
    soilFertility: "moderate",
    soilSalinity: "medium (4-10 dS/m)",
    soilDrainage: "medium (4-10 dS/m)",
    temperature: "",
    rainfall: "",
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
            headers: {'Content-Type': 'application/json'},
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
      className="max-w-md w-full mx-auto p-4 bg-green-200 shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      {Object.entries(cropRecommendationOptions).map(([key, values]) => (
        <div className="mb-4" key={key}>
          <label
            htmlFor={key}
            className="block text-xs font-medium text-gray-700"
          >
            {key === "soilDepth" && "মাটির গভীরতা"}
            {key === "soilTexture" && "মাটির গঠন"}
            {key === "soilFertility" && "মাটির উর্বরতা"}
            {key === "soilSalinity" && "মাটির লবণাক্ততা"}
            {key === "soilDrainage" && "মাটির নিষ্কাশন"}
            {key === "lightIntensity" && "আলোর তীব্রতা"}
          </label>
          <select
            id={key}
            name={key}
            value={formData[key as keyof FormData]}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            required
          >
            <option value="">নির্বাচন করুন...</option>
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
          className="block text-sm font-medium text-gray-700"
        >
          তাপমাত্রা (°C)
        </label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="rainfall"
          className="block text-sm font-medium text-gray-700"
        >
          বৃষ্টিপাত (মিমি)
        </label>
        <input
          type="number"
          id="rainfall"
          name="rainfall"
          value={formData.rainfall}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="soilPH"
          className="block text-sm font-medium text-gray-700"
        >
          মাটির পিএইচ (০-১৪)
        </label>
        <input
          type="number"
          id="soilPH"
          name="soilPH"
          value={formData.soilPH}
          onChange={handleChange}
          className="mt-1 p-1 block w-full rounded-md border shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          min="0"
          max="14"
          step={0.001}
          required
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {
            loading ? 'অপেক্ষা করুন' : 'জমা দিন'
        }
      </button>
    </form>
  );
};

export default CropRrecommendationForm;
