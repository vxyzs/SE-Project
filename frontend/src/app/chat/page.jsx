import Breadcrumb from "@/components/Common/Breadcrumb"
import ChatModal from "@/components/Chat/ChatModal"

export const metadata = {
  title: "Real Estate Price Prediction | Predict Property Prices"
  // other metadata
}

const ChatPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Chat"
      />

      <ChatModal />
    </>
  )
}

export default ChatPage
