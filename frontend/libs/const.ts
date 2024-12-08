export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const cropRecommendationOptions = {
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

export const fertilizersSoilType = {
    "Black": "কালো মাটি (Kalo Mati)",
    "Clayey": "আর্দ্র মাটি (Ardra Mati)",
    "Loamy": "দোআঁশ মাটি (Doansh Mati)",
    "Red": "লাল মাটি (Lal Mati)",
    "Sandy": "বেলে মাটি (Bele Mati)",
}

export const fertilizersCrops = {
    "Barley": "যব",
    "Cotton": "পাট",
    "Ground Nuts": "চিনা বাদাম",
    "Maize": "ভুট্টা",
    "Millets": "বাজরা",
    "Oil seeds": "তেলবীজ",
    "Paddy": "ধান",
    "Pulses": "ডাল",
    "Sugarcane": "আখ",
    "Tobacco": "তামাক",
    "Wheat": "গম",
    "coffee": "কফি",
    "kidneybeans": "রাজমা",
    "orange": "কমলা",
    "pomegranate": "আনার বা ডালিম",
    "rice": "চাল",
    "watermelon": "তরমুজ"
  };
  