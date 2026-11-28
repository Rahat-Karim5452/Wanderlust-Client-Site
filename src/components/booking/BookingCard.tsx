"use client"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { formatPrice } from "@/lib/destinations"
import { Destination } from "@/types/destination"
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Minus,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@base-ui/react"

const MIN_TRAVELLERS = 1
const MAX_TRAVELLERS = 20

const BookingCard = ({ destination }: { destination: Destination }) => {
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

  const [travellers, setTravellers] = useState(MIN_TRAVELLERS)

  //   user datar jnno:
  const { data: session } = authClient.useSession()
  const user = session?.user

  // Handle the Booking:
  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      username: user?.name,
      email: user?.email,
      image: user?.image,
      destinationId: _id,
      name,
      country,
      category,
      price,
      duration,
      departure,
      imageUrl,
      description,
      travellers,
      totalPrice: Number(price) * travellers,
      bookingDate: new Date(),
    }
    const res = await fetch("http://localhost:8000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    console.log(result)
  }
  return (
    <aside className="lg:sticky lg:top-8">
      <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_55px_-30px_rgba(12,11,11,0.25)]">
        <form action="" onSubmit={handleBooking}>
          <div className="bg-gradient-to-br from-[#effaff] to-white p-6 sm:p-7">
            <p className="text-xs font-semibold tracking-widest text-[#819095] uppercase">
              Starting from
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight text-brand">
              {formatPrice(price)}
            </p>

            <p className="mt-1 text-xs text-[#819095]">Per person</p>

            <div className="my-6 h-px bg-brand/10" />

            <div className="space-y-5">
              <div>
                <p className="text-xs text-[#819095]">Destination</p>
                <p className="mt-1 text-sm font-semibold">{name}</p>
              </div>

              <div>
                <p className="text-xs text-[#819095]">Travel date</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="size-4 text-brand" />
                  {departure}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#819095]">Trip duration</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                  <Clock3 className="size-4 text-brand" />
                  {duration}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#819095]">Number of travellers</p>
                <div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 bg-white p-1.5">
                  <button
                    type="button"
                    aria-label="Remove traveller"
                    onClick={() =>
                      setTravellers((current) =>
                        Math.max(MIN_TRAVELLERS, current - 1)
                      )
                    }
                    disabled={travellers <= MIN_TRAVELLERS}
                    className="grid size-8 place-items-center rounded-lg text-[#4b5b60] transition-colors hover:bg-[#eff9fc] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>

                  <span
                    aria-live="polite"
                    className="min-w-10 text-center text-sm font-semibold tabular-nums"
                  >
                    {travellers}
                  </span>

                  <button
                    type="button"
                    aria-label="Add traveller"
                    onClick={() =>
                      setTravellers((current) =>
                        Math.min(MAX_TRAVELLERS, current + 1)
                      )
                    }
                    disabled={travellers >= MAX_TRAVELLERS}
                    className="grid size-8 place-items-center rounded-lg text-[#4b5b60] transition-colors hover:bg-[#eff9fc] hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {[
                "Destination details available",
                "Transparent package pricing",
                "Easy trip planning",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 text-xs text-[#64757a]"
                >
                  <Check className="size-4 text-emerald-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Actions */}
          <div className="border-t border-black/5 p-6">
            <Button
              type="submit"

              className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_12px_25px_-12px_rgba(21,161,191,0.8)] transition-all hover:-translate-y-0.5 hover:bg-[#1290ab]"
            >
              Book Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>

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
        </form>
      </div>
    </aside>
  )
}

export default BookingCard
