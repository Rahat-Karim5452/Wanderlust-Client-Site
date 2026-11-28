import { Banner } from "@/components/home/banner"
import { CallToAction } from "@/components/home/cta"
import { FeaturedDestinations } from "@/components/destinations/featured-destinations"

import { Testimonials } from "@/components/home/testimonials"
import { WhyChoose } from "@/components/home/why-choose"

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
