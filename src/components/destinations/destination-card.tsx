import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"

import { formatPrice } from "@/lib/destinations"
import type { Destination } from "@/types/destination"

export function DestinationCard({ destination }: { destination: Destination }) {
  const { _id, name, country, category, price, duration, imageUrl } =
    destination

  return (
    <article className="group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-banner-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-sm bg-white/80 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-sm">
          {category}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden />
          {country}
        </p>

        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-normal text-ink">{name}</h2>
          <p className="shrink-0 text-lg text-ink">
            {formatPrice(price)}
            <span className="ml-0.5 text-xs text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden />
          {duration}
        </p>

        <Link
          href={`/destinations/${_id}`}
          className="inline-flex items-center gap-1.5 border-b border-brand pt-1 pb-0.5 text-sm text-brand transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Book now
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
