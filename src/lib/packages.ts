export type PackageDraft = {
  name: string
  country: string
  category: string | null
  price: string
  duration: string
  departure: string
  imageUrl: string
  description: string
}

export type PackageErrors = Partial<Record<keyof PackageDraft, string>>

export const packageCategories: ReadonlyArray<{
  value: string
  label: string
}> = [
  { value: "beach", label: "Beach" },
  { value: "island", label: "Island" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "desert", label: "Desert" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
]

export const emptyPackageDraft: PackageDraft = {
  name: "",
  country: "",
  category: null,
  price: "",
  duration: "",
  departure: "",
  imageUrl: "",
  description: "",
}

export function getCategoryLabel(value: string | null) {
  return packageCategories.find((category) => category.value === value)?.label
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export function formatPrice(value: string) {
  const amount = Number(value)
  if (!value.trim() || !Number.isFinite(amount) || amount <= 0) return null

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDeparture(value: string) {
  if (!value) return null

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function validatePackageDraft(
  draft: PackageDraft,
  today: string
): PackageErrors {
  const errors: PackageErrors = {}

  if (draft.name.trim().length < 3) {
    errors.name = "Enter a destination name with at least 3 characters."
  }

  if (!draft.country.trim()) {
    errors.country = "Enter the country this package is in."
  }

  if (!draft.category) {
    errors.category = "Choose a category for this package."
  }

  const price = Number(draft.price)

  if (!draft.price.trim()) {
    errors.price = "Add a price in US dollars."
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.price = "Enter a price greater than 0."
  } else if (price > 1_000_000) {
    errors.price = "Price must be $1,000,000 or less."
  }

  if (!draft.duration.trim()) {
    errors.duration = "Add a duration, e.g. 7 Days / 6 Nights."
  }

  if (!draft.departure) {
    errors.departure = "Choose a departure date."
  } else if (draft.departure < today) {
    errors.departure = "Departure date cannot be in the past."
  }

  if (draft.imageUrl.trim() && !isHttpUrl(draft.imageUrl.trim())) {
    errors.imageUrl = "Enter a valid URL starting with http:// or https://."
  }

  const description = draft.description.trim()

  if (description.length < 20) {
    errors.description = "Add at least 20 characters so travelers know what to expect."
  } else if (description.length > 500) {
    errors.description = "Keep the description under 500 characters."
  }

  return errors
}
