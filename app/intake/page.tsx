"use client"

import { useState } from "react"
import Link from "next/link"
import { Code2, ArrowLeft, ArrowRight, Check } from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

const STEPS = [
  { id: 1, label: "About You" },
  { id: 2, label: "Vision & Purpose" },
  { id: 3, label: "What You Need" },
  { id: 4, label: "Practicalities" },
  { id: 5, label: "Review" },
]

const CONTACT_METHODS = [
  { value: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { value: "telegram", label: "Telegram", placeholder: "@yourhandle", type: "text" },
  { value: "wechat", label: "WeChat", placeholder: "Your WeChat ID", type: "text" },
  { value: "viber", label: "Viber", placeholder: "Your Viber number", type: "tel" },
]

const ROLE_OPTIONS = [
  {
    value: "technical-partner",
    label: "Looking for a technical partner to bring my idea to life",
  },
  {
    value: "business-owner",
    label: "A business owner who wants to digitize operations or launch a new revenue stream",
  },
  {
    value: "custom-software",
    label: "Looking for a team that will build custom software to replace spreadsheets and manual work",
  },
  {
    value: "exploring",
    label: "Exploring whether a software product makes sense for my use case",
  },
]

type FormData = {
  fullName: string
  contactMethod: string
  contactHandle: string
  role: string
  vision: string
  whoIsItFor: string
  biggestChallenge: string
  platforms: string[]
  mustHaves: string
  hasAnything: string
  existingUrl: string
  lookAndFeel: string
  budgetRange: string
  timeline: string
  anythingElse: string
}

const INITIAL_DATA: FormData = {
  fullName: "",
  contactMethod: "",
  contactHandle: "",
  role: "",
  vision: "",
  whoIsItFor: "",
  biggestChallenge: "",
  platforms: [],
  mustHaves: "",
  hasAnything: "",
  existingUrl: "",
  lookAndFeel: "",
  budgetRange: "",
  timeline: "",
  anythingElse: "",
}

type StepErrors = Record<string, string>

function validateStep(step: number, formData: FormData): StepErrors {
  const errors: StepErrors = {}
  switch (step) {
    case 1:
      if (!formData.fullName.trim())
        errors.fullName = "We need something to call you!"
      if (!formData.contactMethod) {
        errors.contactMethod = "Please choose how you'd like us to reach you."
      } else if (!formData.contactHandle.trim()) {
        errors.contactHandle = "We need your contact details to follow up."
      } else if (
        formData.contactMethod === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactHandle.trim())
      ) {
        errors.contactHandle = "That doesn't look like a valid email. Mind checking?"
      }
      if (!formData.role)
        errors.role = "Pick the option that best describes you."
      break
    case 2:
      if (!formData.vision.trim())
        errors.vision =
          "Even a rough idea is great -- just tell us what you're imagining."
      break
    case 3:
      if (!formData.mustHaves.trim())
        errors.mustHaves =
          "What are the must-have things your app should do? Even a short list helps."
      break
  }
  return errors
}

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<StepErrors>({})

  const progress = (currentStep / STEPS.length) * 100

  function updateField(field: keyof FormData, value: string | string[]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function togglePlatform(platform: string) {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  function nextStep() {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setErrors({})
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }

  function prevStep() {
    setErrors({})
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  function handleSubmit() {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen formData={formData} />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="size-5 text-foreground" />
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Developer Collective
            </span>
          </Link>
          <span className="text-xs text-muted-foreground">
            Step {currentStep} of {STEPS.length}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-6">
        <Progress value={progress} className="h-1" />
        <div className="mt-3 flex justify-between">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() =>
                step.id < currentStep && setCurrentStep(step.id)
              }
              className={`text-xs transition-colors ${
                step.id === currentStep
                  ? "font-medium text-foreground"
                  : step.id < currentStep
                    ? "cursor-pointer text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/40"
              }`}
            >
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <main className="flex flex-1 items-start justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-2xl">
          {currentStep === 1 && (
            <StepAboutYou
              formData={formData}
              updateField={updateField}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <StepVision
              formData={formData}
              updateField={updateField}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <StepWhatYouNeed
              formData={formData}
              updateField={updateField}
              togglePlatform={togglePlatform}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <StepPracticalities
              formData={formData}
              updateField={updateField}
            />
          )}
          {currentStep === 5 && <StepReview formData={formData} />}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            {currentStep < STEPS.length ? (
              <Button onClick={nextStep} className="gap-2 rounded-full px-6">
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2 rounded-full px-6"
              >
                Submit
                <Check className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ──────────────────────── Step Components ──────────────────────── */

function StepAboutYou({
  formData,
  updateField,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
  errors: StepErrors
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Great to meet you!
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Before we dive in, we{"'"}d love to know a little about you. No
        technical knowledge needed -- just be yourself.
      </p>

      <div className="flex flex-col gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">
            What would you like us to call you?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="e.g. Jane, Marcus, Dr. Lee..."
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
        </div>

        {/* Contact Method */}
        <div className="flex flex-col gap-2">
          <Label>
            Where should we reach you?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Pick your preferred way to chat, and we{"'"}ll follow up there.
          </p>
          <Select
            value={formData.contactMethod}
            onValueChange={(v) => {
              updateField("contactMethod", v)
              updateField("contactHandle", "")
            }}
          >
            <SelectTrigger
              className={`w-full ${errors.contactMethod ? "border-destructive" : ""}`}
              aria-invalid={!!errors.contactMethod}
            >
              <SelectValue placeholder="Choose a contact method" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_METHODS.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contactMethod && (
            <p className="text-xs text-destructive">{errors.contactMethod}</p>
          )}
        </div>

        {/* Contact Handle (shown after method is selected) */}
        {formData.contactMethod && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactHandle">
              Your{" "}
              {CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label}{" "}
              details <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactHandle"
              type={
                CONTACT_METHODS.find(
                  (m) => m.value === formData.contactMethod
                )?.type || "text"
              }
              placeholder={
                CONTACT_METHODS.find(
                  (m) => m.value === formData.contactMethod
                )?.placeholder || ""
              }
              value={formData.contactHandle}
              onChange={(e) => updateField("contactHandle", e.target.value)}
              aria-invalid={!!errors.contactHandle}
              className={errors.contactHandle ? "border-destructive" : ""}
            />
            {errors.contactHandle && (
              <p className="text-xs text-destructive">{errors.contactHandle}</p>
            )}
          </div>
        )}

        {/* Role */}
        <div className="flex flex-col gap-2">
          <Label>
            I am... <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Pick whichever feels closest. There are no wrong answers.
          </p>
          <div className="flex flex-col gap-2">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField("role", option.value)}
                className={`rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                  formData.role === option.value
                    ? "border-foreground bg-foreground/5 text-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.role && (
            <p className="text-xs text-destructive">{errors.role}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StepVision({
  formData,
  updateField,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
  errors: StepErrors
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Tell us about your vision
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Don{"'"}t worry about technical terms -- just describe it the way you
        {"'"}d explain it to a friend over coffee.
      </p>

      <div className="flex flex-col gap-6">
        {/* Vision */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="vision">
            If your app or software existed today, what would it do?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            A sentence or two is fine. For example: {'"'}It would let my
            customers book appointments and pay online without calling us.{'"'}
          </p>
          <Textarea
            id="vision"
            placeholder="Describe what you imagine your app doing..."
            className={`min-h-32 ${errors.vision ? "border-destructive" : ""}`}
            value={formData.vision}
            onChange={(e) => updateField("vision", e.target.value)}
            aria-invalid={!!errors.vision}
          />
          {errors.vision && (
            <p className="text-xs text-destructive">{errors.vision}</p>
          )}
        </div>

        {/* Who is it for */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="whoIsItFor">
            Who would use this?
          </Label>
          <p className="text-xs text-muted-foreground">
            Think about the people who{"'"}d interact with it day to day.
          </p>
          <Input
            id="whoIsItFor"
            placeholder="e.g. My customers, my team, patients, students..."
            value={formData.whoIsItFor}
            onChange={(e) => updateField("whoIsItFor", e.target.value)}
          />
        </div>

        {/* Biggest challenge */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="biggestChallenge">
            What{"'"}s the biggest frustration or challenge this would solve?
          </Label>
          <p className="text-xs text-muted-foreground">
            What{"'"}s happening right now that made you think {'"'}there has to
            be a better way{'"'}?
          </p>
          <Textarea
            id="biggestChallenge"
            placeholder="e.g. We're tracking everything in spreadsheets and things keep falling through the cracks..."
            className="min-h-24"
            value={formData.biggestChallenge}
            onChange={(e) => updateField("biggestChallenge", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepWhatYouNeed({
  formData,
  updateField,
  togglePlatform,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
  togglePlatform: (platform: string) => void
  errors: StepErrors
}) {
  const platformOptions = [
    { value: "Web App", description: "Accessed through a browser" },
    { value: "iPhone App", description: "Available on iPhones" },
    { value: "Android App", description: "Available on Android phones" },
    { value: "Both Mobile", description: "iPhone and Android" },
    { value: "Not Sure", description: "We can help you decide" },
  ]

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Let{"'"}s shape what you need
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        We{"'"}ll help translate these into technical requirements later -- for
        now, just tell us what matters to you.
      </p>

      <div className="flex flex-col gap-6">
        {/* Platforms */}
        <div className="flex flex-col gap-2">
          <Label>Where would people use this?</Label>
          <p className="text-xs text-muted-foreground">
            Select all that apply. Not sure? No problem -- pick {'"'}Not Sure
            {'"'} and we{"'"}ll figure it out together.
          </p>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((platform) => (
              <button
                key={platform.value}
                type="button"
                onClick={() => togglePlatform(platform.value)}
                className={`flex flex-col rounded-lg border px-4 py-2.5 text-left transition-all ${
                  formData.platforms.includes(platform.value)
                    ? "border-foreground bg-foreground/5 text-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                }`}
              >
                <span className="text-sm font-medium">{platform.value}</span>
                <span className="text-xs opacity-60">{platform.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Must-haves */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="mustHaves">
            What are the must-have things it should do?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            List the most important things. For example: {'"'}Let customers
            create accounts, browse products, place orders, and track
            delivery.{'"'}
          </p>
          <Textarea
            id="mustHaves"
            placeholder="List the key things your app needs to do..."
            className={`min-h-32 ${errors.mustHaves ? "border-destructive" : ""}`}
            value={formData.mustHaves}
            onChange={(e) => updateField("mustHaves", e.target.value)}
            aria-invalid={!!errors.mustHaves}
          />
          {errors.mustHaves && (
            <p className="text-xs text-destructive">{errors.mustHaves}</p>
          )}
        </div>

        {/* Existing product */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="hasAnything">
            Do you have anything built already?
          </Label>
          <Select
            value={formData.hasAnything}
            onValueChange={(v) => updateField("hasAnything", v)}
          >
            <SelectTrigger id="hasAnything" className="w-full">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nothing">
                No, starting completely fresh
              </SelectItem>
              <SelectItem value="spreadsheets">
                I have spreadsheets / documents that outline my process
              </SelectItem>
              <SelectItem value="prototype">
                I have a basic version or prototype
              </SelectItem>
              <SelectItem value="rebuild">
                I have something but it needs to be rebuilt
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasAnything &&
          formData.hasAnything !== "nothing" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="existingUrl">
                Can you share a link to what you have? (optional)
              </Label>
              <Input
                id="existingUrl"
                placeholder="https://... or a Google Drive link"
                value={formData.existingUrl}
                onChange={(e) => updateField("existingUrl", e.target.value)}
              />
            </div>
          )}

        {/* Look and feel */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="lookAndFeel">
            How should it look and feel?
          </Label>
          <p className="text-xs text-muted-foreground">
            Any apps or websites you like the style of? Or just describe the
            vibe: {'"'}clean and simple{'"'}, {'"'}bold and colorful{'"'}, etc.
          </p>
          <Input
            id="lookAndFeel"
            placeholder='e.g. "Clean and simple like Notion" or "Modern and bold"'
            value={formData.lookAndFeel}
            onChange={(e) => updateField("lookAndFeel", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepPracticalities({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Almost there -- a few practical details
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        These help us give you a realistic picture during the discovery call.
        All answers are optional.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="budgetRange">
            Do you have a rough budget in mind?
          </Label>
          <p className="text-xs text-muted-foreground">
            This is just to help us recommend the right approach. No commitment.
          </p>
          <Select
            value={formData.budgetRange}
            onValueChange={(v) => updateField("budgetRange", v)}
          >
            <SelectTrigger id="budgetRange" className="w-full">
              <SelectValue placeholder="Pick a range (or skip this)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-500k">Under ₱500,000</SelectItem>
              <SelectItem value="500k-1m">₱500,000 - ₱1,000,000</SelectItem>
              <SelectItem value="1m-2.5m">₱1,000,000 - ₱2,500,000</SelectItem>
              <SelectItem value="2.5m-5m">₱2,500,000 - ₱5,000,000</SelectItem>
              <SelectItem value="over-5m">₱5,000,000+</SelectItem>
              <SelectItem value="not-sure">
                Honestly, no idea yet -- help me figure it out
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="timeline">When are you hoping to get started?</Label>
          <Select
            value={formData.timeline}
            onValueChange={(v) => updateField("timeline", v)}
          >
            <SelectTrigger id="timeline" className="w-full">
              <SelectValue placeholder="Pick a timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">As soon as possible</SelectItem>
              <SelectItem value="1-3-months">Within the next 1 - 3 months</SelectItem>
              <SelectItem value="3-6-months">In 3 - 6 months</SelectItem>
              <SelectItem value="flexible">
                I{"'"}m flexible -- just exploring for now
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="anythingElse">
            Anything else you{"'"}d like us to know?
          </Label>
          <p className="text-xs text-muted-foreground">
            Inspiration links, concerns, context -- anything that helps us
            understand your world better.
          </p>
          <Textarea
            id="anythingElse"
            placeholder="Feel free to share anything on your mind..."
            className="min-h-32"
            value={formData.anythingElse}
            onChange={(e) => updateField("anythingElse", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepReview({ formData }: { formData: FormData }) {
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
    flexible: "Flexible -- just exploring",
  }

  const roleLabels: Record<string, string> = {
    "technical-partner":
      "Looking for a technical partner to bring my idea to life",
    "business-owner":
      "Business owner who wants to digitize operations or launch a new revenue stream",
    "custom-software":
      "Looking for a team to build custom software to replace spreadsheets and manual work",
    exploring:
      "Exploring whether a software product makes sense for my use case",
  }

  const contactMethodLabel =
    CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label ||
    "Contact"

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Here{"'"}s what you told us
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Take a look and make sure everything looks right. You can go back to
        any step to make changes.
      </p>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
        <ReviewSection title="About You">
          <ReviewField label="Name" value={formData.fullName} />
          <ReviewField
            label={`Contact (${contactMethodLabel})`}
            value={formData.contactHandle}
          />
          <ReviewField
            label="I am..."
            value={roleLabels[formData.role] || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Vision & Purpose">
          <ReviewField label="The vision" value={formData.vision} />
          <ReviewField
            label="Who it's for"
            value={formData.whoIsItFor || "Not specified"}
          />
          <ReviewField
            label="Biggest challenge"
            value={formData.biggestChallenge || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="What You Need">
          <ReviewField
            label="Where people use it"
            value={
              formData.platforms.length > 0
                ? formData.platforms.join(", ")
                : "Not specified"
            }
          />
          <ReviewField label="Must-haves" value={formData.mustHaves} />
          <ReviewField
            label="Look & feel"
            value={formData.lookAndFeel || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Practicalities">
          <ReviewField
            label="Budget"
            value={budgetLabels[formData.budgetRange] || "Not specified"}
          />
          <ReviewField
            label="Timeline"
            value={timelineLabels[formData.timeline] || "Not specified"}
          />
          <ReviewField
            label="Other notes"
            value={formData.anythingElse || "None"}
          />
        </ReviewSection>
      </div>
    </div>
  )
}

function ReviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="min-w-40 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value || "---"}</span>
    </div>
  )
}

function SuccessScreen({ formData }: { formData: FormData }) {
  const contactLabel =
    CONTACT_METHODS.find((m) => m.value === formData.contactMethod)?.label ||
    "your preferred channel"

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="size-8 text-emerald-500" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          You{"'"}re all set, {formData.fullName || "there"}!
        </h1>
        <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
          We{"'"}ve received everything we need to start preparing for your
          discovery call.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Someone from our team will reach out via{" "}
          <span className="font-medium text-foreground">
            {contactLabel}
          </span>{" "}
          at{" "}
          <span className="font-medium text-foreground">
            {formData.contactHandle || "your provided contact"}
          </span>{" "}
          within 1-2 business days. We{"'"}re looking forward to it.
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
