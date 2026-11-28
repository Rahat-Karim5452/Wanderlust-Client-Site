"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, Menu, User, X } from "lucide-react"

import logo from "@/assets/Wanderlust.png"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add-Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
]

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  async function handleSignOut() {
    setOpen(false)
    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="relative z-30 border-b border-black/5 bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {primaryLinks.map((link) => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-base font-medium tracking-[0.08px] text-[#0c0b0b] transition-colors hover:text-brand",
                    active &&
                      "text-brand underline decoration-1 underline-offset-4"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <button
            type="button"
            className="justify-self-start rounded-md p-2 text-[#0c0b0b] transition-colors hover:bg-black/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link
            href="/"
            className="justify-self-center"
            aria-label="Wanderlust home"
          >
            <Image
              src={logo}
              alt="Wanderlust"
              width={162}
              height={24}
              priority
              className="h-5 w-auto sm:h-6"
            />
          </Link>

          <div className="hidden items-center justify-end gap-8 lg:flex">
            {isPending ? (
              <span
                aria-hidden="true"
                className="h-4 w-24 animate-pulse rounded bg-black/10"
              />
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  aria-current={pathname === "/profile" ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 text-base font-medium tracking-[0.08px] text-[#0c0b0b] transition-colors hover:text-brand",
                    pathname === "/profile" &&
                      "text-brand underline decoration-1 underline-offset-4"
                  )}
                >
                  <User className="size-4" aria-hidden="true" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1 text-base font-medium tracking-[0.08px] text-[#0c0b0b] transition-colors hover:text-brand"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign Out
                </button>
              </>
            ) : (
              accountLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium tracking-[0.08px] text-[#0c0b0b] transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          <div className="justify-self-end lg:hidden" />
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="border-t border-black/5 bg-white px-4 pt-2 pb-6 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium tracking-[0.08px] text-[#0c0b0b]"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-black/10" />
            {isPending ? (
              <span
                aria-hidden="true"
                className="my-3 h-4 w-28 animate-pulse rounded bg-black/10"
              />
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  aria-current={pathname === "/profile" ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 py-3 text-base font-medium tracking-[0.08px] text-[#0c0b0b]",
                    pathname === "/profile" && "text-brand"
                  )}
                >
                  <User className="size-4" aria-hidden="true" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1 py-3 text-left text-base font-medium tracking-[0.08px] text-[#0c0b0b]"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign Out
                </button>
              </>
            ) : (
              accountLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium tracking-[0.08px] text-[#0c0b0b]"
                >
                  {link.label}
                </Link>
              ))
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
