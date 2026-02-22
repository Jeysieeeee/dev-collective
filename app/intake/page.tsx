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

/* ──────────────────────── Constants ──────────────────────── */

const STEPS = [
  { id: 1, label: "About You" },
  { id: 2, label: "Vision & Problem" },
  { id: 3, label: "Users & Features" },
  { id: 4, label: "Technical Scope" },
  { id: 5, label: "Goals & Budget" },
  { id: 6, label: "Dream Big" },
  { id: 7, label: "Review" },
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

/* ──────────────────────── Types & Initial Data ──────────────────────── */

type FormData = {
  fullName: string
  contactMethod: string
  contactHandle: string
  role: string
  q1MainGoal: string
  q2Problem: string
  q3PrimaryUsers: string
  q4UserActions: string
  q5CurrentProcess: string
  q6CurrentProblems: string
  q7SystemType: string
  q8WhoManages: string
  q9UserCapabilities: string
  q10AdminCapabilities: string
  q11DataTypes: string
  q12DataVolume: string
  q13ExternalServices: string
  q14LaunchDate: string
  q15Priority: string
  q16Budget: string
  q17InitialUsers: string
  q18FutureUsers: string
  q19SuccessMetric: string
  q20DreamSystem: string
}

const INITIAL_DATA: FormData = {
  fullName: "",
  contactMethod: "",
  contactHandle: "",
  role: "",
  q1MainGoal: "",
  q2Problem: "",
  q3PrimaryUsers: "",
  q4UserActions: "",
  q5CurrentProcess: "",
  q6CurrentProblems: "",
  q7SystemType: "",
  q8WhoManages: "",
  q9UserCapabilities: "",
  q10AdminCapabilities: "",
  q11DataTypes: "",
  q12DataVolume: "",
  q13ExternalServices: "",
  q14LaunchDate: "",
  q15Priority: "",
  q16Budget: "",
  q17InitialUsers: "",
  q18FutureUsers: "",
  q19SuccessMetric: "",
  q20DreamSystem: "",
}

/* ──────────────────────── Validation ──────────────────────── */

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
        errors.contactHandle =
          "That doesn't look like a valid email. Mind checking?"
      }
      if (!formData.role)
        errors.role = "Pick the option that best describes you."
      break
    case 2:
      if (!formData.q1MainGoal.trim())
        errors.q1MainGoal =
          "Even a rough idea is great -- just tell us what you're imagining."
      if (!formData.q2Problem.trim())
        errors.q2Problem =
          "Tell us what's not working right now. This helps us understand your needs."
      break
    case 3:
      if (!formData.q3PrimaryUsers.trim())
        errors.q3PrimaryUsers =
          "Help us understand who would be using this system."
      if (!formData.q4UserActions.trim())
        errors.q4UserActions =
          "What should people be able to do? Even a short list helps."
      break
  }
  return errors
}

/* ──────────────────────── Main Page ──────────────────────── */

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<StepErrors>({})

  const progress = (currentStep / STEPS.length) * 100

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
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
            <StepVisionProblem
              formData={formData}
              updateField={updateField}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <StepUsersFeatures
              formData={formData}
              updateField={updateField}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <StepTechnicalScope
              formData={formData}
              updateField={updateField}
            />
          )}
          {currentStep === 5 && (
            <StepGoalsBudget
              formData={formData}
              updateField={updateField}
            />
          )}
          {currentStep === 6 && (
            <StepDreamBig
              formData={formData}
              updateField={updateField}
            />
          )}
          {currentStep === 7 && <StepReview formData={formData} />}

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

/* ──────────────────────── Shared Field Component ──────────────────────── */

function QuestionField({
  id,
  label,
  hint,
  example,
  required,
  multiline,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  hint?: string
  example: string
  required?: boolean
  multiline?: boolean
  value: string
  onChange: (val: string) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      <p className="rounded-md border border-dashed border-border/60 bg-secondary/50 px-3 py-2 text-xs italic text-muted-foreground">
        Example: {example}
      </p>
      {multiline ? (
        <Textarea
          id={id}
          placeholder="Type your answer here..."
          className={`min-h-28 ${error ? "border-destructive" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
        />
      ) : (
        <Input
          id={id}
          placeholder="Type your answer here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={error ? "border-destructive" : ""}
        />
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

/* ──────────────────────── Step 1: About You ──────────────────────── */

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

        {/* Contact Handle */}
        {formData.contactMethod && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactHandle">
              Your{" "}
              {CONTACT_METHODS.find((m) => m.value === formData.contactMethod)
                ?.label}{" "}
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
              <p className="text-xs text-destructive">
                {errors.contactHandle}
              </p>
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

/* ──────────────────────── Step 2: Vision & Problem ──────────────────────── */

function StepVisionProblem({
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
        Let{"'"}s talk about your vision
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Don{"'"}t worry about technical terms. Just describe things the way you
        {"'"}d explain them to a friend. Each question has an example to guide
        you.
      </p>

      <div className="flex flex-col gap-8">
        <QuestionField
          id="q1MainGoal"
          label="What is the main goal of the system you want to build?"
          hint="Think about what you want to achieve. What would this system do for you or your customers?"
          example="I want homeowners in our city to find and book trusted home repair services online, instead of asking around on social media."
          required
          multiline
          value={formData.q1MainGoal}
          onChange={(v) => updateField("q1MainGoal", v)}
          error={errors.q1MainGoal}
        />

        <QuestionField
          id="q2Problem"
          label="What problem are you trying to solve?"
          hint="What's frustrating or broken about how things work today?"
          example="Customers waste hours messaging multiple repair shops on Facebook and never know who's available, reliable, or fairly priced."
          required
          multiline
          value={formData.q2Problem}
          onChange={(v) => updateField("q2Problem", v)}
          error={errors.q2Problem}
        />

        <QuestionField
          id="q5CurrentProcess"
          label="How is this currently being done today?"
          hint="Is it handled manually, through messaging apps, paper, or spreadsheets?"
          example="We post available services on Facebook and customers comment or send DMs. Bookings are tracked in a shared Google Sheet."
          multiline
          value={formData.q5CurrentProcess}
          onChange={(v) => updateField("q5CurrentProcess", v)}
        />

        <QuestionField
          id="q6CurrentProblems"
          label="What are the biggest problems with how it works now?"
          hint="What keeps going wrong or causes the most headaches?"
          example="Double bookings happen all the time, payments are hard to track, and we lose potential customers because replies take too long."
          multiline
          value={formData.q6CurrentProblems}
          onChange={(v) => updateField("q6CurrentProblems", v)}
        />
      </div>
    </div>
  )
}

/* ──────────────────────── Step 3: Users & Features ──────────────────────── */

function StepUsersFeatures({
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
        Who will use it and what should they be able to do?
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Think about the different types of people who{"'"}ll interact with your
        system. There{"'"}s no wrong answer here -- we{"'"}ll refine these
        together.
      </p>

      <div className="flex flex-col gap-8">
        <QuestionField
          id="q3PrimaryUsers"
          label="Who are the main people that would use this system?"
          hint="List the different types of users. Who benefits from it?"
          example="Homeowners who need repairs, service providers (plumbers, electricians, etc.), and our admin team who oversees everything."
          required
          multiline
          value={formData.q3PrimaryUsers}
          onChange={(v) => updateField("q3PrimaryUsers", v)}
          error={errors.q3PrimaryUsers}
        />

        <QuestionField
          id="q4UserActions"
          label="What do you want these users to be able to do?"
          hint="Describe the key actions from each user's perspective."
          example="Homeowners can search for services, read reviews, book appointments, and pay online. Service providers can list their services and manage their schedule."
          required
          multiline
          value={formData.q4UserActions}
          onChange={(v) => updateField("q4UserActions", v)}
          error={errors.q4UserActions}
        />

        <QuestionField
          id="q9UserCapabilities"
          label="Specifically, what should regular users be able to do in the system?"
          hint="Think step-by-step: what would a typical user do from start to finish?"
          example="Create an account, search for a service, view ratings, book a time slot, pay with GCash or card, and leave a review after."
          multiline
          value={formData.q9UserCapabilities}
          onChange={(v) => updateField("q9UserCapabilities", v)}
        />

        <QuestionField
          id="q10AdminCapabilities"
          label="What should administrators or managers be able to do?"
          hint="Think about the people running things behind the scenes."
          example="Approve new service providers, handle disputes, view earnings reports, send announcements, and manage user accounts."
          multiline
          value={formData.q10AdminCapabilities}
          onChange={(v) => updateField("q10AdminCapabilities", v)}
        />
      </div>
    </div>
  )
}

/* ──────────────────────── Step 4: Technical Scope ──────────────────────── */

function StepTechnicalScope({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        A bit about the technical side
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Don{"'"}t worry if you{"'"}re not sure about some of these -- just
        answer what you can and we{"'"}ll figure out the rest together.
      </p>

      <div className="flex flex-col gap-8">
        <QuestionField
          id="q7SystemType"
          label="What type of system do you think you need?"
          hint="A website, a mobile app, or maybe both? It's okay if you're not sure."
          example="I think a website that also works well on phones, and eventually a mobile app so customers can book on the go."
          value={formData.q7SystemType}
          onChange={(v) => updateField("q7SystemType", v)}
        />

        <QuestionField
          id="q8WhoManages"
          label="Who will manage the system day-to-day?"
          hint="Who will be in charge of keeping things running and updated?"
          example="Our operations manager will handle the admin side, and each service provider manages their own profile."
          value={formData.q8WhoManages}
          onChange={(v) => updateField("q8WhoManages", v)}
        />

        <QuestionField
          id="q11DataTypes"
          label="What kind of information will the system need to keep track of?"
          hint="Think about the important data: people, items, orders, messages, etc."
          example="User accounts, service provider profiles, bookings, payments, ratings, and support tickets."
          value={formData.q11DataTypes}
          onChange={(v) => updateField("q11DataTypes", v)}
        />

        <QuestionField
          id="q12DataVolume"
          label="How much data do you expect when you first launch?"
          hint="A rough guess is fine. How many products, users, or records?"
          example="Maybe 100 service providers and a few hundred customers to start with."
          value={formData.q12DataVolume}
          onChange={(v) => updateField("q12DataVolume", v)}
        />

        <QuestionField
          id="q13ExternalServices"
          label="Does it need to connect to any other services or tools?"
          hint="Things like payment systems, messaging apps, maps, or notifications."
          example="Yes -- GCash for payments, Google Maps for locating providers, and SMS for booking confirmations."
          value={formData.q13ExternalServices}
          onChange={(v) => updateField("q13ExternalServices", v)}
        />
      </div>
    </div>
  )
}

/* ──────────────────────── Step 5: Goals & Budget ──────────────────────── */

function StepGoalsBudget({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Timeline, budget, and expectations
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        These help us give you a realistic picture during the discovery call.
        All answers here are optional -- share what you{"'"}re comfortable
        with.
      </p>

      <div className="flex flex-col gap-8">
        <QuestionField
          id="q14LaunchDate"
          label="When do you want to launch the system?"
          hint="A specific date or a general timeline -- either works."
          example="Ideally within 4 months, before the holiday season picks up."
          value={formData.q14LaunchDate}
          onChange={(v) => updateField("q14LaunchDate", v)}
        />

        <QuestionField
          id="q15Priority"
          label="What is your top priority?"
          hint="Is it speed of launch, having all features, or keeping costs low?"
          example="Launch a simple working version first, then add more features based on customer feedback."
          value={formData.q15Priority}
          onChange={(v) => updateField("q15Priority", v)}
        />

        <QuestionField
          id="q16Budget"
          label="What is your estimated budget range?"
          hint="This is just to help us recommend the right approach. No commitment at all."
          example="Somewhere between ₱150,000 to ₱400,000, depending on what's included."
          value={formData.q16Budget}
          onChange={(v) => updateField("q16Budget", v)}
        />

        <QuestionField
          id="q17InitialUsers"
          label="How many users do you expect when you first launch?"
          hint="Just a rough guess to help us plan capacity."
          example="Around 200-300 customers and maybe 50 service providers."
          value={formData.q17InitialUsers}
          onChange={(v) => updateField("q17InitialUsers", v)}
        />

        <QuestionField
          id="q18FutureUsers"
          label="How many users do you expect in 1-2 years?"
          hint="Where do you see this growing?"
          example="Hoping to reach 5,000 customers and 500 providers across nearby cities."
          value={formData.q18FutureUsers}
          onChange={(v) => updateField("q18FutureUsers", v)}
        />
      </div>
    </div>
  )
}

/* ──────────────────────── Step 6: Dream Big ──────────────────────── */

function StepDreamBig({
  formData,
  updateField,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: string) => void
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Dream big -- we{"'"}re listening
      </h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Last two questions. This is your chance to share your full vision and
        how you{"'"}ll know it{"'"}s working.
      </p>

      <div className="flex flex-col gap-8">
        <QuestionField
          id="q19SuccessMetric"
          label="How will you know the system is successful?"
          hint="What does winning look like for you?"
          example="When customers regularly book through the app instead of messaging us on Facebook, and service providers say it's helped them get more jobs."
          multiline
          value={formData.q19SuccessMetric}
          onChange={(v) => updateField("q19SuccessMetric", v)}
        />

        <QuestionField
          id="q20DreamSystem"
          label="If there were no limitations, describe your dream system."
          hint="Forget about budget or technology for a moment. What would the perfect version look like?"
          example="A platform like Grab but for home services -- customers open the app, pick a service, get matched with a nearby provider instantly, pay seamlessly, and rate the experience. Providers have their own dashboard with earnings, analytics, and a scheduling tool."
          multiline
          value={formData.q20DreamSystem}
          onChange={(v) => updateField("q20DreamSystem", v)}
        />
      </div>
    </div>
  )
}

/* ──────────────────────── Step 7: Review ──────────────────────── */

function StepReview({ formData }: { formData: FormData }) {
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
        Take a look and make sure everything feels right. You can go back to
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

        <ReviewSection title="Vision & Problem">
          <ReviewField label="Main goal" value={formData.q1MainGoal} />
          <ReviewField label="Problem to solve" value={formData.q2Problem} />
          <ReviewField
            label="Current process"
            value={formData.q5CurrentProcess || "Not specified"}
          />
          <ReviewField
            label="Current problems"
            value={formData.q6CurrentProblems || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Users & Features">
          <ReviewField label="Primary users" value={formData.q3PrimaryUsers} />
          <ReviewField
            label="What users should do"
            value={formData.q4UserActions}
          />
          <ReviewField
            label="User capabilities"
            value={formData.q9UserCapabilities || "Not specified"}
          />
          <ReviewField
            label="Admin capabilities"
            value={formData.q10AdminCapabilities || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Technical Scope">
          <ReviewField
            label="System type"
            value={formData.q7SystemType || "Not specified"}
          />
          <ReviewField
            label="Who manages it"
            value={formData.q8WhoManages || "Not specified"}
          />
          <ReviewField
            label="Data to track"
            value={formData.q11DataTypes || "Not specified"}
          />
          <ReviewField
            label="Initial data volume"
            value={formData.q12DataVolume || "Not specified"}
          />
          <ReviewField
            label="External services"
            value={formData.q13ExternalServices || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Goals & Budget">
          <ReviewField
            label="Launch target"
            value={formData.q14LaunchDate || "Not specified"}
          />
          <ReviewField
            label="Top priority"
            value={formData.q15Priority || "Not specified"}
          />
          <ReviewField
            label="Budget range"
            value={formData.q16Budget || "Not specified"}
          />
          <ReviewField
            label="Initial users"
            value={formData.q17InitialUsers || "Not specified"}
          />
          <ReviewField
            label="Users in 1-2 years"
            value={formData.q18FutureUsers || "Not specified"}
          />
        </ReviewSection>

        <div className="h-px bg-border" />

        <ReviewSection title="Dream Big">
          <ReviewField
            label="Success metric"
            value={formData.q19SuccessMetric || "Not specified"}
          />
          <ReviewField
            label="Dream system"
            value={formData.q20DreamSystem || "Not specified"}
          />
        </ReviewSection>
      </div>
    </div>
  )
}

/* ──────────────────────── Shared Review Components ──────────────────────── */

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
      <span className="whitespace-pre-wrap text-sm text-foreground">
        {value || "---"}
      </span>
    </div>
  )
}

/* ──────────────────────── Success Screen ──────────────────────── */

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
          <span className="font-medium text-foreground">{contactLabel}</span>{" "}
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
