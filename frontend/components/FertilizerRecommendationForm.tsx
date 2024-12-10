"use client";
import { fertilizersCrops, fertilizersSoilType, serverUrl } from "@/libs/const";
import { getFertilizerInfo } from "@/libs/gemini";
import {
  Bone,
  Droplet,
  Droplets,
  LeafIcon,
  ThermometerIcon,
  Wind,
} from "lucide-react";
import { FormEvent, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Spinner from "./common/Spinner";
import { useRouter } from "next/navigation";

export default function FertilizerRecommendationForm() {
    const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fertilizer, setFertilizer] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const input = {
      crop: data.crop,
      soilType: data.soilType,
      N: data.N,
      P: data.P,
      K: data.K,
      temperature: data.temperature || 28.6,
      moisture: data.moisture || 42.84,
      humidity: data.humidity || 64.55,
    };
    try {
      setLoading(true);
      setDescription("");
      setFertilizer("");
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      };

      const res = await (
        await fetch(`${serverUrl}/recommend-fertilizer`, options)
      ).json();
      console.log(res);
      setFertilizer(res.fertilizer);
      const response = await getFertilizerInfo({ crop: data.crop as string, fertilizer: res.fertilizer, N: +data.N, P: +data.P, K: +data.K });
      setDescription(response.response);
      router.push("#recommended-result");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <form
        action="POST"
        className="mx-auto max-w-2xl px-4 py-12 rounded-md bg-green-200 shadow-md shadow-green-700  shadow-green-800 dark:bg-dark dark:shadow-lg dark:shadow-green-600 "
        onSubmit={onSubmit}
      >
        <div className="w-full">
          <label htmlFor="crop" className="flex gap-1 items-center">
            <LeafIcon size={15} />{" "}
            <p>
              ফসল<span className="text-red-500">*</span>
            </p>
          </label>
          <select
            name="crop"
            id="crop"
            required
            className="mb-2 block w-full rounded-md border shadow-sm dark:text-gray-800 focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
          >
            <option value=""> সিলেক্ট করুন </option>
            {Object.keys(fertilizersCrops).map((crop) => (
              <option key={crop} value={crop}>
                {fertilizersCrops[crop as keyof typeof fertilizersCrops]}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2 ">
          <label htmlFor="soilType" className="flex gap-1 items-center ">
            <Droplet size={15} />
            <p>
              মাটির ধরণ<span className="text-red-500">*</span>
            </p>
          </label>
          <select
            name="soilType"
            id="soilType"
            className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
          >
            <option value=""> সিলেক্ট করুন </option>
            {Object.keys(fertilizersSoilType).map((soilType) => (
              <option key={soilType} value={soilType}>
                {
                  fertilizersSoilType[
                    soilType as keyof typeof fertilizersSoilType
                  ]
                }
              </option>
            ))}
          </select>
        </div>
        {/* Input for N, P, K, moisture, temperature, humidity */}
        <div className="flex flex-wrap gap-4 pt-4">
          <div>
            <label htmlFor="n" className="flex gap-1 items-center">
              নাইট্রোজেন (N)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="N"
              id="n"
              placeholder="কেজি/হেক্টর"
              required
              className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="p" className="flex gap-1 items-center">
              ফসফরাস (P)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="P"
              id="p"
              placeholder="কেজি/হেক্টর"
              required
              className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="k" className="flex gap-1 items-center">
              পটাশিয়াম (K)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="K"
              id="k"
              placeholder="কেজি/হেক্টর"
              required
              className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="temp" className="flex gap-1 items-center">
            <ThermometerIcon size={15} /> তাপমাত্রা (°C)
          </label>
          <input
            type="number"
            name="temperature"
            id="temp"
            min={0}
            step={0.01}
            className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
          />
        </div>

        <div className="w-full">
          <label htmlFor="moisture" className="flex gap-1 items-center">
            <Droplets size={15} /> মাটির আর্দ্রতা (%)
          </label>
          <input
            type="number"
            name="moisture"
            id="moisture"
            min={0}
            max={100}
            step={0.01}
            className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
          />
        </div>

        <div className="w-full">
          <label htmlFor="humidity" className="flex gap-1 items-center">
            <Wind size={15} /> বায়ুর আর্দ্রতা (%)
          </label>
          <input
            type="number"
            name="humidity"
            id="humidity"
            min={0}
            max={100}
            step={0.01}
            className="mb-2 block w-full rounded-md border dark:text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2"
          />
        </div>

        <div className="flex justify-center mt-4 w-full max-w-lg text-center mx-auto">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full max-w-lg"
            disabled={loading}
          >
            {loading ? "অপেক্ষা করুন" : "প্রেরণ করুন"}
          </button>
        </div>
      </form>

      {fertilizer ? (
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-24 m-4 rounded shadow bg-lime-50">
        <div id="recommended-result">
            <h2 className="text-center text-xl dark:text-gray-800">
                প্রস্তাবিত সার
            </h2>
            <div className="text-center text-2xl font-bold mt-4 dark:text-gray-800">{fertilizer}</div>
            {description ? (
            <div className="pt-8">
                <div data-color-mode="light">
                    <MarkdownPreview source={description} style={{backgroundColor: "transparent"}}/>
                </div>
            </div>
            )
            : <Spinner/>
            }
        </div>
        </div>
      ) : (
        <div className="py-8 text-center mx-auto flex justify-center items-center">
          <Bone
            size={150}
            className={`${loading ? "animate-spin" : ""} stroke-green-300`}
          />
        </div>
      )}
    </div>
  );
}
