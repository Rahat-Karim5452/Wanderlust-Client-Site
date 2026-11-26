"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleCheck,
  CircleExclamationPoint,
  MapPin,
  Plus,
  Wallet,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  emptyPackageDraft,
  formatDeparture,
  formatPrice,
  getCategoryLabel,
  packageCategories,
  validatePackageDraft,
  type PackageDraft,
} from "@/lib/packages"

const controlClass =
  "h-10 rounded-xl border-black/10 bg-[#f8fbfc] px-3 text-sm text-[#0c0b0b] shadow-none placeholder:text-[#8a999e] focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20 aria-invalid:border-red-400 aria-invalid:ring-red-500/15 dark:border-black/10 dark:bg-[#f8fbfc] dark:focus-visible:bg-white dark:aria-invalid:border-red-400 dark:aria-invalid:ring-red-500/15"

const selectClass = cn(
  controlClass,
  "w-full py-0 data-[size=default]:h-10 dark:hover:bg-white"
)

function FormSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#eff9fc] text-brand ring-1 ring-brand/10">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h2 className="font-heading text-base tracking-[-0.01em] text-[#0c0b0b]">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-black/5" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}

export function AddPackageForm() {
  const [draft, setDraft] = React.useState<PackageDraft>(emptyPackageDraft)
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof PackageDraft, boolean>>
  >({})
  const [attempted, setAttempted] = React.useState(false)
  const [submitted, setSubmitted] = React.useState<PackageDraft | null>(null)
  const [today] = React.useState(() => new Date().toISOString().slice(0, 10))

  const errors = React.useMemo(
    () => validatePackageDraft(draft, today),
    [draft, today]
  )
  const errorCount = Object.keys(errors).length
  const descriptionLength = draft.description.length

  function update<K extends keyof PackageDraft>(
    key: K,
    value: PackageDraft[K]
  ) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function markTouched(key: keyof PackageDraft) {
    setTouched((current) =>
      current[key] ? current : { ...current, [key]: true }
    )
  }

  function errorFor(key: keyof PackageDraft) {
    return attempted || touched[key] ? errors[key] : undefined
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const res = await fetch(`http://localhost:8000/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    })
    const data = await res.json()
    console.log(data)
    setAttempted(true)

    if (errorCount > 0) {
      const firstInvalid = document.getElementById(Object.keys(errors)[0])
      firstInvalid?.focus()
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmitted({
      ...draft,
      name: draft.name.trim(),
      country: draft.country.trim(),
      duration: draft.duration.trim(),
      imageUrl: draft.imageUrl.trim(),
      description: draft.description.trim(),
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function resetForm() {
    setDraft(emptyPackageDraft)
    setTouched({})
    setAttempted(false)
    setSubmitted(null)
  }

  const nameError = errorFor("name")
  const countryError = errorFor("country")
  const categoryError = errorFor("category")
  const priceError = errorFor("price")
  const durationError = errorFor("duration")
  const departureError = errorFor("departure")
  const imageUrlError = errorFor("imageUrl")
  const descriptionError = errorFor("description")

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mt-7 rounded-3xl border border-black/5 bg-white p-5 text-[#0c0b0b] shadow-[0_24px_60px_-40px_rgba(12,11,11,0.35)] sm:p-6 lg:mt-8 [&_[data-invalid=true]]:text-red-600 [&_[data-slot=field-error]]:text-red-600"
    >
      {submitted ? (
        <div
          role="status"
          className="flex flex-col items-center px-1 py-8 text-center sm:py-10"
        >
          <span className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/15">
            <CircleCheck className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-heading text-2xl tracking-[-0.01em] text-[#0c0b0b] sm:text-3xl">
            Travel package created
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#5a6a70]">
            <span className="font-semibold text-[#0c0b0b]">
              {submitted.name}
            </span>{" "}
            in {submitted.country} is ready to be published to your catalog.
          </p>

          <dl className="mt-5 grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-4 rounded-2xl bg-[#f4fafc] p-5 text-left ring-1 ring-brand/10">
            <div>
              <dt className="text-[10px] font-medium tracking-[0.12em] text-[#8a999e] uppercase">
                Category
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#0c0b0b]">
                {getCategoryLabel(submitted.category) ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.12em] text-[#8a999e] uppercase">
                Price
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#0c0b0b]">
                {formatPrice(submitted.price) ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.12em] text-[#8a999e] uppercase">
                Duration
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#0c0b0b]">
                {submitted.duration}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium tracking-[0.12em] text-[#8a999e] uppercase">
                Departs
              </dt>
              <dd className="mt-1 text-sm font-semibold text-[#0c0b0b]">
                {formatDeparture(submitted.departure)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={resetForm}
              className="h-10 flex-1 rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] hover:bg-brand/90 focus-visible:ring-brand/30"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add another package
            </Button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 flex-1 rounded-xl border-black/10 bg-white px-4 text-sm font-medium text-[#0c0b0b] hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand dark:border-black/10 dark:bg-white dark:text-[#0c0b0b] dark:hover:border-brand/30 dark:hover:bg-[#eff9fc] dark:hover:text-brand"
              )}
            >
              Back to site
            </Link>
          </div>
        </div>
      ) : (
        <>
          {attempted && errorCount > 0 ? (
            <Alert
              variant="destructive"
              className="mb-5 rounded-xl border-red-200 bg-red-50/70 px-3.5 py-3"
            >
              <CircleExclamationPoint className="size-4" aria-hidden="true" />
              <AlertTitle className="font-semibold text-red-700">
                Check the highlighted fields
              </AlertTitle>
              <AlertDescription className="text-red-700/80">
                {errorCount === 1
                  ? "1 field needs your attention before this package can be added."
                  : `${errorCount} fields need your attention before this package can be added.`}
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-6">
            <FormSection icon={MapPin} title="Destination details">
              <Field data-invalid={Boolean(nameError)}>
                <FieldLabel htmlFor="name">
                  Destination name <span className="text-brand">*</span>
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={draft.name}
                  onChange={(event) => update("name", event.target.value)}
                  onBlur={() => markTouched("name")}
                  placeholder="Bali Paradise"
                  autoComplete="off"
                  aria-invalid={Boolean(nameError)}
                  aria-describedby={nameError ? "name-error" : undefined}
                  className={controlClass}
                />
                {nameError ? (
                  <FieldError id="name-error">{nameError}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(countryError)}>
                <FieldLabel htmlFor="country">
                  Country <span className="text-brand">*</span>
                </FieldLabel>
                <Input
                  id="country"
                  name="country"
                  value={draft.country}
                  onChange={(event) => update("country", event.target.value)}
                  onBlur={() => markTouched("country")}
                  placeholder="Indonesia"
                  autoComplete="country-name"
                  aria-invalid={Boolean(countryError)}
                  aria-describedby={countryError ? "country-error" : undefined}
                  className={controlClass}
                />
                {countryError ? (
                  <FieldError id="country-error">{countryError}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(categoryError)}>
                <FieldLabel htmlFor="category">
                  Category <span className="text-brand">*</span>
                </FieldLabel>
                <Select
                  items={packageCategories}
                  value={draft.category}
                  onValueChange={(value) => {
                    update("category", value)
                    markTouched("category")
                  }}
                  name="category"
                >
                  <SelectTrigger
                    id="category"
                    aria-invalid={Boolean(categoryError)}
                    aria-describedby={
                      categoryError ? "category-error" : undefined
                    }
                    className={selectClass}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white text-[#0c0b0b] ring-black/10">
                    {packageCategories.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="py-2 focus:bg-[#eff9fc] focus:text-[#0c0b0b]"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {categoryError ? (
                  <FieldError id="category-error">{categoryError}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(durationError)}>
                <FieldLabel htmlFor="duration">
                  Duration <span className="text-brand">*</span>
                </FieldLabel>
                <Input
                  id="duration"
                  name="duration"
                  value={draft.duration}
                  onChange={(event) => update("duration", event.target.value)}
                  onBlur={() => markTouched("duration")}
                  placeholder="7 Days / 6 Nights"
                  aria-invalid={Boolean(durationError)}
                  aria-describedby={
                    durationError ? "duration-error" : undefined
                  }
                  className={controlClass}
                />
                {durationError ? (
                  <FieldError id="duration-error">{durationError}</FieldError>
                ) : null}
              </Field>
            </FormSection>

            <FormSection icon={Wallet} title="Pricing & media">
              <Field data-invalid={Boolean(priceError)}>
                <FieldLabel htmlFor="price">
                  Price (USD) <span className="text-brand">*</span>
                </FieldLabel>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[#6b7b80]"
                  >
                    $
                  </span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={draft.price}
                    onChange={(event) => update("price", event.target.value)}
                    onBlur={() => markTouched("price")}
                    placeholder="1299"
                    aria-invalid={Boolean(priceError)}
                    aria-describedby={priceError ? "price-error" : undefined}
                    className={cn(
                      controlClass,
                      "[appearance:textfield] pl-7 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                  />
                </div>
                {priceError ? (
                  <FieldError id="price-error">{priceError}</FieldError>
                ) : null}
              </Field>

              <Field data-invalid={Boolean(departureError)}>
                <FieldLabel htmlFor="departure">
                  Departure date <span className="text-brand">*</span>
                </FieldLabel>
                <Input
                  id="departure"
                  name="departure"
                  type="date"
                  min={today}
                  value={draft.departure}
                  onChange={(event) => update("departure", event.target.value)}
                  onBlur={() => markTouched("departure")}
                  aria-invalid={Boolean(departureError)}
                  aria-describedby={
                    departureError ? "departure-error" : undefined
                  }
                  className={cn(
                    controlClass,
                    "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60"
                  )}
                />
                {departureError ? (
                  <FieldError id="departure-error">{departureError}</FieldError>
                ) : null}
              </Field>

              <Field
                data-invalid={Boolean(imageUrlError)}
                className="sm:col-span-2"
              >
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  inputMode="url"
                  value={draft.imageUrl}
                  onChange={(event) => update("imageUrl", event.target.value)}
                  onBlur={() => markTouched("imageUrl")}
                  placeholder="https://example.com/bali-paradise.jpg"
                  aria-invalid={Boolean(imageUrlError)}
                  aria-describedby={
                    imageUrlError ? "imageUrl-error" : "imageUrl-hint"
                  }
                  className={controlClass}
                />
                {imageUrlError ? (
                  <FieldError id="imageUrl-error">{imageUrlError}</FieldError>
                ) : (
                  <FieldDescription id="imageUrl-hint">
                    A wide landscape photo (1200 × 800 or larger) works best.
                  </FieldDescription>
                )}
              </Field>

              <Field
                data-invalid={Boolean(descriptionError)}
                className="sm:col-span-2"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <FieldLabel htmlFor="description">
                    Description <span className="text-brand">*</span>
                  </FieldLabel>
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      descriptionLength > 500
                        ? "text-red-600"
                        : "text-[#8a999e]"
                    )}
                  >
                    {descriptionLength}/500
                  </span>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={draft.description}
                  onChange={(event) =>
                    update("description", event.target.value)
                  }
                  onBlur={() => markTouched("description")}
                  placeholder="Describe the travel experience, the highlights, and what is included…"
                  aria-invalid={Boolean(descriptionError)}
                  aria-describedby={
                    descriptionError ? "description-error" : undefined
                  }
                  className={cn(controlClass, "min-h-24 py-2.5")}
                />
                {descriptionError ? (
                  <FieldError id="description-error">
                    {descriptionError}
                  </FieldError>
                ) : null}
              </Field>
            </FormSection>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/5 pt-5 sm:flex-row sm:items-center">
            <p className="text-xs text-[#8a999e] sm:mr-auto">
              <span className="text-brand">*</span> Required fields
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-10 justify-center rounded-xl border-red-200 bg-white px-5 text-sm font-medium text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-red-200 dark:bg-white dark:text-red-600 dark:hover:border-red-300 dark:hover:bg-red-50 dark:hover:text-red-700"
              )}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              className="h-10 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] hover:bg-brand/90 focus-visible:ring-brand/30"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add Travel Package
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
