"use client"
import Navbar from "@/components/common/Navbar";
import Spinner from "@/components/common/Spinner";
import CropRrecommendationForm from "@/components/CropRecommendationForm";
import { useState } from "react";

export default function CropRecommendation() {
  const [crop, setCrop] = useState("");
  const [cropDetail, setCropDetail] = useState(null as { name: string; description: string } | null);

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-center py-4 mx-auto max-w-2xl">
        মাটি ও পরিবেশগত তথ্যের ভিত্তিতে কোন ফসল চাষ করা উচিত তা আমরা পরামর্শ দেই
      </h1>

      <div className="py-5 px-4 flex gap-4 justify-center max-w-5xl mx-auto">
        <CropRrecommendationForm setCrop={setCrop} setCropDetail={setCropDetail} />
        {crop && (
          <div className="p-4 rounded shadow bg-white flex-1">
            <p>আপনার জন্য উপযোগী ফসলটি হল:</p>
            <h1 className="text-2xl font-semibold pb-4"> {crop} </h1>
            <h1 className="text-2xl font-bold">{cropDetail?.name}</h1>
            {!cropDetail && <Spinner/>}
            {cropDetail && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold">ফসলের বিবরণ:</h2>
                <p>{cropDetail.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
