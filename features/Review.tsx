"use client"

import { format } from "date-fns"
import { FormData, CONTACT_METHODS } from "@/types"

export default function Review({ formData }: { formData: FormData }) {
  const budgetLabels: Record<string, string> = {
    "under-500k": "Under ₱500,000",
    "500k-1m": "₱500,000 - ₱1,000,000",
    "1m-2.5m": "₱1,000,000 - ₱2,500,000",
    "2.5m-5m": "₱2,500,000 - ₱5,000,000",
    "over-5m": "₱5,000,000+",
    "not-sure": "Not sure yet",
  }

  const timelineLabels: Record<string, string> = {
    asap: "As soon as possible",
    "1-3-months": "Within 1 - 3 months",
    "3-6-months": "In 3 - 6 months",
    flexible: "Flexible — exploring",
  }

  const roleLabels: Record<string, string> = {
    "technical-partner": "Looking for a technical partner to bring my idea to life",
    "business-owner": "Business owner who wants to digitize operations or launch a new revenue stream",
    "custom-software": "Looking for a team that will build custom software to replace spreadsheets/manual work",
    exploring: "Exploring whether a software product makes sense for my use case",
  }

  const contactMethodLabel =
    CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label || "Contact"

  const meetingDisplay =
    formData.meetingDate && formData.meetingTime
      ? `${format(formData.meetingDate, "PPP")} • ${formData.meetingTime}`
      : "Not selected"

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Here’s what you told us</h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Review and confirm. You can go back to any step to make changes.
      </p>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
        <Section title="About You">
          <Field label="Name" value={formData.fullName} />
          <Field label={`Contact (${contactMethodLabel})`} value={formData.contactHandle} />
          <Field label="I am..." value={roleLabels[formData.role] || "Not specified"} />
        </Section>

        <Divider />

        <Section title="Vision & Purpose">
          <Field label="The vision" value={formData.vision} />
          <Field label="Who it's for" value={formData.whoIsItFor || "Not specified"} />
          <Field label="Biggest challenge" value={formData.biggestChallenge || "Not specified"} />
        </Section>

        <Divider />

        <Section title="What You Need">
          <Field
            label="Where people use it"
            value={formData.platforms.length ? formData.platforms.join(", ") : "Not specified"}
          />
          <Field label="Must-haves" value={formData.mustHaves} />
          <Field label="Look & feel" value={formData.lookAndFeel || "Not specified"} />
        </Section>

        <Divider />

        <Section title="Practicalities">
          <Field label="Budget" value={budgetLabels[formData.budgetRange] || "Not specified"} />
          <Field label="Timeline" value={timelineLabels[formData.timeline] || "Not specified"} />
          <Field label="Preferred meeting" value={meetingDisplay} />
          <Field label="Other notes" value={formData.anythingElse || "None"} />
        </Section>
      </div>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-border" />
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="min-w-40 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value || "---"}</span>
    </div>
  )
}
