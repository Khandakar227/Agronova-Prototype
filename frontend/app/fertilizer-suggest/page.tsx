import Navbar from "@/components/common/Navbar";
import FertilizerRecommendationForm from "@/components/FertilizerRecommendationForm";

export default function FertilizerSuggest() {
  return (
    <div className="dark:bg-less-dark dark:text-white">
      <Navbar />
      <div className="py-4">
        <h1 className="text-4xl font-bold text-center py-4">Fertilizer Recommendation Based on Suggestions</h1>
        <FertilizerRecommendationForm />
      </div>
    </div>
  )
}
