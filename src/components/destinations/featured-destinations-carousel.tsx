"use client"

import { useCallback, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Compass,
  MapPin,
  Star,
} from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { getPriceNumber } from "@/lib/destinations"
import { formatDeparture } from "@/lib/packages"
import type { Destination } from "@/types/destination"

// The API does not return a rating yet; fall back to the design's 4.5.
type FeaturedDestination = Destination & { rating?: number }

const DEFAULT_RATING = 4.5

function formatCardPrice(price: Destination["price"]) {
  const n = getPriceNumber(price)
  return n > 0 ? `$${n.toLocaleString()}` : String(price)
}

function useCarouselProgress(api: CarouselApi) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {}
      api.on("select", onChange)
      api.on("reInit", onChange)
      return () => {
        api.off("select", onChange)
        api.off("reInit", onChange)
      }
    },
    [api]
  )

  const index = useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0
  )
  const count = useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0
  )

  return { index, count }
}

function FeaturedCard({ destination }: { destination: FeaturedDestination }) {
  const {
    _id,
    name,
    country,
    category,
    price,
    duration,
    departure,
    imageUrl,
    rating,
  } = destination
  const departureLabel = formatDeparture(departure)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_44px_-28px_rgba(12,11,11,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-[0_28px_60px_-28px_rgba(21,161,191,0.45)]">
      {/* Image */}
      <div className="relative aspect-[376/240] overflow-hidden bg-[#eff9fc]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-[#eff9fc] to-[#d6f1f8] text-brand/60">
            <Compass className="size-8" aria-hidden="true" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
        />

        {category && (
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase shadow-sm ring-1 ring-white/60 backdrop-blur-md">
            {category}
          </span>
        )}

        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#0c0b0b]/55 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md">
          <Star
            className="size-3.5 fill-amber-300 text-amber-300"
            aria-hidden="true"
          />
          {rating ?? DEFAULT_RATING}
        </span>

        <p className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white drop-shadow">
          <MapPin className="size-4" aria-hidden="true" />
          {country}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-xl leading-snug tracking-[-0.01em] text-[#0c0b0b] transition-colors group-hover:text-brand">
          {name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eff9fc] px-3 py-1 text-xs font-medium text-[#3d6b78] ring-1 ring-brand/10">
            <Clock3 className="size-3.5 text-brand" aria-hidden="true" />
            {duration}
          </p>

          {departureLabel ? (
            <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eff9fc] px-3 py-1 text-xs font-medium text-[#3d6b78] ring-1 ring-brand/10">
              <CalendarDays
                className="size-3.5 text-brand"
                aria-hidden="true"
              />
              <span className="sr-only">Departs </span>
              {departureLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-dashed border-black/10 pt-5">
          <div className="mt-5">
            <p className="text-[10px] font-medium tracking-[0.14em] text-[#8a999e] uppercase">
              Starting from
            </p>
            <p className="font-heading text-2xl leading-tight text-[#0c0b0b]">
              {formatCardPrice(price)}
              <span className="ml-1 text-xs font-normal text-[#6b7b80]">
                / person
              </span>
            </p>
          </div>

          <Link
            href={`/destinations/${_id}`}
            aria-label={`Book ${name}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] transition-all group-hover:bg-[#1290ab] after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Book now
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

const controlClassName =
  "inline-flex size-11 items-center justify-center rounded-full border border-brand/25 bg-white text-brand shadow-sm transition-all hover:bg-brand hover:text-white hover:shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:border-black/10 disabled:text-[#b9c6ca] disabled:shadow-none"

export function FeaturedDestinationsCarousel({
  destinations,
}: {
  destinations: FeaturedDestination[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const { index, count } = useCarouselProgress(api)

  const total = count || destinations.length
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", containScroll: "trimSnaps" }}
      aria-label="Featured destinations"
    >
      {/* Bleed to the right edge so the next card peeks in */}
      <div className="-mr-4 pb-8 sm:-mr-6 lg:-mr-12">
        <CarouselContent className="-ml-5">
          {destinations.map((destination) => (
            <CarouselItem
              key={destination._id}
              className="basis-[88%] pl-5 sm:basis-[46%]"
            >
              <FeaturedCard destination={destination} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      <div className="flex items-center gap-5 sm:gap-6">
        <p
          className="font-heading text-2xl text-[#0c0b0b] tabular-nums"
          aria-live="polite"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-base text-[#8a999e]">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </p>

        <div
          className="relative h-1 flex-1 overflow-hidden rounded-full bg-brand/10"
          role="presentation"
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-[#4cc1d8] transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous destination"
            className={controlClassName}
            disabled={index === 0}
            onClick={() => api?.scrollPrev()}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next destination"
            className={controlClassName}
            disabled={index >= total - 1}
            onClick={() => api?.scrollNext()}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Carousel>
  )
}
