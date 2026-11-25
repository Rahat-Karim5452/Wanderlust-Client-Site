import {
  BadgeCheck,
  CalendarClock,
  Compass,
  Headphones,
  Hotel,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

type Reason = {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
}

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and vetted partners on every trip.",
    tags: ["Insured trips", "Verified partners"],
  },
  {
    icon: Compass,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights and hidden gems.",
    tags: ["Local experts", "Small groups"],
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    tags: ["Always reachable", "Fast response"],
  },
  {
    icon: BadgeCheck,
    title: "Best Price Promise",
    description:
      "Transparent pricing with no hidden fees — find it cheaper elsewhere and we will match it.",
    tags: ["Price match", "No hidden fees"],
  },
  {
    icon: Hotel,
    title: "Handpicked Stays",
    description:
      "Boutique hotels, eco-lodges and local guesthouses, personally vetted for comfort and character.",
    tags: ["Boutique stays", "Vetted quality"],
  },
  {
    icon: CalendarClock,
    title: "Flexible Booking",
    description:
      "Plans change — free cancellation windows and effortless rescheduling on every itinerary.",
    tags: ["Free cancellation", "Easy changes"],
  },
]

export function WhyChoose() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative bg-[#eff9fc] pt-16 pb-4 sm:pt-20 sm:pb-6 lg:pt-24 lg:pb-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[32rem] w-[68rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.16),transparent)]" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.12),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-brand uppercase ring-1 ring-brand/15 backdrop-blur">
            Why Wanderlust
          </span>
          <h2
            id="why-choose-heading"
            className="mt-5 font-heading text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[#0c0b0b]"
          >
            Why Choose Wanderlust
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#4b5b60] sm:text-lg">
            Your trusted partner for exceptional travel experiences — planned,
            protected, and personal from the first click.
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-4xl space-y-5 sm:mt-14">
          {reasons.map((reason, index) => {
            const Icon = reason.icon

            return (
              <div
                key={reason.title}
                className="sticky"
                style={{ top: `calc(1.25rem + ${index * 1.125}rem)` }}
              >
                <article className="group relative overflow-hidden rounded-[1.5rem] border border-black/5 bg-white p-5 pl-6 shadow-[0_18px_44px_-26px_rgba(12,11,11,0.32)] ring-1 ring-white/70 sm:p-6 sm:pl-8">
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand via-[#4cc1d8] to-brand/25"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand/10 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/5 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                  />

                  <div className="relative flex items-start gap-4 sm:gap-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15 sm:size-12">
                      <Icon
                        className="size-5 sm:size-6"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-heading text-xl tracking-[-0.01em] text-[#0c0b0b] sm:text-2xl">
                          {reason.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="hidden font-heading text-3xl leading-none text-brand/15 tabular-nums sm:block"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#5a6a70]">
                        {reason.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {reason.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-[#eff9fc] px-2.5 py-0.5 text-[11px] font-medium tracking-[0.01em] text-[#3d6b78] ring-1 ring-brand/10"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
