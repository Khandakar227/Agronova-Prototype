"use client"
import Navbar from "@/components/common/Navbar";
import Spinner from "@/components/common/Spinner";
import CropRecommendationForm from "@/components/CropRecommendationForm";
import { useState } from "react";

export default function CropRecommendation() {
  const [crop, setCrop] = useState("");
  const [cropDetail, setCropDetail] = useState(null as { name: string; description: string } | null);

  return (
    <div className="dark:bg-less-dark">
      <Navbar />
      <h1 className="text-3xl font-bold text-center py-4 mx-auto max-w-2xl dark:text-gray-200">
        We provide recommendations on which crop to grow based on soil and environmental data
      </h1>

      <div className="py-5 px-8 flex gap-4 justify-center max-w-5xl mx-auto ">
        <CropRecommendationForm setCrop={setCrop} setCropDetail={setCropDetail} />
        {crop && (
          <div className="p-8 rounded shadow-lg shadow-green-700 bg-green-200 flex-1 mx-6 dark:text-gray-200 dark:bg-dark dark:shadow-md dark:shadow-green-600 ">
            <p>The suitable crop for you is:</p>
            <h1 className="text-2xl font-semibold pb-4 dark:text-gray-200"> {crop} </h1>
            <h1 className="text-2xl font-bold dark:text-gray-200">{cropDetail?.name}</h1>
            {!cropDetail && <Spinner />}
            {cropDetail && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold dark:text-gray-200">Crop Description:</h2>
                <p>{cropDetail.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
