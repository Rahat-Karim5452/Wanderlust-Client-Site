import type { Destination } from "@/types/destination"

export function getPriceNumber(price: Destination["price"]): number {
  if (typeof price === "number") return price
  const n = Number(price.replace(/[^0-9.]/g, ""))
  return Number.isNaN(n) ? 0 : n
}

export function formatPrice(price: Destination["price"]): string {
  const n = getPriceNumber(price)
  return n > 0 ? `$${n.toLocaleString()}` : String(price)
}
