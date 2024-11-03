import AboutSectionOne from "@/components/About/AboutSectionOne"
import AboutSectionTwo from "@/components/About/AboutSectionTwo"
import ScrollUp from "@/components/Common/ScrollUp"
import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Video from "@/components/Video"

export const metadata = {
  title: "Home"
  // other metadata
}

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  )
}
