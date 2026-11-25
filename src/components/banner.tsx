import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import banner from "@/assets/Banner.png"

const searchFields = [
  { label: "Location", name: "location", placeholder: "Address, City or Zip" },
  { label: "Date/Duration", name: "date", placeholder: "Anytime/3 Days" },
  { label: "Budget", name: "budget", placeholder: "$0-$3000" },
  { label: "People", name: "people", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0c0b0b]">
      <Image
        src={banner}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(102,102,102,0)_84%,#000_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[620px] flex-col lg:min-h-[658px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center px-4 pt-16 pb-12 text-center sm:px-6 lg:px-10 lg:pt-20 lg:pb-16">
          <h1 className="max-w-[662px] font-heading text-[clamp(2.25rem,5vw,3.75rem)] leading-none tracking-[-0.03em] text-white">
            Discover Your Next Adventure
          </h1>
          <p className="mt-3 max-w-[662px] text-lg leading-[1.6] tracking-[-0.03em] text-[#edfcff] sm:text-xl">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row lg:mt-10">
            <Link
              href="#destinations"
              className="inline-flex h-14 w-full items-center justify-center gap-6 bg-brand px-6 text-base font-medium tracking-[0.08px] text-white transition-colors hover:bg-[#1290ab] sm:w-auto"
            >
              EXPLORE NOW
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="#destinations"
              className="inline-flex h-14 w-full items-center justify-center bg-white/40 px-6 text-base font-medium tracking-[0.08px] text-[#0c0b0b] transition-colors hover:bg-white/55 sm:w-auto"
            >
              VIEW DESTINATION
            </Link>
          </div>
        </div>

        <form className="grid w-full grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_200px]">
          {searchFields.map((field) => (
            <label
              key={field.name}
              className="flex min-h-[64px] flex-col justify-center gap-1 border-b border-white/10 bg-white/40 px-5 py-3 text-left sm:border-r lg:border-b-0"
            >
              <span className="text-base font-medium tracking-[-0.01em] text-white">
                {field.label}
              </span>
              <input
                name={field.name}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-sm tracking-[-0.01em] text-white placeholder:text-white/80 focus:outline-none"
              />
            </label>
          ))}
          <button
            type="submit"
            className="min-h-[64px] bg-brand px-5 text-base font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-[#1290ab]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  )
}
