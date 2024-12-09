"use client";
import { serverUrl } from "@/libs/const";
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

const options = {
    soilDepth: [
      { value: "medium (50-150 cm)", label: "মাঝারি (৫০-১৫০ সেমি)" },
      { value: "deep (>>150 cm)", label: "গভীর (>>১৫০ সেমি)" },
      { value: "shallow (20-50 cm)", label: "অগভীর (২০-৫০ সেমি)" },
    ],
    soilTexture: [
      { value: "medium", label: "মাঝারি" },
      { value: "light", label: "হালকা" },
      { value: "heavy", label: "ভারী" },
      { value: "organic", label: "জৈব" },
      { value: "wide", label: "প্রশস্ত" },
    ],
    soilFertility: [
      { value: "moderate", label: "মাঝারি" },
      { value: "high", label: "উচ্চ" },
      { value: "low", label: "কম" },
    ],
    soilSalinity: [
      { value: "low (<4 dS/m)", label: "কম (<৪ dS/m)" },
      { value: "medium (4-10 dS/m)", label: "মাঝারি (৪-১০ dS/m)" },
      { value: "high (>10 dS/m))", label: "উচ্চ (>১০ dS/m)" },
      { value: "none", label: "কোনোটি নয়" },
    ],
    soilDrainage: [
      { value: "low (<4 dS/m)", label: "কম (<৪ dS/m)" },
      { value: "medium (4-10 dS/m)", label: "মাঝারি (৪-১০ dS/m)" },
      { value: "high (>10 dS/m))", label: "উচ্চ (>১০ dS/m)" },
      { value: "none", label: "কোনোটি নয়" },
    ],
    lightIntensity: [
      { value: "very bright", label: "অত্যন্ত উজ্জ্বল" },
      { value: "clear skies", label: "পরিষ্কার আকাশ" },
      { value: "cloudy skies", label: "মেঘাচ্ছন্ন আকাশ" },
      { value: "light shade", label: "হালকা ছায়া" },
      { value: "heavy shade", label: "গভীর ছায়া" },
    ],
  };

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
      className="max-w-md w-full mx-auto p-4 bg-green-200 dark:bg-gray-800 shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      {Object.entries(options).map(([key, values]) => (
        <div className="mb-4" key={key}>
          <label
            htmlFor={key}
            className="block text-xs font-medium text-gray-700 dark:text-gray-200"
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
            className="mt-2 block w-full rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
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
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          তাপমাত্রা (°C)
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
          বৃষ্টিপাত (মিমি)
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
          মাটির পিএইচ (০-১৪)
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
            loading ? 'অপেক্ষা করুন' : 'জমা দিন'
        }
      </button>
    </form>
  );
};

export default CropRrecommendationForm;
