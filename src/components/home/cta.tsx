import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import ctaBackground from "@/assets/CTA.png"

export function CallToAction() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-[#0c0b0b]"
    >
      <Image
        src={ctaBackground}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.15)_45%,rgba(0,0,0,0.55))]"
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-28">
        <h2
          id="cta-heading"
          className="font-heading text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15] tracking-[-0.02em] text-white"
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#destinations"
          className="mt-8 inline-flex h-12 items-center gap-5 bg-white px-6 text-[11px] font-semibold tracking-[0.16em] text-[#0c0b0b] uppercase transition-colors hover:bg-[#eff9fc]"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
