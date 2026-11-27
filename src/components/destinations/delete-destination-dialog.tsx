"use client"

import { useRouter } from "next/navigation"
import { AlertTriangle, Trash2, X } from "lucide-react"

import type { Destination } from "@/types/destination"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

const DeleteDestinationDialog = ({
  destination,
}: {
  destination: Destination
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "DELETE",
      }
    )

    const data = await res.json()
    console.log(data)

    router.push("/destinations")
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-medium text-red-500 transition-all hover:border-red-300 hover:bg-red-50">
        <Trash2 className="size-4" />
        Delete
      </DialogTrigger>

      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-3xl border border-black/5 bg-white p-0">
        {/* Header */}
        <div className="px-6 pt-7">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
            <AlertTriangle className="size-7" />
          </div>

          <DialogHeader className="mt-5 text-center">
            <DialogTitle className="font-heading text-xl">
              Delete Destination?
            </DialogTitle>

            <DialogDescription className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#819095]">
              Are you sure you want to delete this travel package? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-black/5 bg-[#fafcfd] px-6 py-5 sm:flex-row sm:justify-end">
          <DialogClose className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-[#64757a] transition-all hover:bg-gray-50">
            <X className="size-4" />
            Cancel
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            className="h-11 rounded-xl px-5 text-sm font-semibold"
            onClick={handleDelete}
          >
            <Trash2 className="size-4" />
            Yes, Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDestinationDialog
