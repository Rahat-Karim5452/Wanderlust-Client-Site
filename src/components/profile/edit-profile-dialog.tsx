"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export function EditProfileDialog({ name }: { name: string }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(name)
  const [saving, setSaving] = React.useState(false)

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) setValue(name)
    setOpen(nextOpen)
  }

  async function handleSave() {
    const nextName = value.trim()

    if (nextName.length < 2) {
      toast.error("Enter a name with at least 2 characters.")
      return
    }

    setSaving(true)
    try {
      const { error } = await authClient.updateUser({ name: nextName })

      if (error) {
        toast.error(error.message ?? "Could not update your profile.")
        return
      }

      toast.success("Profile updated")
      setOpen(false)
      router.refresh()
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] transition-colors hover:bg-[#1290ab] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
        <Pencil className="size-4" aria-hidden="true" />
        Edit Profile
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your display name.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="profile-name">Full Name</Label>
          <Input
            id="profile-name"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="name"
            placeholder="Enter your name"
            className="h-11 rounded-lg border-black/10 bg-[#f7fafc] px-3 text-sm shadow-none focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="h-10 rounded-lg border-black/10 bg-white text-sm font-medium text-[#4b5b60] hover:bg-[#eff9fc] hover:text-brand"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-10 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-[#1290ab] disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
