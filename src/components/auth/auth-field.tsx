"use client"

import type * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const authFieldClass =
  "h-11 rounded-lg border-black/10 bg-[#f7fafc] pl-10 text-sm text-[#0c0b0b] shadow-none placeholder:text-[#8a999e] focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20 dark:border-black/10 dark:bg-[#f7fafc] dark:focus-visible:bg-white"

export function AuthField({
  id,
  label,
  icon: Icon,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string
  label: string
  icon: React.ElementType
  type?: string
  autoComplete: string
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-[#0c0b0b]">
        {label}
      </Label>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#8a999e]"
        />
        <Input
          id={id}
          name={id}
          type={type}
          required
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={cn(authFieldClass)}
        />
      </div>
    </div>
  )
}
