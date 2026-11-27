import type { Metadata } from "next"
import Link from "next/link"
import { Compass, Plus } from "lucide-react"

import { DestinationsExplorer } from "@/components/destinations/destinations-explorer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Destination } from "@/types/destination"

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlust",
  description:
    "Find your perfect travel experience from our curated collection of destinations.",
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

async function getDestinations(): Promise<Destination[] | null> {
  try {
    const res = await fetch(`${API_URL}/destinations`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data : null
  } catch (error) {
    console.error("Failed to load destinations:", error)
    return null
  }
}

const AllDestinationsPage = async () => {
  const destinations = await getDestinations()

  return (
    <main className="relative isolate overflow-hidden bg-[#f5fafc] text-[#0c0b0b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-24 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12 lg:pb-24">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-[#6b7b80] transition-colors hover:text-brand"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#b9c6ca]" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-[#0c0b0b]">
                All destinations
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <header className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-brand uppercase ring-1 ring-brand/15">
              <Compass className="size-3.5" aria-hidden="true" />
              Destinations
            </span>
            <h1 className="mt-5 font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[#0c0b0b]">
              Explore All Destinations
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#4b5b60] sm:text-lg">
              Find your perfect travel experience from our curated collection.
            </p>
          </header>

          <Link
            href="/add-destination"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 w-fit rounded-xl border-black/10 bg-white px-4 text-sm font-medium text-[#0c0b0b] hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand dark:border-black/10 dark:bg-white dark:text-[#0c0b0b] dark:hover:border-brand/30 dark:hover:bg-[#eff9fc] dark:hover:text-brand"
            )}
          >
            <Plus className="size-4" aria-hidden="true" />
            Add destination
          </Link>
        </div>

        <div className="mt-8 lg:mt-10">
          {destinations ? (
            <DestinationsExplorer destinations={destinations} />
          ) : (
            <div className="rounded-3xl border border-dashed border-black/10 bg-white py-16 text-center">
              <p className="text-[#0c0b0b]">Could not load destinations.</p>
              <p className="mt-1 text-sm text-[#6b7b80]">
                Make sure the server is running at {API_URL}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default AllDestinationsPage
