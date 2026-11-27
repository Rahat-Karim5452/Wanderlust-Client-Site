import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import type { Destination } from "@/types/destination"
import { formatPrice } from "@/lib/destinations"
import { DestinationActions } from "@/components/destinations/destination-actions"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

async function getDestination(id: string): Promise<Destination | null> {
  try {
    const res = await fetch(`${API_URL}/destination/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.destination ?? data
  } catch (error) {
    console.error("Failed to load destination:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const destination = await getDestination(id)

  return {
    title: destination
      ? `${destination.name} | Wanderlust`
      : "Destination Details | Wanderlust",
  }
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const destination = await getDestination(id)

  if (!destination) notFound()

  const {
    _id,
    name,
    country,
    category,
    price,
    duration,
    departure,
    imageUrl,
    description,
  } = destination

  return (
    <main className="relative isolate overflow-hidden bg-[#f5fafc] text-[#0c0b0b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-40 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-7 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-24">
        {/* Navigation and Actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#64757a] transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to destinations
          </Link>

          <DestinationActions id={String(_id)} />
        </div>

        {/* Hero Image */}
        <section className="relative overflow-hidden rounded-3xl bg-[#dff4f9] shadow-[0_24px_60px_-35px_rgba(12,11,11,0.35)]">
          <div className="relative aspect-[16/8] min-h-[240px] sm:min-h-[360px] lg:aspect-[16/7]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Compass className="size-16 text-brand/40" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute right-5 bottom-5 left-5 sm:right-9 sm:bottom-9 sm:left-9">
              <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                {category}
              </span>

              <h1 className="mt-3 max-w-3xl font-heading text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {name}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/85 sm:text-base">
                <MapPin className="size-4" />
                {country}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          {/* Destination Information */}
          <div className="min-w-0">
            {/* Quick Information */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-black/5 pb-6">
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-[#eff9fc] text-brand">
                  <Compass className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] text-[#8a999e]">Category</p>
                  <p className="text-sm font-semibold">{category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-[#eff9fc] text-brand">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] text-[#8a999e]">Duration</p>
                  <p className="text-sm font-semibold">{duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-[#eff9fc] text-brand">
                  <CalendarDays className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] text-[#8a999e]">Departure</p>
                  <p className="text-sm font-semibold">{departure}</p>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section className="mt-8">
              <div className="flex items-center gap-3">
                <span className="h-7 w-1 rounded-full bg-brand" />
                <h2 className="font-heading text-2xl tracking-tight">
                  Overview
                </h2>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#64757a] sm:text-base">
                {description}
              </p>
            </section>

            {/* Experience */}
            <section className="mt-9 rounded-2xl border border-brand/10 bg-white p-5 shadow-[0_12px_35px_-28px_rgba(12,11,11,0.3)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#eff9fc] text-brand">
                  <Sparkles className="size-5" />
                </span>

                <div>
                  <h2 className="font-heading text-xl">
                    Your Journey Starts Here
                  </h2>
                  <p className="mt-0.5 text-xs text-[#8a999e]">
                    Discover something extraordinary
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#64757a]">
                Explore this destination and discover the experiences waiting
                for you. Plan your journey, enjoy new surroundings, and create
                unforgettable travel memories.
              </p>
            </section>

            {/* Travel Benefits */}
            <section className="mt-9">
              <h2 className="font-heading text-2xl tracking-tight">
                Travel with Confidence
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure Booking",
                    text: "A simple and secure travel experience.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Flexible Planning",
                    text: "Plan your trip around your schedule.",
                  },
                  {
                    icon: Compass,
                    title: "Explore More",
                    text: "Discover new places and experiences.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/5 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand/20 hover:shadow-lg"
                  >
                    <item.icon className="size-6 text-brand" />

                    <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>

                    <p className="mt-1 text-xs leading-5 text-[#819095]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_55px_-30px_rgba(12,11,11,0.25)]">
              {/* Price */}
              <div className="bg-gradient-to-br from-[#effaff] to-white p-6 sm:p-7">
                <p className="text-xs font-medium tracking-widest text-[#819095] uppercase">
                  Starting from
                </p>

                <div className="mt-2">
                  <span className="text-4xl font-bold tracking-tight text-brand">
                    {formatPrice(price)}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#819095]">Per person</p>

                <div className="mt-6 h-px bg-brand/10" />

                {/* Trip Details */}
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#819095]">
                      Destination
                    </p>
                    <p className="mt-1 text-sm font-semibold">{name}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#819095]">
                      Travel date
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                      <CalendarDays className="size-4 text-brand" />
                      {departure}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#819095]">
                      Trip duration
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                      <Clock3 className="size-4 text-brand" />
                      {duration}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  {[
                    "Destination details available",
                    "Transparent package pricing",
                    "Easy trip planning",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-xs text-[#64757a]"
                    >
                      <Check className="size-4 shrink-0 text-emerald-500" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Actions */}
              <div className="border-t border-black/5 p-6">
                <Link
                  href={`/booking/${_id}`}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_12px_25px_-12px_rgba(21,161,191,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#1290ab] hover:shadow-lg"
                >
                  Book Now
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/destinations"
                  className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-black/10 text-sm font-medium text-[#64757a] transition-all hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand"
                >
                  Explore More Destinations
                </Link>

                <p className="mt-4 text-center text-[11px] text-[#9aa6aa]">
                  Your next adventure is just a step away.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default DestinationDetailsPage
