"use client"

import Link from "next/link"
import { useState } from "react"
import { Code2, ArrowLeft, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { FormData, StepErrors,  STEPS, INITIAL_DATA, validateStep} from "@/types"
import SuccessScreen from "./SuccessScreen"
import StepAboutYou from "./stepForm/StepAboutYou"
import StepVision from "./stepForm/StepVision"
import StepWhatYouNeed from "./stepForm/StepWhatYouNeed"
import StepPracticalities from "./stepForm/StepPracticalities"
import Review from "./Review"

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA as FormData)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<StepErrors>({})

  const progress = (currentStep / STEPS.length) * 100

  function updateField(field: keyof FormData, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as string]
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
    if (Object.keys(stepErrors).length) return setErrors(stepErrors)
    setErrors({})
    if (currentStep < STEPS.length) setCurrentStep((s) => s + 1)
  }

  function prevStep() {
    setErrors({})
    if (currentStep > 1) setCurrentStep((s) => s - 1)
  }

async function handleSubmit() {
  const stepErrors = validateStep(currentStep, formData)
  if (Object.keys(stepErrors).length) return setErrors(stepErrors)

  // Convert meetingDate to ISO for API/email
  const payload = {
    ...formData,
    meetingDate: formData.meetingDate ? formData.meetingDate.toISOString() : "",
  }

  const res = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    // optional: show toast or inline error
    const data = await res.json().catch(() => ({}))
    alert(data?.error || "Failed to send email. Please try again.")
    return
  }

  setSubmitted(true)
}

  if (submitted) return <SuccessScreen formData={formData} />

  return (
    <div className="flex min-h-screen flex-col bg-background">
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

      <div className="mx-auto w-full max-w-3xl px-6 pt-6">
        <Progress value={progress} className="h-1" />
        <div className="mt-3 flex justify-between">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
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

      <main className="flex flex-1 items-start justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-2xl">
          {currentStep === 1 && (
            <StepAboutYou formData={formData} updateField={updateField} errors={errors} />
          )}
          {currentStep === 2 && (
            <StepVision formData={formData} updateField={updateField} errors={errors} />
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
            <StepPracticalities formData={formData} updateField={updateField} errors={errors} />
          )}
          {currentStep === 5 && <Review formData={formData} />}

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
              <Button onClick={handleSubmit} className="gap-2 rounded-full px-6">
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