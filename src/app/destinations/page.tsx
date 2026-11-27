import { DestinationsExplorer } from "@/components/destinations/destinations-explorer"
import type { Destination } from "@/types/destination"

async function getDestinations(): Promise<Destination[]> {
  const res = await fetch("http://localhost:8000/destinations", {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to load destinations")
  return res.json()
}

const AllDestinationsPage = async () => {
  const destinations = await getDestinations()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight text-ink md:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      <DestinationsExplorer destinations={destinations} />
    </main>
  )
}

export default AllDestinationsPage
