"use client"
import { redirect, useRouter } from "next/navigation"
import React, { useState } from "react"
import { Pencil, Save, X } from "lucide-react"

import type { Destination } from "@/types/destination"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"]

const inputClass =
  "h-11 rounded-xl border-black/10 bg-[#f7fafc] px-3.5 text-sm shadow-none transition-all placeholder:text-[#9aa6aa] focus-visible:border-brand focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand/10"

const EditDestinationDialog = ({
  destination,
}: {
  destination: Destination
}) => {
  const [form, setForm] = useState(destination)
  const router = useRouter()
  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { _id, ...updatedData } = form
    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
    const result = await res.json()
    console.log("result from server", result)
    if (result.modifiedCount > 0) {
      router.refresh()
    }
  }

  return (
    <form onClick={handleSubmit}>
      <Dialog>
        <DialogTrigger className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium text-[#25363b] transition-all hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand">
          <Pencil className="size-4" />
          Edit
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] w-[95vw] max-w-4xl overflow-y-auto rounded-3xl border border-black/5 bg-white p-0 text-[#0c0b0b] shadow-[0_30px_100px_-30px_rgba(12,11,11,0.35)]">
          {/* Header */}
          <div className="border-b border-black/5 bg-gradient-to-br from-[#effaff] via-white to-white px-6 py-6 sm:px-8">
            <DialogHeader className="flex flex-row items-center gap-3 text-left">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/15">
                <Pencil className="size-5" />
              </div>

              <div className="space-y-1">
                <DialogTitle className="font-heading text-xl tracking-tight sm:text-2xl">
                  Update Travel Package
                </DialogTitle>

                <DialogDescription className="text-xs leading-relaxed text-[#819095] sm:text-sm">
                  Make changes to the travel package details below.
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>

          {/* Form UI */}
          <div className="px-6 py-6 sm:px-8">
            <div className="grid gap-5">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Package Name</Label>

                <Input
                  id="edit-name"
                  placeholder="Bali Paradise"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Country and Category */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="edit-country">Country</Label>

                  <Input
                    id="edit-country"
                    placeholder="Indonesia"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Category</Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) => update("category", value ?? "")}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-black/10 bg-[#f7fafc] focus:ring-brand/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}

                      {!categories.includes(form.category) && (
                        <SelectItem value={form.category}>
                          {form.category}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price and Duration */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (USD)</Label>

                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    placeholder="e.g., 1299"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration</Label>

                  <Input
                    id="edit-duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Departure */}
              <div className="grid gap-2">
                <Label htmlFor="edit-departure">Departure Date</Label>

                <Input
                  id="edit-departure"
                  type="date"
                  value={form.departure}
                  onChange={(e) => update("departure", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Image URL */}
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>

                <Input
                  id="edit-image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>

                <Textarea
                  id="edit-description"
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="min-h-36 resize-y rounded-xl border-black/10 bg-[#f7fafc] px-3.5 py-3 text-sm leading-6 shadow-none placeholder:text-[#9aa6aa] focus-visible:border-brand focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand/10"
                />

                <p className="text-right text-[11px] text-[#9aa6aa]">
                  {form.description.length} characters
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/5 pt-5 sm:flex-row sm:justify-end">
              <DialogClose className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 text-sm font-medium text-red-500 transition-all hover:bg-red-50">
                <X className="size-4" />
                Cancel
              </DialogClose>
              <DialogClose
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1290ab]"
              >
                <Save className="size-4" />
                Save Changes
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  )
}

export default EditDestinationDialog
