import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

import { AddPackageForm } from "@/components/add-package-form"
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

export const metadata: Metadata = {
  title: "Add New Travel Package | Wanderlust",
  description:
    "Create a bookable travel package for the Wanderlust catalog and preview it before publishing.",
}

export default function AddDestinationPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#f5fafc] text-[#0c0b0b]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.14),transparent)]" />
        <div className="absolute top-24 -right-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(21,161,191,0.10),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 pt-8 pb-16 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12 lg:pb-24">
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
                Add travel package
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between">
          <header className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-brand uppercase ring-1 ring-brand/15">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Admin panel
            </span>
            <h1 className="mt-5 font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[#0c0b0b]">
              Add New Travel Package
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#4b5b60] sm:text-lg">
              Create a bookable package — add the essentials, set pricing, and
              preview the card before publishing.
            </p>
          </header>

          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 w-fit rounded-xl border-black/10 bg-white px-4 text-sm font-medium text-[#0c0b0b] hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand dark:border-black/10 dark:bg-white dark:text-[#0c0b0b] dark:hover:border-brand/30 dark:hover:bg-[#eff9fc] dark:hover:text-brand"
            )}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>

        <AddPackageForm />
      </div>
    </main>
  )
}
