import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import wordmark from "@/assets/Wanderlust-1.png"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
]

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
]

function SocialIcon({ children, label, href }: {
  children: React.ReactNode
  label: string
  href: string
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center text-white/80 transition-colors hover:text-white"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#0c0b0b] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pt-10 sm:pt-16 lg:pt-20">
          <Image
            src={wordmark}
            alt="Wanderlust"
            width={542}
            height={80}
            className="h-9 w-auto sm:h-14"
          />
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:gap-x-10 lg:mt-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:pt-10">
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase">
              Newsletter
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex w-full max-w-sm items-center border border-white/15 bg-white/[0.04] transition-colors focus-within:border-white/35">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="h-11 w-full min-w-0 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to the newsletter"
                className="grid size-11 shrink-0 place-items-center text-white/80 transition-colors hover:text-white"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase"
            >
              Quick Links
            </h2>
            <ul className="mt-3 space-y-2 lg:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support">
            <h2
              id="footer-support"
              className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase"
            >
              Support
            </h2>
            <ul className="mt-3 space-y-2 lg:space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase">
              Contact Us
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80 lg:mt-4 lg:space-y-3">
              <li>
                <a
                  href="tel:+17869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlust.com"
                  className="transition-colors hover:text-white"
                >
                  info@wanderlust.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between lg:mt-12 lg:py-6">
          <p className="text-xs text-white/45">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <SocialIcon label="Wanderlust on X" href="#x">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
              </svg>
            </SocialIcon>

            <SocialIcon label="Wanderlust on LinkedIn" href="#linkedin">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.83v1.71h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
              </svg>
            </SocialIcon>

            <SocialIcon label="Wanderlust on Instagram" href="#instagram">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4 fill-none stroke-current"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" className="fill-current stroke-none" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  )
}
