"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

import person1 from "@/assets/person1.png"
import person2 from "@/assets/person2.png"
import man1 from "@/assets/testimonials/man-1.jpg"
import man2 from "@/assets/testimonials/man-2.jpg"
import woman1 from "@/assets/testimonials/woman-1.jpg"
import woman2 from "@/assets/testimonials/woman-2.jpg"

type Testimonial = {
  quote: string
  name: string
  location: string
  image: StaticImageData
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: person2,
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: person1,
  },
  {
    quote:
      "Morocco stole my heart. From the riads in Marrakech to the quiet dunes of Merzouga, every day felt thoughtfully curated.",
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    image: woman1,
  },
  {
    quote:
      "Iceland's northern lights trip was seamless — a small group, a brilliant guide, and a hot spring under the stars I will never forget.",
    name: "Lucas Meyer",
    location: "Berlin, Germany",
    image: man1,
  },
  {
    quote:
      "Kyoto in cherry blossom season was pure poetry. Wanderlust handled the crowds, the trains, everything — we just enjoyed it.",
    name: "Priya Nair",
    location: "Mumbai, India",
    image: woman2,
  },
  {
    quote:
      "Patagonia exceeded every expectation. A tough trek, effortless logistics, and a team that genuinely cared about the experience.",
    name: "Daniel Osei",
    location: "Accra, Ghana",
    image: man2,
  },
]

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  })
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect).on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect)
    }
  }, [emblaApi])

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-white pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <header className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eff9fc] px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-brand uppercase ring-1 ring-brand/15">
              Testimonials
            </span>
            <h2
              id="testimonials-heading"
              className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[#0c0b0b]"
            >
              What Travelers Say
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4b5b60] sm:text-lg">
              Real experiences from our happy travelers.
            </p>
          </header>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonials"
              className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#0c0b0b] transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonials"
              className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#0c0b0b] transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="mt-10 sm:mt-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Traveler testimonials"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${testimonials.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-5 lg:basis-1/2"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_24px_60px_-32px_rgba(12,11,11,0.35)] sm:flex-row">
                    <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:gap-5 sm:p-6">
                      <div>
                        <div
                          className="flex items-center gap-1 text-brand"
                          aria-label="Rated 5 out of 5"
                        >
                          {Array.from({ length: 5 }).map((_, star) => (
                            <Star
                              key={star}
                              className="size-3.5 fill-current"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <blockquote className="mt-3 font-heading text-[15px] leading-[1.55] tracking-[-0.01em] text-[#0c0b0b] sm:text-base">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      </div>

                      <footer className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-px w-7 bg-brand"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#0c0b0b]">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-[#6b7b80]">
                            {testimonial.location}
                          </p>
                        </div>
                      </footer>
                    </div>

                    <div className="relative aspect-square w-full sm:aspect-auto sm:w-[35%] sm:shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={`Portrait of ${testimonial.name}`}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover object-center"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                      />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={selected === index}
                className={
                  selected === index
                    ? "h-2 w-7 rounded-full bg-brand transition-all"
                    : "h-2 w-2 rounded-full bg-black/15 transition-all hover:bg-black/30"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
