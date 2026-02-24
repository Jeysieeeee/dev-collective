"use client"

import { FormData, StepErrors, CONTACT_METHODS, ROLE_OPTIONS } from "@/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepAboutYou({
  formData,
  updateField,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: any) => void
  errors: StepErrors
}) {
  const method = CONTACT_METHODS.find((m) => m.value === formData.contactMethod)

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Great to meet you!</h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Before we dive in, we’d love to know a little about you. No technical knowledge needed —
        just be yourself.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">
            What would you like us to call you? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="e.g. Jane, Marcus, Dr. Lee..."
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label>
            Where should we reach you? <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">
            Pick your preferred way to chat, and we’ll follow up there.
          </p>
          <Select
            value={formData.contactMethod}
            onValueChange={(v) => {
              updateField("contactMethod", v)
              updateField("contactHandle", "")
            }}
          >
            <SelectTrigger className={errors.contactMethod ? "border-destructive" : ""}>
              <SelectValue placeholder="Choose a contact method" />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_METHODS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contactMethod && (
            <p className="text-xs text-destructive">{errors.contactMethod}</p>
          )}
        </div>

        {formData.contactMethod && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactHandle">
              Your {method?.label} details <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactHandle"
              type={(method?.type as any) || "text"}
              placeholder={method?.placeholder || ""}
              value={formData.contactHandle}
              onChange={(e) => updateField("contactHandle", e.target.value)}
              className={errors.contactHandle ? "border-destructive" : ""}
            />
            {errors.contactHandle && (
              <p className="text-xs text-destructive">{errors.contactHandle}</p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label>
            I am... <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground">Pick whichever feels closest.</p>
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
          {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
        </div>
      </div>
    </div>
  )
}