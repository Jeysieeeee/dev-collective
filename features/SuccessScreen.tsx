"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { FormData, CONTACT_METHODS  } from "@/types"

export default function SuccessScreen({ formData }: { formData: FormData }) {
  const contactLabel =
    CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label || "your preferred channel"

  const meetingDisplay =
    formData.meetingDate && formData.meetingTime
      ? `${format(formData.meetingDate, "PPP")} • ${formData.meetingTime}`
      : "Not selected"

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="size-8 text-emerald-500" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          You’re all set, {formData.fullName || "there"}!
        </h1>
        <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
          We’ve received everything we need to start preparing for your discovery call.
        </p>

        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          Preferred meeting: <span className="font-medium text-foreground">{meetingDisplay}</span>
        </p>

        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Someone from our team will reach out via{" "}
          <span className="font-medium text-foreground">{contactLabel}</span> at{" "}
          <span className="font-medium text-foreground">
            {formData.contactHandle || "your provided contact"}
          </span>{" "}
          within 1–2 business days.
        </p>

        <Link href="/">
          <Button variant="outline" className="rounded-full px-6">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
