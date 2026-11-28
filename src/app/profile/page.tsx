import type { Metadata } from "next"
import Image from "next/image"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import {
  Camera,
  DollarSign,
  Globe,
  Mail,
  Plane,
  TrendingUp,
} from "lucide-react"

import { EditProfileDialog } from "@/components/profile/edit-profile-dialog"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "My Profile | Wanderlust",
  description: "Manage your account settings and travel preferences.",
}

const stats = [
  {
    label: "Total Bookings",
    value: "0",
    icon: Plane,
    iconClass: "text-[#2f80ed]",
    bgClass: "bg-[#e8f4fd]",
  },
  {
    label: "Countries Visited",
    value: "0",
    icon: Globe,
    iconClass: "text-[#27ae60]",
    bgClass: "bg-[#e9f8ee]",
  },
  {
    label: "Upcoming Trips",
    value: "0",
    icon: TrendingUp,
    iconClass: "text-[#f2994a]",
    bgClass: "bg-[#fff2e6]",
  },
  {
    label: "Total Spent",
    value: "$0",
    icon: DollarSign,
    iconClass: "text-[#9b51e0]",
    bgClass: "bg-[#f3e8ff]",
  },
]

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/login")
  }

  const { user } = session
  const initials =
    user.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"

  const memberSince = user.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : "—"

  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden bg-[#f5fafc] px-4 py-10 text-[#0c0b0b] sm:px-6 lg:px-8 lg:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-24 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <header>
          <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-3 text-sm text-[#6b7b80] sm:text-base">
            Manage your account settings and travel preferences
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(12,11,11,0.35)]">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="size-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid size-24 place-items-center rounded-full bg-[#eff9fc] text-2xl font-semibold text-brand">
                    {initials}
                  </div>
                )}

                <span
                  aria-hidden="true"
                  className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full bg-brand text-white ring-2 ring-white"
                >
                  <Camera className="size-3.5" />
                </span>
              </div>

              <h2 className="mt-4 font-heading text-2xl tracking-tight">
                {user.name}
              </h2>
              <p className="mt-1.5 flex max-w-full items-center gap-1.5 text-sm text-[#6b7b80]">
                <Mail
                  className="size-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span className="truncate">{user.email}</span>
              </p>
            </div>

            <dl className="mt-6 space-y-3 border-t border-black/5 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#8a999e]">Member since</dt>
                <dd className="font-medium">{memberSince}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#8a999e]">Email status</dt>
                <dd
                  className={cn(
                    "font-medium",
                    user.emailVerified ? "text-emerald-600" : "text-[#b45309]"
                  )}
                >
                  {user.emailVerified ? "Verified" : "Unverified"}
                </dd>
              </div>
            </dl>

            <EditProfileDialog name={user.name} />
          </section>

          <section>
            <h2 className="font-heading text-xl tracking-tight">
              Travel Statistics
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div>
                    <p className="text-sm text-[#6b7b80]">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full",
                      stat.bgClass,
                      stat.iconClass
                    )}
                  >
                    <stat.icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
