"use client"

import { FormData, StepErrors, PLATFORM_OPTIONS  } from "@/types"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepWhatYouNeed({
  formData,
  updateField,
  togglePlatform,
  errors,
}: {
  formData: FormData
  updateField: (field: keyof FormData, value: any) => void
  togglePlatform: (platform: string) => void
  errors: StepErrors
}) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">Let’s shape what you need</h2>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        We’ll translate this into technical requirements later — for now, tell us what matters to you.
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Where would people use this?</Label>
          <div className="flex flex-wrap gap-2">
            {PLATFORM_OPTIONS.map((platform) => (
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="mustHaves">
            What are the must-have things it should do? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="mustHaves"
            placeholder="List the key things your app needs to do..."
            className={`min-h-32 ${errors.mustHaves ? "border-destructive" : ""}`}
            value={formData.mustHaves}
            onChange={(e) => updateField("mustHaves", e.target.value)}
          />
          {errors.mustHaves && <p className="text-xs text-destructive">{errors.mustHaves}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="hasAnything">Do you have anything built already?</Label>
          <Select value={formData.hasAnything} onValueChange={(v) => updateField("hasAnything", v)}>
            <SelectTrigger id="hasAnything">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nothing">No, starting completely fresh</SelectItem>
              <SelectItem value="spreadsheets">I have spreadsheets / documents</SelectItem>
              <SelectItem value="prototype">I have a prototype</SelectItem>
              <SelectItem value="rebuild">I have something but it needs rebuilding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasAnything && formData.hasAnything !== "nothing" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="existingUrl">Can you share a link to what you have? (optional)</Label>
            <Input
              id="existingUrl"
              placeholder="https://... or Google Drive link"
              value={formData.existingUrl}
              onChange={(e) => updateField("existingUrl", e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="lookAndFeel">How should it look and feel?</Label>
          <Input
            id="lookAndFeel"
            placeholder='e.g. "Clean like Notion" or "Modern and bold"'
            value={formData.lookAndFeel}
            onChange={(e) => updateField("lookAndFeel", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
