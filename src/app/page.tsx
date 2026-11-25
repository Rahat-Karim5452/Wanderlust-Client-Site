import { Banner } from "@/components/banner"
import { CallToAction } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Testimonials } from "@/components/testimonials"
import { WhyChoose } from "@/components/why-choose"

export default function Page() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  )
}
