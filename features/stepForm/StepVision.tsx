"use client"
import type { FormData, StepErrors } from "@/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function StepVision({
  formData,
  updateField,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: any) => void
  errors: StepErrors
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Tell us about your vision</h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Don’t worry about technical terms — just describe it like you’re explaining it to a friend.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="vision">
            If your app or software existed today, what would it do?{" "}
            <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="vision"
            placeholder="Describe what you imagine your app doing..."
            className={`min-h-32 ${errors.vision ? "border-destructive" : ""}`}
            value={formData.vision}
            onChange={(e) => updateField("vision", e.target.value)}
          />
          {errors.vision && <p className="text-xs text-destructive">{errors.vision}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="whoIsItFor">Who would use this?</Label>
          <Input
            id="whoIsItFor"
            placeholder="e.g. Customers, staff, patients, students..."
            value={formData.whoIsItFor}
            onChange={(e) => updateField("whoIsItFor", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="biggestChallenge">
            What’s the biggest frustration or challenge this would solve?
          </Label>
          <Textarea
            id="biggestChallenge"
            placeholder="e.g. We're tracking everything in spreadsheets and it keeps breaking..."
            className="min-h-24"
            value={formData.biggestChallenge}
            onChange={(e) => updateField("biggestChallenge", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}