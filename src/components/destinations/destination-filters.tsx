import { ChevronDown } from "lucide-react"

type Option = { value: string; label: string }

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-sm text-ink uppercase outline-none focus-visible:bg-banner-muted"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="normal-case">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}

export const PRICE_RANGES: (Option & { min: number; max: number })[] = [
  { value: "all", label: "Price range", min: 0, max: Infinity },
  { value: "0-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-2000", label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { value: "2000-3000", label: "$2,000 – $3,000", min: 2000, max: 3000 },
  { value: "3000+", label: "$3,000 and up", min: 3000, max: Infinity },
]

export const SORT_OPTIONS: Option[] = [
  { value: "default", label: "Sort by" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
]

export function DestinationFilters({
  categories,
  category,
  price,
  sort,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}: {
  categories: string[]
  category: string
  price: string
  sort: string
  onCategoryChange: (value: string) => void
  onPriceChange: (value: string) => void
  onSortChange: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <FilterSelect
        label="Category"
        value={category}
        onChange={onCategoryChange}
        options={[
          { value: "all", label: "Category" },
          ...categories.map((c) => ({ value: c, label: c })),
        ]}
      />
      <FilterSelect
        label="Price range"
        value={price}
        onChange={onPriceChange}
        options={PRICE_RANGES}
      />
      <FilterSelect
        label="Sort by"
        value={sort}
        onChange={onSortChange}
        options={SORT_OPTIONS}
      />
    </div>
  )
}
