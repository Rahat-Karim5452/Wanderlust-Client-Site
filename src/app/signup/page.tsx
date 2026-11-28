import type { Metadata } from "next"

import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Create Account | Wanderlust",
  description: "Start your adventure with Wanderlust.",
}

export default function SignupPage() {
  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden bg-[#f4f8fa] px-4 py-14 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-24 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <header className="text-center">
          <h1 className="font-heading text-4xl tracking-tight text-[#0c0b0b] sm:text-5xl">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-[#6b7b80] sm:text-base">
            Start your adventure with Wanderlust
          </p>
        </header>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(12,11,11,0.35)] sm:p-8">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
