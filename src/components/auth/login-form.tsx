"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"

import { AuthField } from "@/components/auth/auth-field"
import { GitHubIcon, GoogleIcon } from "@/components/auth/social-icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const socialButtonClass =
  "h-11 w-full justify-center gap-2 rounded-lg border-black/10 bg-white text-sm font-medium text-[#25363b] shadow-none hover:border-brand/30 hover:bg-[#eff9fc] hover:text-brand dark:border-black/10 dark:bg-white dark:text-[#25363b] dark:hover:border-brand/30 dark:hover:bg-[#eff9fc] dark:hover:text-brand"

export function LoginForm() {
  const router = useRouter()
  const [rememberMe, setRememberMe] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [socialLoading, setSocialLoading] = React.useState<
    "google" | "github" | null
  >(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    setSubmitting(true)
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    })
    setSubmitting(false)

    if (signInError) {
      setError(signInError.message ?? "Could not sign you in.")
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
        <AuthField
          id="email"
          label="Email Address"
          icon={Mail}
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />

        <AuthField
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#4b5b60]">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked)}
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={submitting || socialLoading !== null}
          className="h-11 w-full rounded-lg bg-brand text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(21,161,191,0.9)] hover:bg-[#1290ab] focus-visible:ring-brand/30 disabled:opacity-70"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span aria-hidden="true" className="h-px flex-1 bg-black/10" />
        <span className="text-xs text-[#8a999e]">Or continue with</span>
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
            : "Continue with Google"}
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
            : "Continue with GitHub"}
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-[#6b7b80]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
