"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export function DestinationActions({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this destination? This action cannot be undone."
    )

    if (!confirmed) return

    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/destination/${id}`, {
        method: "DELETE",
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete destination")
      }

      toast.success("Destination deleted successfully!")

      router.replace("/destinations")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Edit Button */}
      <Link
        href={`/edit-destination/${id}`}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium text-[#0c0b0b] transition-all hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand"
      >
        <Pencil className="size-4" />
        Edit
      </Link>

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2 className="size-4" />
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}
