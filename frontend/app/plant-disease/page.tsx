"use client";
import Navbar from "@/components/common/Navbar";
import { serverUrl } from "@/libs/const";
import { getPlantDiseaseInfo } from "@/libs/gemini";
import { Image as ImageIcon } from "lucide-react";
import NexItmage from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Spinner from "@/components/common/Spinner";

function PlantDisease() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<
    { crop: string; disease: string; confidence: number }[] | null
  >(null);
  const [description, setDescription] = useState<string>("");
  const [showDesc, setShowDesc] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setFile(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const data = canvas.toDataURL("image/jpeg");
            setImage(data);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const openFile = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const clearImage = () => {
    setImage(null);
    setFile(null);
    setPrediction(null);
  };
  const uploadFile = async () => {
    try {
      setLoading(true);
      setPrediction(null);
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${serverUrl}/predict-disease`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setPrediction(data.predictions);
      location.href = `#predictions`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const knowDescription = async (data: any) => {
    setShowDesc(true);
    const desc = await getPlantDiseaseInfo({
      crop: data.crop,
      disease: data.disease,
    });
    setDescription(desc.response);
  };

  const closeDescription = () => {
    setShowDesc(false)
    setDescription("")
  }
  return (
    <>
      <div className="dark:bg-dark dark:text-white bg-white min-h-screen w-full">
        <Navbar />
        <div className="py-12 mx-auto max-w-3xl px-4">
          <h1 className="text-center text-3xl">
            গাছের রোগ সনাক্তকরণে আধুনিক প্রযুক্তি
          </h1>
          <p className="text-center mx-auto max-w-3xl py-4">
            স্মার্টফোন বা ইন্টারনেট সংযুক্ত ডিভাইসের মাধ্যমে গাছের পাতার ছবি
            আপলোড করুন। সঠিক তথ্য ও প্রতিরোধের পদ্ধতি সরবরাহ করে এটি আপনাকে
            স্বাস্থ্যকর ফসল উৎপাদনে সহায়তা করবে।
          </p>
          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <NexItmage
              className="mx-auto"
              src={"/assets/disease_plant_samples.png"}
              height={400}
              width={400}
              alt="disease_plant_samples"
            />
            {image ? (
              <div className="flex flex-col gap-4 justify-center items-center p-4">
                <div className="flex justify-end items-center w-full">
                  <button onClick={clearImage}>
                    <IoCloseCircle size={24} />
                  </button>
                </div>
                <img
                  src={image}
                  alt="disease_plant"
                  className="rounded-md max-w-64 mx-auto"
                />
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-950 dark:text-white text-gray-900 rounded-md p-2 w-full flex justify-center items-center">
                <button
                  onClick={openFile}
                  type="button"
                  className="hover:bg-green-200 dark:hover:bg-green-700 w-full text-center flex flex-col justify-center items-center gap-4 border border-green-950 dark:border-white border-dashed rounded-md py-12 px-4"
                >
                  <ImageIcon className="opacity-50" size={54} />
                  <p>ছবি আপলোড করুন</p>
                </button>
              </div>
            )}
          </div>
          {file && (
            <button
              onClick={uploadFile}
              className="px-4 py-2 rounded-md font-bold bg-green-500 w-full my-2"
              disabled={loading}
            >
              {" "}
              {loading ? "প্রসেসিং..." : "শনাক্ত করুন"}{" "}
            </button>
          )}
          <input
            onChange={handleFile}
            ref={inputRef}
            type="file"
            name="file"
            id="file"
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="py-12 px-4" id="predictions">
          {prediction && prediction.length && (
            <>
              <h2 className="text-center text-2xl font-bold">সম্ভাব্য রোগ</h2>
              <div className="flex flex-col gap-4 justify-center items-center p-4">
                {prediction?.map((p, i) => (
                  <div
                    key={i}
                    className="shadow bg-green-50 dark:bg-green-950 dark:text-white text-gray-900 rounded-md p-2 w-full flex flex-col justify-center items-center gap-2"
                  >
                    <h3 className="text-xl">ফসল: {p.crop}</h3>
                    <h3 className="text-xl">রোগ: {p.disease}</h3>
                    <div className="border w-full mx-auto max-w-lg bg-gray-200 shadow inset-1 rounded-full overflow-hidden">
                      <div
                        style={{ width: (p.confidence * 100).toFixed(2) + "%" }}
                        className="py-1 bg-green-500"
                      />
                    </div>
                    <div
                      className="w-full text-end px-4"
                      onClick={() => knowDescription(p)}
                    >
                      <button className="bg-green-700 p-1 rounded shadow text-xs">
                        {" "}
                        আরো জানুন{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className={`${
            showDesc ? "" : "hidden"
          } fixed z-10 top-0 left-0 right-0 bottom-0 min-h-screen bg-gray-950 bg-opacity-15`}
        >
          <div className="mx-auto z-30 h-[90vh] overflow-y-auto bg-white dark:bg-dark dark:text-white rounded-md p-4 shadow max-w-4xl">
            <div className="flex justify-end">
              <button onClick={closeDescription}>
                <IoCloseCircle size={24} />
              </button>
            </div>
            {description ? (
              <div className="mx-auto max-w-2xl px-4 pb-8 pt-24 m-4 rounded shadow bg-lime-50">
                <div data-color-mode="light">
                  <MarkdownPreview
                    source={description}
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-center mx-auto">Loading description...</p>
                <Spinner />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlantDisease;
