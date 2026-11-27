import { Banner } from "@/components/banner"
import { CallToAction } from "@/components/cta"
import { Testimonials } from "@/components/testimonials"
import { WhyChoose } from "@/components/why-choose"

export default function Page() {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  )
}
