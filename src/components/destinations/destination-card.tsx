import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Compass,
  MapPin,
} from "lucide-react"

import { formatPrice } from "@/lib/destinations"
import { formatDeparture } from "@/lib/packages"
import type { Destination } from "@/types/destination"

export function DestinationCard({ destination }: { destination: Destination }) {
  const { _id, name, country, category, price, duration, departure, imageUrl } =
    destination
  const departureLabel = formatDeparture(departure)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_44px_-28px_rgba(12,11,11,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/20 hover:shadow-[0_28px_60px_-28px_rgba(21,161,191,0.45)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eff9fc]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#eff9fc] to-[#d6f1f8] text-brand/60">
            <Compass className="size-8" aria-hidden />
            <span className="text-xs font-medium tracking-wide uppercase">
              No image
            </span>
          </div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
        />

        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase shadow-sm ring-1 ring-white/60 backdrop-blur-md">
          {category}
        </span>

        <p className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white drop-shadow">
          <MapPin className="size-4" aria-hidden />
          {country}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="font-heading text-xl leading-snug tracking-[-0.01em] text-[#0c0b0b] transition-colors group-hover:text-brand">
          {name}
        </h2>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eff9fc] px-3 py-1 text-xs font-medium text-[#3d6b78] ring-1 ring-brand/10">
            <Clock3 className="size-3.5 text-brand" aria-hidden />
            {duration}
          </p>

          {departureLabel ? (
            <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#eff9fc] px-3 py-1 text-xs font-medium text-[#3d6b78] ring-1 ring-brand/10">
              <CalendarDays className="size-3.5 text-brand" aria-hidden />
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
              {formatPrice(price)}
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
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
