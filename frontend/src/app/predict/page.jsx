import Breadcrumb from "@/components/Common/Breadcrumb"
import Predict from "@/components/Predict"
import ChatModal from "@/components/Chat/ChatModal"

export const metadata = {
  title: "Real Estate Price Prediction | Predict Property Prices",
  description: "Accurately predict real estate prices using our advanced prediction model. Get insights based on location, area, and more for property investments."
  // other metadata
}

const PredictPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Predict Price"
      />
      <Predict />
    </>
  )
}

export default PredictPage
