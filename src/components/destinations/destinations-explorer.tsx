"use client"

import { useMemo, useState } from "react"

import { getPriceNumber } from "@/lib/destinations"
import type { Destination } from "@/types/destination"
import { DestinationCard } from "./destination-card"
import { DestinationFilters, PRICE_RANGES } from "./destination-filters"

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[]
}) {
  const [category, setCategory] = useState("all")
  const [price, setPrice] = useState("all")
  const [sort, setSort] = useState("default")

  const categories = useMemo(
    () =>
      Array.from(new Set(destinations.map((d) => d.category))).filter(Boolean),
    [destinations]
  )

  const visible = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === price) ?? PRICE_RANGES[0]

    const filtered = destinations.filter((d) => {
      const p = getPriceNumber(d.price)
      return (
        (category === "all" || d.category === category) &&
        p >= range.min &&
        p < range.max
      )
    })

    switch (sort) {
      case "price-asc":
        return [...filtered].sort(
          (a, b) => getPriceNumber(a.price) - getPriceNumber(b.price)
        )
      case "price-desc":
        return [...filtered].sort(
          (a, b) => getPriceNumber(b.price) - getPriceNumber(a.price)
        )
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [destinations, category, price, sort])

  return (
    <section>
      <DestinationFilters
        categories={categories}
        category={category}
        price={price}
        sort={sort}
        onCategoryChange={setCategory}
        onPriceChange={setPrice}
        onSortChange={setSort}
      />

      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
        Showing {visible.length}{" "}
        {visible.length === 1 ? "destination" : "destinations"}
      </p>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <DestinationCard key={d._id} destination={d} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-border py-16 text-center">
          <p className="text-ink">No destinations match these filters.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all")
              setPrice("all")
              setSort("default")
            }}
            className="mt-3 text-sm text-brand underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}
