import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"

import type { Destination } from "@/types/destination"
import { FeaturedDestinationsCarousel } from "./featured-destinations-carousel"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"
const FEATURED_LIMIT = 6

async function getFeaturedDestinations(): Promise<Destination[] | null> {
  try {
    const res = await fetch(`${API_URL}/destinations`, { cache: "no-store" })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data.slice(0, FEATURED_LIMIT) : null
  } catch (error) {
    console.error("Failed to load featured destinations:", error)
    return null
  }
}

export async function FeaturedDestinations() {
  const destinations = await getFeaturedDestinations()

  return (
    <section
      id="destinations"
      aria-labelledby="featured-destinations-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#f5fafc] py-16 sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-24 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-brand uppercase ring-1 ring-brand/15">
              <Compass className="size-3.5" aria-hidden="true" />
              Top picks
            </span>
            <h2
              id="featured-destinations-heading"
              className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.03em] text-[#0c0b0b]"
            >
              Featured Destinations
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#4b5b60] sm:text-lg">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="group inline-flex h-12 w-fit items-stretch overflow-hidden rounded-xl border border-brand/30 bg-white text-xs font-semibold tracking-[0.1em] text-brand uppercase shadow-sm transition-all hover:border-brand hover:shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span className="flex items-center px-5">All destinations</span>
            <span className="flex w-12 items-center justify-center bg-brand text-white transition-colors group-hover:bg-[#1290ab]">
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </header>

        <div className="mt-10 lg:mt-12">
          {destinations && destinations.length > 0 ? (
            <FeaturedDestinationsCarousel destinations={destinations} />
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 bg-white py-16 text-center">
              <p className="text-[#0c0b0b]">
                {destinations
                  ? "No destinations yet."
                  : "Could not load destinations."}
              </p>
              {!destinations && (
                <p className="mt-1 text-sm text-[#6b7b80]">
                  Make sure the server is running at {API_URL}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
