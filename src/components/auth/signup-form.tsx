"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

import { GitHubIcon, GoogleIcon } from "./social-icons"

const fieldClass =
  "h-11 rounded-lg border-black/10 bg-[#f7fafc] pl-10 text-sm text-[#0c0b0b] shadow-none placeholder:text-[#8a999e] focus-visible:border-brand focus-visible:bg-white focus-visible:ring-brand/20 dark:border-black/10 dark:bg-[#f7fafc] dark:focus-visible:bg-white"

const socialButtonClass =
  "h-11 w-full justify-center gap-2 rounded-lg border-black/10 bg-white text-sm font-medium text-[#25363b] shadow-none hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand dark:border-black/10 dark:bg-white dark:text-[#25363b] dark:hover:border-brand/30 dark:hover:bg-[#eff9fc] dark:hover:text-brand"

function Field({
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
          className={fieldClass}
        />
      </div>
    </div>
  )
}

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [socialLoading, setSocialLoading] = React.useState<
    "google" | "github" | null
  >(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("full-name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirm-password") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setSubmitting(true)
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    })
    setSubmitting(false)

    if (signUpError) {
      setError(signUpError.message ?? "Could not create your account.")
      return
    }

    router.push("/")
    router.refresh()
  }

  async function handleSocial(provider: "google" | "github") {
    setError(null)
    setSocialLoading(provider)

    const { error: socialError } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    })

    if (socialError) {
      setError(
        socialError.message ??
          `Could not continue with ${provider === "google" ? "Google" : "GitHub"}.`
      )
      setSocialLoading(null)
    }
  }

  return (
    <div>
      {error ? (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          id="full-name"
          label="Full Name"
          icon={User}
          autoComplete="name"
          placeholder="Enter your name"
        />

        <Field
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />

        <Field
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
        />

        <Field
          id="confirm-password"
          label="Confirm Password"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
        />

        <Button
          type="submit"
          disabled={submitting || socialLoading !== null}
          className="h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] hover:bg-[#1290ab] focus-visible:ring-brand/30 disabled:opacity-70"
        >
          {submitting ? "Creating account…" : "Create Account"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-black/10" />
        <span className="text-xs text-[#8a999e]">Or sign up with</span>
        <span aria-hidden="true" className="h-px flex-1 bg-black/10" />
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          disabled={submitting || socialLoading !== null}
          onClick={() => handleSocial("google")}
          className={cn(socialButtonClass)}
        >
          <GoogleIcon className="size-4" />
          {socialLoading === "google"
            ? "Connecting to Google…"
            : "Sign Up With Google"}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={submitting || socialLoading !== null}
          onClick={() => handleSocial("github")}
          className={cn(socialButtonClass)}
        >
          <GitHubIcon className="size-4" />
          {socialLoading === "github"
            ? "Connecting to GitHub…"
            : "Sign Up With GitHub"}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[#6b7b80]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
