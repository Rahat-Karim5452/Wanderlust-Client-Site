import { Banner } from "@/components/banner"
import { CallToAction } from "@/components/cta"
import { FeaturedDestinations } from "@/components/destinations/featured-destinations"

import { Testimonials } from "@/components/testimonials"
import { WhyChoose } from "@/components/why-choose"

export default function Page() {
  return (
    <>
      <Banner />
      <FeaturedDestinations />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  )
}
