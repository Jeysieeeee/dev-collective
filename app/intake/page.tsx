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
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Your Idea" },
  { id: 3, label: "Requirements" },
  { id: 4, label: "Budget & Timeline" },
  { id: 5, label: "Review" },
]

type FormData = {
  fullName: string
  email: string
  companyName: string
  role: string
  projectName: string
  projectDescription: string
  targetAudience: string
  problemSolved: string
  platforms: string[]
  keyFeatures: string
  hasExistingProduct: string
  existingProductUrl: string
  designPreferences: string
  budgetRange: string
  timeline: string
  additionalNotes: string
}

const INITIAL_DATA: FormData = {
  fullName: "",
  email: "",
  companyName: "",
  role: "",
  projectName: "",
  projectDescription: "",
  targetAudience: "",
  problemSolved: "",
  platforms: [],
  keyFeatures: "",
  hasExistingProduct: "",
  existingProductUrl: "",
  designPreferences: "",
  budgetRange: "",
  timeline: "",
  additionalNotes: "",
}

type StepErrors = Record<string, string>

function validateStep(step: number, formData: FormData): StepErrors {
  const errors: StepErrors = {}
  switch (step) {
    case 1:
      if (!formData.fullName.trim()) errors.fullName = "Full name is required."
      if (!formData.email.trim()) {
        errors.email = "Email is required."
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address."
      }
      break
    case 2:
      if (!formData.projectName.trim())
        errors.projectName = "Project name is required."
      if (!formData.projectDescription.trim())
        errors.projectDescription = "Project description is required."
      break
    case 3:
      if (!formData.keyFeatures.trim())
        errors.keyFeatures = "Key features are required."
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
            <StepBasicInfo formData={formData} updateField={updateField} errors={errors} />
          )}
          {currentStep === 2 && (
            <StepYourIdea formData={formData} updateField={updateField} errors={errors} />
          )}
          {currentStep === 3 && (
            <StepRequirements
              formData={formData}
              updateField={updateField}
              togglePlatform={togglePlatform}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <StepBudgetTimeline formData={formData} updateField={updateField} />
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
                Submit Intake
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

function StepBasicInfo({
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
        Let{"'"}s start with the basics
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Tell us a bit about yourself so we can personalize your experience.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="Jane Smith"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="companyName">Company Name (optional)</Label>
          <Input
            id="companyName"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="role">Your Role</Label>
          <Select
            value={formData.role}
            onValueChange={(v) => updateField("role", v)}
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="founder">Founder / CEO</SelectItem>
              <SelectItem value="product-manager">Product Manager</SelectItem>
              <SelectItem value="cto">CTO / Technical Lead</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function StepYourIdea({
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
        Describe your idea
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Help us understand what you want to build. The more detail, the better
        we can prepare.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="projectName">
            Project Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="projectName"
            placeholder="e.g. TaskFlow, HealthHub"
            value={formData.projectName}
            onChange={(e) => updateField("projectName", e.target.value)}
            aria-invalid={!!errors.projectName}
            className={errors.projectName ? "border-destructive" : ""}
          />
          {errors.projectName && (
            <p className="text-xs text-destructive">{errors.projectName}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="projectDescription">
            Project Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="projectDescription"
            placeholder="Describe your software idea in a few sentences. What does it do? What problem does it solve?"
            className={`min-h-32 ${errors.projectDescription ? "border-destructive" : ""}`}
            value={formData.projectDescription}
            onChange={(e) =>
              updateField("projectDescription", e.target.value)
            }
            aria-invalid={!!errors.projectDescription}
          />
          {errors.projectDescription && (
            <p className="text-xs text-destructive">{errors.projectDescription}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="targetAudience">Who is the target audience?</Label>
          <Input
            id="targetAudience"
            placeholder="e.g. Small business owners, healthcare professionals"
            value={formData.targetAudience}
            onChange={(e) => updateField("targetAudience", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="problemSolved">
            What problem does this solve?
          </Label>
          <Textarea
            id="problemSolved"
            placeholder="Describe the pain point or gap your product addresses."
            className="min-h-24"
            value={formData.problemSolved}
            onChange={(e) => updateField("problemSolved", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepRequirements({
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
    "Web App",
    "iOS",
    "Android",
    "Desktop",
    "API / Backend",
  ]

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Technical requirements
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Tell us about the platforms and features you need.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label>Target Platforms</Label>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  formData.platforms.includes(platform)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="keyFeatures">
            Key Features <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="keyFeatures"
            placeholder="List the core features you need (e.g., user auth, dashboard, payments, notifications)."
            className={`min-h-32 ${errors.keyFeatures ? "border-destructive" : ""}`}
            value={formData.keyFeatures}
            onChange={(e) => updateField("keyFeatures", e.target.value)}
            aria-invalid={!!errors.keyFeatures}
          />
          {errors.keyFeatures && (
            <p className="text-xs text-destructive">{errors.keyFeatures}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="hasExistingProduct">
            Do you have an existing product or prototype?
          </Label>
          <Select
            value={formData.hasExistingProduct}
            onValueChange={(v) => updateField("hasExistingProduct", v)}
          >
            <SelectTrigger id="hasExistingProduct" className="w-full">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No, starting from scratch</SelectItem>
              <SelectItem value="prototype">
                Yes, I have a prototype / MVP
              </SelectItem>
              <SelectItem value="redesign">
                Yes, need a redesign / rebuild
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasExistingProduct &&
          formData.hasExistingProduct !== "no" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="existingProductUrl">Link to existing product</Label>
              <Input
                id="existingProductUrl"
                placeholder="https://..."
                value={formData.existingProductUrl}
                onChange={(e) =>
                  updateField("existingProductUrl", e.target.value)
                }
              />
            </div>
          )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="designPreferences">Design preferences</Label>
          <Input
            id="designPreferences"
            placeholder="e.g. Clean & minimal, bold & colorful, similar to Linear.app"
            value={formData.designPreferences}
            onChange={(e) =>
              updateField("designPreferences", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  )
}

function StepBudgetTimeline({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Budget & timeline
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Help us understand your constraints so we can tailor our recommendation.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="budgetRange">Estimated Budget</Label>
          <Select
            value={formData.budgetRange}
            onValueChange={(v) => updateField("budgetRange", v)}
          >
            <SelectTrigger id="budgetRange" className="w-full">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-10k">Under $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="over-100k">$100,000+</SelectItem>
              <SelectItem value="not-sure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="timeline">Desired Timeline</Label>
          <Select
            value={formData.timeline}
            onValueChange={(v) => updateField("timeline", v)}
          >
            <SelectTrigger id="timeline" className="w-full">
              <SelectValue placeholder="Select a timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP</SelectItem>
              <SelectItem value="1-3-months">1 - 3 months</SelectItem>
              <SelectItem value="3-6-months">3 - 6 months</SelectItem>
              <SelectItem value="6-12-months">6 - 12 months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="additionalNotes">Anything else we should know?</Label>
          <Textarea
            id="additionalNotes"
            placeholder="Any additional context, links, inspiration, or constraints."
            className="min-h-32"
            value={formData.additionalNotes}
            onChange={(e) => updateField("additionalNotes", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepReview({ formData }: { formData: FormData }) {
  const budgetLabels: Record<string, string> = {
    "under-10k": "Under $10,000",
    "10k-25k": "$10,000 - $25,000",
    "25k-50k": "$25,000 - $50,000",
    "50k-100k": "$50,000 - $100,000",
    "over-100k": "$100,000+",
    "not-sure": "Not sure yet",
  }

  const timelineLabels: Record<string, string> = {
    asap: "ASAP",
    "1-3-months": "1 - 3 months",
    "3-6-months": "3 - 6 months",
    "6-12-months": "6 - 12 months",
    flexible: "Flexible",
  }

  const roleLabels: Record<string, string> = {
    founder: "Founder / CEO",
    "product-manager": "Product Manager",
    cto: "CTO / Technical Lead",
    designer: "Designer",
    marketing: "Marketing",
    other: "Other",
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Review your submission
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        Please review the details below before submitting. You can go back to
        any step to make changes.
      </p>

      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6">
        <ReviewSection title="Basic Info">
          <ReviewField label="Name" value={formData.fullName} />
          <ReviewField label="Email" value={formData.email} />
          <ReviewField label="Company" value={formData.companyName || "N/A"} />
          <ReviewField
            label="Role"
            value={roleLabels[formData.role] || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Your Idea">
          <ReviewField label="Project Name" value={formData.projectName} />
          <ReviewField
            label="Description"
            value={formData.projectDescription}
          />
          <ReviewField
            label="Target Audience"
            value={formData.targetAudience || "Not specified"}
          />
          <ReviewField
            label="Problem Solved"
            value={formData.problemSolved || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Requirements">
          <ReviewField
            label="Platforms"
            value={
              formData.platforms.length > 0
                ? formData.platforms.join(", ")
                : "Not specified"
            }
          />
          <ReviewField label="Key Features" value={formData.keyFeatures} />
          <ReviewField
            label="Design Preferences"
            value={formData.designPreferences || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Budget & Timeline">
          <ReviewField
            label="Budget"
            value={budgetLabels[formData.budgetRange] || "Not specified"}
          />
          <ReviewField
            label="Timeline"
            value={timelineLabels[formData.timeline] || "Not specified"}
          />
          <ReviewField
            label="Additional Notes"
            value={formData.additionalNotes || "None"}
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
      <span className="min-w-32 shrink-0 text-sm text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value || "---"}</span>
    </div>
  )
}

function SuccessScreen({ formData }: { formData: FormData }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="size-8 text-emerald-500" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          Intake submitted!
        </h1>
        <p className="mb-2 text-sm text-muted-foreground">
          Thank you, {formData.fullName || "there"}. We{"'"}ve received your
          intake for{" "}
          <span className="font-medium text-foreground">
            {formData.projectName || "your project"}
          </span>
          .
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Our team will review your submission and reach out to{" "}
          <span className="font-medium text-foreground">
            {formData.email || "your email"}
          </span>{" "}
          within 1-2 business days to schedule a discovery call.
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
